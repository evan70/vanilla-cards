/**
 * cardboard.page.ts — Cardboard Dashboard.
 *
 * Stats cards, quick links, API polling, auto-refresh, views chart,
 * top articles, recent comments, reactions breakdown, clock, theme toggle.
 *
 * Migrated from mark-cardboard.ts (704 lines → this kernel page).
 */

import { AppKernel } from '@vc/core';
import { getCsrfToken } from '@vc/core/kernel/http/http-client';
import { escapeHtml } from '@vc/core/lib/escape-html';

// SVG icons
import articlesIcon from '../../assets/icons/articles.svg?raw';
import formsIcon from '../../assets/icons/forms.svg?raw';
import contactsIcon from '../../assets/icons/contacts.svg?raw';
import usersIcon from '../../assets/icons/users.svg?raw';
import sunIcon from '../../assets/icons/sun.svg?raw';
import moonIcon from '../../assets/icons/moon.svg?raw';

// Reaction SVGs
const likeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>';
const loveIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
const insightfulIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';
const funnyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>';
const celebrateIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

interface QuickLink {
  name: string;
  href: string;
  desc: string;
}

interface ApiOverview {
  totalArticles: number;
  totalViews: number;
  totalReactions: number;
  totalComments: number;
  totalForms: number;
  totalUsers: number;
  totalContacts: number;
}

interface ApiDataPoint { date: string; views: number; }
interface ApiArticle { id: string; title: string; slug: string; views: number; publishedAt: string | null; }
interface ApiComment { id: string; content: string; authorName: string; articleTitle: string; createdAt: string; }

interface CardboardApiData {
  overview: ApiOverview;
  viewsTrend: ApiDataPoint[];
  recentArticles: ApiArticle[];
  recentComments: ApiComment[];
  topArticles: ApiArticle[];
  reactionsBreakdown: Record<string, number>;
}

interface Elements {
  statsGrid: HTMLElement | null;
  quickLinksGrid: HTMLElement | null;
  viewsChart: HTMLElement | null;
  topArticlesList: HTMLElement | null;
  recentCommentsList: HTMLElement | null;
  reactionsBreakdown: HTMLElement | null;
  logoutBtn: HTMLElement | null;
  themeToggle: HTMLElement | null;
}

AppKernel.getInstance().registerPage('cardboard', () => {
  const kernel = AppKernel.getInstance();

  // ── State ──────────────────────────────────────────────
  const state = {
    stats: { articles: 0, forms: 0, contacts: 0, users: 0 },
    quickLinks: [] as QuickLink[],
    apiData: null as CardboardApiData | null,
    isLoading: false,
    pollingTimer: null as number | null,
    refreshInterval: 60_000,
  };

  const el = {} as Elements;
  const API_URL = '/mark/api/cardboard/stats';

  // ── Resolve ────────────────────────────────────────────
  function resolve(): void {
    el.statsGrid = document.getElementById('cardboard-stats');
    el.quickLinksGrid = document.getElementById('cardboard-quick-links');
    el.viewsChart = document.getElementById('views-chart');
    el.topArticlesList = document.getElementById('top-articles-list');
    el.recentCommentsList = document.getElementById('recent-comments-list');
    el.reactionsBreakdown = document.getElementById('reactions-breakdown');
    el.logoutBtn = document.getElementById('logout-btn');
    el.themeToggle = document.getElementById('theme-toggle');
  }

  // ── Load from data attributes ──────────────────────────
  function loadFromDom(): void {
    const container = document.getElementById('cardboard-data');
    if (!container) return;

    const statsJson = container.getAttribute('data-stats');
    if (statsJson) {
      try { state.stats = JSON.parse(statsJson); } catch { /* keep defaults */ }
    }
    const linksJson = container.getAttribute('data-quick-links');
    if (linksJson) {
      try { state.quickLinks = JSON.parse(linksJson); } catch { /* keep defaults */ }
    }
  }

  // ── Render stats ───────────────────────────────────────
  function renderStats(): void {
    if (!el.statsGrid) return;
    const stats = [
      { label: 'Articles', value: state.stats.articles.toString(), icon: articlesIcon, color: 'gold', href: '/mark/articles' },
      { label: 'Forms', value: state.stats.forms.toString(), icon: formsIcon, color: 'emerald', href: '/mark/forms' },
      { label: 'Contacts', value: state.stats.contacts.toString(), icon: contactsIcon, color: 'sapphire', href: '/mark/contacts' },
      { label: 'Users', value: state.stats.users.toString(), icon: usersIcon, color: 'amethyst', href: '/mark/users' },
    ];
    el.statsGrid.innerHTML = stats.map(s =>
      `<stats-card value="${escapeHtml(s.value)}" label="${escapeHtml(s.label)}" icon="${s.icon.replace(/"/g, '&quot;')}" color="${s.color}" href="${s.href}"></stats-card>`
    ).join('');
  }

  // ── Render quick links ─────────────────────────────────
  function renderQuickLinks(): void {
    if (!el.quickLinksGrid) return;
    const links = state.quickLinks.length > 0 ? state.quickLinks : [
      { name: 'Articles', href: '/mark/articles', desc: 'Manage blog posts' },
      { name: 'Pages', href: '/mark/pages', desc: 'Static pages' },
      { name: 'Forms', href: '/mark/forms', desc: 'Form builder' },
      { name: 'Media', href: '/mark/media', desc: 'Media library' },
      { name: 'Settings', href: '/mark/settings', desc: 'System settings' },
      { name: 'Users', href: '/mark/users', desc: 'User management' },
    ];
    el.quickLinksGrid.innerHTML = links.map(l =>
      `<a href="${l.href}" class="card action-card"><div class="action-card__body"><h3 class="action-card__title">${l.name}</h3><p class="action-card__description">${l.desc}</p></div><div class="action-card__footer"><span class="action-card__link">Open →</span></div></a>`
    ).join('');
  }

  // ── Render views chart ─────────────────────────────────
  function renderViewsChart(): void {
    if (!el.viewsChart) return;
    if (!state.apiData?.viewsTrend) {
      el.viewsChart.innerHTML = '<div class="card-empty">No data available</div>';
      return;
    }
    import('@mark/components/views-chart').then(({ ViewsChart }) => {
      ViewsChart.render(el.viewsChart!, state.apiData!.viewsTrend, {
        width: 600, height: 220,
        color: 'var(--brand-gold)',
        fillColor: 'rgba(212, 175, 55, 0.1)',
        showGrid: true, showLabels: true,
      });
    }).catch(() => {
      el.viewsChart!.innerHTML = '<div class="card-empty">Chart failed to load</div>';
    });
  }

  // ── Render top articles ────────────────────────────────
  function renderTopArticles(): void {
    if (!el.topArticlesList) return;
    if (!state.apiData?.topArticles?.length) {
      el.topArticlesList.innerHTML = '<li class="card-empty">No articles yet</li>';
      return;
    }
    el.topArticlesList.innerHTML = state.apiData.topArticles.map(a =>
      `<li class="card-list__item"><a href="/mark/articles/edit?id=${a.id}" class="card-list__link"><div class="card-list__title">${escapeHtml(a.title)}</div><div class="card-list__meta">${a.views.toLocaleString()} views</div></a></li>`
    ).join('');
  }

  // ── Render recent comments ─────────────────────────────
  function renderRecentComments(): void {
    if (!el.recentCommentsList) return;
    if (!state.apiData?.recentComments?.length) {
      el.recentCommentsList.innerHTML = '<li class="card-empty">No comments yet</li>';
      return;
    }
    el.recentCommentsList.innerHTML = state.apiData.recentComments.map(c =>
      `<li class="card-list__item"><div class="card-list__title">${escapeHtml(c.authorName)}</div><div class="card-list__meta">on "${escapeHtml(c.articleTitle)}"</div></li>`
    ).join('');
  }

  // ── Render reactions ───────────────────────────────────
  function renderReactions(): void {
    if (!el.reactionsBreakdown) return;
    if (!state.apiData?.reactionsBreakdown) {
      el.reactionsBreakdown.innerHTML = '<div class="reactions-breakdown--empty">No reactions yet</div>';
      return;
    }
    const reactions = state.apiData.reactionsBreakdown;
    const total = Object.values(reactions).reduce((sum, c) => sum + c, 0);
    if (total === 0) {
      el.reactionsBreakdown.innerHTML = '<div class="reactions-breakdown--empty">No reactions yet</div>';
      return;
    }
    const reactionTypes: Record<string, { label: string; icon: string; color: string }> = {
      like: { label: 'Like', icon: likeIcon, color: 'gold' },
      love: { label: 'Love', icon: loveIcon, color: 'emerald' },
      insightful: { label: 'Insightful', icon: insightfulIcon, color: 'sapphire' },
      funny: { label: 'Funny', icon: funnyIcon, color: 'amethyst' },
      celebrate: { label: 'Celebrate', icon: celebrateIcon, color: 'ruby' },
    };
    el.reactionsBreakdown.innerHTML = Object.entries(reactions)
      .filter(([, count]) => count > 0)
      .map(([type, count]) => {
        const cfg = reactionTypes[type] || { label: type, icon: '', color: 'gold' };
        const pct = Math.round((count / total) * 100);
        // Wrap SVG icon to apply class if it doesn't have it
        const iconHtml = cfg.icon.includes('class=') 
          ? cfg.icon 
          : cfg.icon.replace('<svg', '<svg class="reactions-breakdown__icon"');
          
        return `<div class="reactions-breakdown__item"><div class="reactions-breakdown__label">${iconHtml}<span class="reactions-breakdown__label-text">${cfg.label}</span></div><div class="reactions-breakdown__bar"><div class="reactions-breakdown__fill reactions-breakdown__fill--${cfg.color}" style="width: ${pct}%"></div></div><div class="reactions-breakdown__count">${count.toLocaleString()}</div></div>`;
      }).join('');
  }

  // ── API fetch ──────────────────────────────────────────
  async function fetchApiData(): Promise<void> {
    if (state.isLoading) return;
    state.isLoading = true;
    try {
      const resp = await kernel.http.get<{ success: boolean; data: CardboardApiData }>(API_URL);
      if (resp.success && resp.data) {
        state.apiData = resp.data;
        state.stats = {
          articles: resp.data.overview.totalArticles || 0,
          contacts: resp.data.overview.totalContacts || 0,
          forms: resp.data.overview.totalForms || 0,
          users: resp.data.overview.totalUsers || 0,
        };
        renderStats();
        renderViewsChart();
        renderTopArticles();
        renderRecentComments();
        renderReactions();
      }
    } catch (e) {
      console.error('[Cardboard] API error:', e);
    } finally {
      state.isLoading = false;
    }
  }

  // ── Polling ────────────────────────────────────────────
  function startPolling(): void {
    stopPolling();
    fetchApiData();
    state.pollingTimer = window.setInterval(() => {
      if (!document.hidden) fetchApiData();
    }, state.refreshInterval);
  }

  function stopPolling(): void {
    if (state.pollingTimer !== null) {
      clearInterval(state.pollingTimer);
      state.pollingTimer = null;
    }
  }

  // ── Theme toggle ───────────────────────────────────────
  function updateThemeIcon(): void {
    if (!el.themeToggle) return;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    el.themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }

  async function toggleTheme(): Promise<void> {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    try {
      const resp = await kernel.http.post<{ theme: string }>('/api/theme', {
        variant: current === 'dark' ? 'light' : 'dark',
      });
      html.setAttribute('data-theme', resp.theme);
      updateThemeIcon();
    } catch (e) {
      console.error('[Cardboard] Theme toggle error:', e);
    }
  }

  // ── Clock ──────────────────────────────────────────────
  function updateClock(): void {
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    if (!timeEl || !dateEl) return;
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }

  // ── Events ─────────────────────────────────────────────
  function bindEvents(): void {
    el.logoutBtn?.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/mark/logout'; });
    el.themeToggle?.addEventListener('click', () => toggleTheme());
    updateClock();
    setInterval(updateClock, 1000);
    updateThemeIcon();
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopPolling() : startPolling();
    });
  }

  // ── Init ───────────────────────────────────────────────
  loadFromDom();
  resolve();
  renderStats();
  renderQuickLinks();
  bindEvents();
  startPolling();

  console.info('[Cardboard] Initialized ✓');
});
