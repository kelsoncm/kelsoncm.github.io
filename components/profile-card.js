/**
 * ProfileCard Web Component (<profile-card>)
 * Reusable profile card sidebar for resumes, portfolios, and personal websites.
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
      'instagram'
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
        const href = prefix ? (val.startsWith(prefix) ? val : `${prefix}${val}`) : val;
        const isExternal = href.startsWith('http');
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
    const avatar = this.getAttribute('avatar') || 'profile.png';
    const name = this.getAttribute('name') || '';
    const title = this.getAttribute('profile-title') || this.getAttribute('title') || '';
    const location = this.getAttribute('location') || '';
    const status = this.getAttribute('status');

    const socialHTML = this.getSocialLinksHTML();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>
        :host {
          display: block;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .profile-card {
          background: var(--bg-card, #1e293b);
          border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          border-radius: var(--radius-lg, 16px);
          padding: 24px;
          text-align: center;
          position: sticky;
          top: 96px;
          box-shadow: var(--shadow-glow, 0 10px 30px rgba(0, 0, 0, 0.2));
          color: var(--text-main, #f8fafc);
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }

        .profile-img-wrapper {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto 20px;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid var(--primary, #38bdf8);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .badge-status {
          position: absolute;
          bottom: 8px;
          right: 12px;
          background: var(--success, #10b981);
          color: #ffffff;
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: var(--radius-full, 9999px);
          font-weight: 600;
          border: 2px solid var(--bg-card, #1e293b);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .profile-name {
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 6px;
          color: var(--text-main, #f8fafc);
        }

        .profile-title {
          color: var(--primary, #38bdf8);
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .location-tag {
          color: var(--text-muted, #94a3b8);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 16px;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          border-radius: var(--radius-md, 8px);
          color: var(--text-main, #f8fafc);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: var(--primary, #38bdf8);
          color: #ffffff;
          border-color: var(--primary, #38bdf8);
          transform: translateY(-2px);
        }

        ::slotted([slot="social"]) {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
      </style>

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
