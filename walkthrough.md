# Walkthrough - Profile Card Web Component (`<profile-card>`)

We transformed the profile sidebar into a standalone, zero-dependency **Web Component** (`<profile-card>`) with Shadow DOM encapsulation and dynamic attribute reactivity.

## Changes Made

### 1. Created Web Component
- **[components/profile-card.js](file:///home/kelson/projetos/PESSOAL/kelsoncm/pages/components/profile-card.js)**
  - Implemented `ProfileCard` extending `HTMLElement`.
  - Encapsulated styles using `Shadow DOM` (`open` mode) for complete CSS isolation.
  - Supports CSS Custom Properties (`--bg-card`, `--primary`, `--text-main`, `--border-color`) with built-in dark/light fallbacks.
  - Reacts automatically to attribute changes (`avatar`, `name`, `profile-title`, `location`, `status`, `email`, `github`, `linkedin`, `orcid`, `loop`, `lattes`, `academia`, `website`, `twitter`, `youtube`, `instagram`).
  - Supports `<slot>` and `<slot name="social">` for embedding custom HTML buttons.

### 2. Integrated into Portfolio Pages
- **[br/index.html](file:///home/kelson/projetos/PESSOAL/kelsoncm/pages/br/index.html#L56-L70)**: Replaced legacy `<aside class="profile-card">` HTML block with `<profile-card ...></profile-card>`.
- **[en/index.html](file:///home/kelson/projetos/PESSOAL/kelsoncm/pages/en/index.html#L56-L70)**: Replaced legacy `<aside class="profile-card">` HTML block with `<profile-card ...></profile-card>`.

---

## How to Reuse in Other Projects

To use this component in any external project (HTML, React, Vue, Angular, etc.):

### Step 1: Import the script
Add the module script to your HTML file or JavaScript entry point:

```html
<script type="module" src="components/profile-card.js"></script>
```

### Step 2: Add the Custom Element
Use the `<profile-card>` tag anywhere in your markup:

```html
<profile-card
  avatar="https://yourdomain.com/photo.jpg"
  name="Kelson Medeiros"
  profile-title="Especialista DevOps | Arquiteto de Software"
  location="Natal, RN - Brasil"
  status="Disponível"
  email="kelsoncm@gmail.com"
  github="https://github.com/kelsoncm"
  linkedin="https://www.linkedin.com/in/kelsoncm/"
  orcid="https://orcid.org/0000-0001-6749-4656"
></profile-card>
```

### Advanced: Adding Custom Social Links via Slots
If you want to add custom buttons or links that aren't built-in, simply pass children inside the tag:

```html
<profile-card
  avatar="profile.png"
  name="Kelson Medeiros"
  profile-title="Software Architect"
>
  <!-- Custom slot links -->
  <a href="https://custom-site.com" slot="social" class="social-btn">
    <i class="fa-solid fa-star"></i> Custom Link
  </a>
</profile-card>
```

---

## Verification
- Verified custom element registration in browser DOM.
- Tested responsive sidebar placement and status pulse animation within Shadow DOM.
- Confirmed Portuguese (`br/index.html`) and English (`en/index.html`) rendering.
