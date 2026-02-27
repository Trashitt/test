# Neon Login (Front-end)

A sleek sign-in page inspired by a split-panel, dark glass UI with subtle animations and friendly feedback.

## What’s included

The page features a two-column layout (illustration panel on the left for desktop, form on the right), plus input focus styling, password visibility toggle, loading states, and toast feedback messages.

## Credentials

Use `password` as the password for a guaranteed success response.

## Project structure

- `index.html` contains the theme variables and Tailwind layers, and loads all scripts.
- `app.js` wires the UI together and contains state + form submission logic.
- `components/` contains small, focused UI parts (form fields, toast, illustration, shell).
- `utils/` contains validation and auth helpers.
- `styles/global.css` contains global CSS only (non-layered).

## Update rules (please keep)

When the project is updated:
- Update this README if behavior, page layout, or file structure changes.
- If new pages are added, document their entry HTML files and their purpose.
- If new external media resources are used (images, videos), record them under `trickle/assets/` as individual JSON files.