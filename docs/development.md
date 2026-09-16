# Portfolio development

## Run locally

The site uses React, Vite, TypeScript, Tailwind CSS, and a shadcn-compatible structure. Use Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

Create and serve a production build:

```bash
npm run build
npm run preview
```

The build checks TypeScript and writes the static site to `dist/`.

## Project structure

- `components/ui/portfolio-hero-with-paper-shaders.tsx`: the portfolio component and its content.
- `components/ui/quick-tooltip-actions.tsx`: the GitHub profile menu, with personal and RONUS links.
- `demo.tsx`: the page that renders the component.
- `main.tsx`: the React entry point.
- `styles/globals.css`: Tailwind imports, theme variables, and responsive styles.
- `components.json`: shadcn configuration.
- `lib/utils.ts`: the standard `cn()` class helper.
- `public/`: static files, the custom domain, and existing assets.

`@/` resolves to the project root. The `components/ui` folder gives shadcn a predictable location for reusable UI components. This keeps imports such as `@/components/ui/portfolio-hero-with-paper-shaders` stable.

React, Tailwind, and TypeScript are already configured. No setup command is required. To add a shadcn component, run:

```bash
npx shadcn@latest add button
```

For a separate new project, the equivalent CLI setup is `npx shadcn@latest init -t vite -d`. See the [Vite setup guide](https://ui.shadcn.com/docs/installation/vite).

The shader uses `@paper-design/shaders-react`. The current API uses `size`; `pxSize` is deprecated. The supplied `cat` shape is unsupported, so the component uses `warp`. Motion can be paused and respects the reduced-motion preference. The portfolio remains readable when WebGL is unavailable.

The animation uses ice blue: `#7DCFFF` in dark mode and `#287EAE` in light mode. Text and focus use darker blue in light mode for contrast.

On phones and tablets, the artwork sits between the introduction and the CV in a compact band. The split layout starts at 1100 CSS pixels. On wider screens, the text column stays at or below 48rem and the artwork follows the viewport height. A fixed shader coordinate space keeps the pattern scale consistent during resizing. CV rows adapt to their content width through a container query.

The GitHub menu opens on mouse hover, click, or keyboard activation. It uses a Radix Popover for the two links and tooltips for their labels. Native anchors replace the supplied Next.js links because this site uses Vite.

The old PDF remains in `public/assets/` to preserve its existing URL. The page does not link to that outdated CV.

## GitHub Pages

The site uses the custom domain `nicolaschareca.com`. The workflow in `.github/workflows/pages.yml` builds pull requests and deploys changes pushed to `main`.

GitHub Pages uses **GitHub Actions** as its build source. The setting is under **Settings → Pages → Build and deployment → Source**. Keep the existing custom domain and DNS settings.

The workflow publishes `dist/`, including `CNAME`, `404.html`, the favicon, the sitemap, and the existing assets. See [GitHub's custom workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
