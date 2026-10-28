/**
 * ProfileCard Web Component (<profile-card>)
 * Reusable profile card sidebar for resumes, portfolios, and personal websites.
 * 
 * CSS Customization Options:
 * - Default: Automatically loads 'profile-card.css'
 * - Custom CSS URL: Add attribute `css-url="path/to/custom.css"`
 * - Disable internal CSS: Add attribute `no-css` (or `no-default-css`) to bring your own styles
 * 
 * Usage Example:
 * <profile-card
 *   avatar="https://kelsoncm.github.io/profile.png"
 *   name="Kelson Medeiros"
 *   profile-title="Especialista DevOps | Arquiteto de Software"
 *   location="Natal, RN - Brasil"
 *   status="Disponível"
 *   email="kelsoncm@gmail.com"
 *   github="https://github.com/kelsoncm"
 *   linkedin="https://www.linkedin.com/in/kelsoncm/"
 *   orcid="https://orcid.org/0000-0001-6749-4656"
 *   loop="https://loop.frontiersin.org/people/1858110/overview"
 *   lattes="http://lattes.cnpq.br/1734494254835148"
 *   academia="https://independent.academia.edu/kelsoncm"
 * ></profile-card>
 */

const defaultCssUrl = new URL('https://kelsoncm.github.io/components/profile-card.css', import.meta.url).href;

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Aceita só http(s), mailto e caminhos relativos; qualquer outro esquema (javascript:, data:) vira '#'.
const safeUrl = (value) => (/^(https?:|mailto:|[^:]*$)/i.test(value.trim()) ? value : '#');

class ProfileCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'avatar',
      'name',
      'title',
      'profile-title',
      'location',
      'status',
      'email',
      'github',
      'linkedin',
      'orcid',
      'loop',
      'lattes',
      'academia',
      'website',
      'twitter',
      'youtube',
      'instagram',
      'css-url',
      'no-css',
      'no-default-css'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML !== '') {
      this.render();
    }
  }

  getSocialLinksHTML() {
    const links = [];

    const addLink = (attr, label, iconClass, prefix = '') => {
      const val = this.getAttribute(attr);
      if (val) {
        const rawHref = prefix ? (val.startsWith(prefix) ? val : `${prefix}${val}`) : val;
        const isExternal = rawHref.startsWith('http');
        const href = escapeHTML(safeUrl(rawHref));
        const targetAttr = isExternal ? 'target="_blank" rel="noopener"' : '';
        links.push(`
          <a href="${href}" ${targetAttr} class="social-btn" title="${label}">
            <i class="${iconClass}"></i> ${label}
          </a>
        `);
      }
    };

    addLink('email', 'Email', 'fa-solid fa-envelope', 'mailto:');
    addLink('github', 'GitHub', 'fa-brands fa-github');
    addLink('linkedin', 'LinkedIn', 'fa-brands fa-linkedin');
    addLink('orcid', 'ORCID', 'fa-brands fa-orcid');
    addLink('loop', 'Loop', 'fa-solid fa-flask');
    addLink('lattes', 'Lattes', 'fa-solid fa-graduation-cap');
    addLink('academia', 'Academia', 'fa-solid fa-building-columns');
    addLink('website', 'Website', 'fa-solid fa-globe');
    addLink('twitter', 'Twitter', 'fa-brands fa-x-twitter');
    addLink('youtube', 'YouTube', 'fa-brands fa-youtube');
    addLink('instagram', 'Instagram', 'fa-brands fa-instagram');

    return links.join('');
  }

  render() {
    const avatar = escapeHTML(this.getAttribute('avatar') || 'profile.png');
    const name = escapeHTML(this.getAttribute('name') || '');
    const title = escapeHTML(this.getAttribute('profile-title') || this.getAttribute('title') || '');
    const location = escapeHTML(this.getAttribute('location') || '');
    const rawStatus = this.getAttribute('status');
    const status = rawStatus ? escapeHTML(rawStatus) : rawStatus;

    // CSS resolution logic
    const customCssUrl = this.getAttribute('css-url');
    const disableCss = this.hasAttribute('no-css') || this.hasAttribute('no-default-css');

    let cssLinkHTML = '';
    if (!disableCss) {
      const activeCssUrl = escapeHTML(safeUrl(customCssUrl || defaultCssUrl));
      cssLinkHTML = `<link rel="stylesheet" href="${activeCssUrl}" />`;
    }

    const socialHTML = this.getSocialLinksHTML();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      ${cssLinkHTML}

      <aside class="profile-card">
        <div class="profile-img-wrapper">
          <img src="${avatar}" alt="${name ? 'Foto de ' + name : 'Profile avatar'}" class="profile-img" />
          ${
            status
              ? `
            <div class="badge-status">
              <span class="pulse-dot"></span> ${status}
            </div>
          `
              : ''
          }
        </div>
        ${name ? `<h1 class="profile-name">${name}</h1>` : ''}
        ${title ? `<p class="profile-title">${title}</p>` : ''}
        ${
          location
            ? `
          <p class="location-tag">
            <i class="fa-solid fa-location-dot"></i> ${location}
          </p>
        `
            : ''
        }

        <div class="social-links">
          ${socialHTML}
          <slot name="social"></slot>
          <slot></slot>
        </div>
      </aside>
    `;
  }
}

if (!customElements.get('profile-card')) {
  customElements.define('profile-card', ProfileCard);
}

export default ProfileCard;
