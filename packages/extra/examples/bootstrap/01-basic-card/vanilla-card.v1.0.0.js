var l,c=class{static injectStyles(){if(this.stylesInjected)return;const t=document.createElement("style");t.id="vanilla-ripple-styles",t.textContent=this.STYLES,document.head.appendChild(t),this.stylesInjected=!0}static attach(t,e={}){this.injectStyles();const i=()=>{t.removeEventListener("click",this.createRipple),t.removeEventListener("keydown",this.handleKeydown)};t.__rippleCleanup=i,t.addEventListener("click",this.createRipple),t.addEventListener("keydown",this.handleKeydown);const s=new MutationObserver(a=>{for(const r of a)if(!document.contains(t)){i(),s.disconnect();break}});s.observe(document.body,{childList:!0,subtree:!0})}static attachAll(){document.querySelectorAll("[data-ripple]").forEach(t=>{t instanceof HTMLElement&&this.attach(t)})}static detach(t){const e=t.__rippleCleanup;e&&(e(),delete t.__rippleCleanup)}};l=c;l.STYLES=`
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .vanilla-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      overflow: hidden;
    }

    [data-theme="dark"] .vanilla-ripple {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Dashboard-specific ripple colors */
    .card--stats .vanilla-ripple {
      background: rgba(212, 175, 55, 0.3);
    }

    .card--list .vanilla-ripple {
      background: rgba(80, 200, 120, 0.3);
    }

    .card--table .vanilla-ripple {
      background: rgba(15, 82, 186, 0.3);
    }

    .card--chart .vanilla-ripple {
      background: rgba(153, 102, 204, 0.3);
    }
  `;l.stylesInjected=!1;l.createRipple=t=>{const e=t.currentTarget;if(!e)return;const i=e.dataset.rippleColor,s=e.dataset.rippleDuration,a=document.createElement("span");a.className="vanilla-ripple";const r=e.getBoundingClientRect(),n=Math.max(r.width,r.height),d=t.clientX-r.left-n/2,o=t.clientY-r.top-n/2;a.style.cssText=`
      width: ${n}px;
      height: ${n}px;
      left: ${d}px;
      top: ${o}px;
      ${i?`background: ${i} !important;`:""}
      ${s?`animation-duration: ${s}ms;`:""}
    `,getComputedStyle(e).position==="static"&&(e.style.position="relative"),getComputedStyle(e).overflow==="visible"&&(e.style.overflow="hidden"),e.appendChild(a),setTimeout(()=>{a.remove()},s?parseInt(s,10):600)};l.handleKeydown=t=>{if(t.key==="Enter"||t.key===" "){const e=t.currentTarget;if(!e)return;e.click()}};typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c.attachAll()}):c.attachAll());var h=class extends HTMLElement{constructor(...t){super(...t),this.rippleElement=null,this.handleKeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())},this.handleClick=e=>{if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.href&&(window.location.href=this.href)}}static get observedAttributes(){return["variant","clickable","disabled","href","tabindex"]}get variant(){const t=this.getAttribute("variant");return["elevated","filled","outlined","horizontal","stats","list","table","chart","actions","form"].includes(t)?t:"elevated"}set variant(t){t?this.setAttribute("variant",t):this.removeAttribute("variant")}get clickable(){return this.hasAttribute("clickable")}set clickable(t){t?this.setAttribute("clickable",""):this.removeAttribute("clickable")}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get href(){return this.getAttribute("href")||""}set href(t){t?this.setAttribute("href",t):this.removeAttribute("href")}get tabindex(){return parseInt(this.getAttribute("tabindex")||"0",10)}set tabindex(t){this.setAttribute("tabindex",String(t))}connectedCallback(){this.classList.add("card",`card--${this.variant}`),this.clickable&&this.classList.add("card--clickable"),this.disabled&&this.classList.add("card--disabled"),this.setupAccessibility(),this.clickable&&!this.href&&this.addEventListener("keydown",this.handleKeydown),this.clickable&&!this.disabled&&(this.addEventListener("click",this.handleClick),c.attach(this))}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("click",this.handleClick)}attributeChangedCallback(t,e,i){e!==i&&(t==="variant"&&(this.classList.remove("card--elevated","card--filled","card--outlined","card--horizontal","card--stats","card--list","card--table","card--chart","card--actions","card--form"),this.classList.add(`card--${this.variant}`)),t==="clickable"&&(this.clickable?(this.classList.add("card--clickable"),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("click",this.handleClick)):(this.classList.remove("card--clickable"),this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("click",this.handleClick))),t==="disabled"&&(this.disabled?this.classList.add("card--disabled"):this.classList.remove("card--disabled"),this.setupAccessibility()),this.setupAccessibility())}get focusElement(){return this.href&&!this.disabled?this.querySelector("a")||this:this.tabindex<0?this:this}focus(t){const e=this.focusElement;e&&e!==this?e.focus(t):HTMLElement.prototype.focus.call(this,t)}blur(){const t=this.focusElement;t&&t!==this?t.blur():HTMLElement.prototype.blur.call(this)}setupAccessibility(){this.hasAttribute("role")||this.setAttribute("role","article"),this.clickable&&!this.hasAttribute("tabindex")&&this.setAttribute("tabindex","0"),this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")}};customElements.get("vanilla-card")||customElements.define("vanilla-card",h);export{h as VanillaCard,h as default,c as t};
