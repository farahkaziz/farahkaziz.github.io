# Farah Kazziz Portfolio

A static personal portfolio for Farah Kazziz, a Software Engineering student and developer at ISIMM — Universite de Monastir. The site is designed as an evolving personal space for projects, skills, learning and future experience.

## Run locally

Open `index.html` directly in a browser. No build step or dependency installation is required.

The requested profile photo can be added at `assets/images/profile.jpg`; the current placeholder remains in place until a photo is supplied. The project list in `index.html` uses independent blocks, so a new project can be added by duplicating one `project-item` and updating its content. Optional project fields include a note, contribution list, status or image when relevant.

## Contact form

The form uses a Formspree-compatible action placeholder. Replace `your-form-id` in `index.html` with a real Formspree form ID before deployment. The form currently validates fields in the browser only.

## Production

For a small static site, deployment to GitHub Pages can use the repository root directly. For a minified release, run a tool such as `npx clean-css-cli -o css/style.min.css css/style.css` and `npx terser js/script.js -o js/script.min.js`, then update the stylesheet and script references in `index.html`. Keep readable source files in version control.

External resources are limited to Google Fonts. The site remains functional without them using the local fallback fonts.
