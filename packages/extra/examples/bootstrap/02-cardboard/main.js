// Import and register vanilla-card component
import { VanillaCard } from '../../../components/vanilla-card.js';

if (!customElements.get('vanilla-card')) {
    customElements.define('vanilla-card', VanillaCard);
}

console.log('✅ Cardboard loaded successfully!');
