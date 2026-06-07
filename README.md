# Project Antigravity — 6G Welder Hiring Page

> A high-conversion, standalone hiring landing page built to attract and onboard certified **6G pipe welders** for critical pipeline and infrastructure projects.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS |
| Logic | Vanilla JS (ES Modules) |
| Backend | Firebase v10 — Firestore + Storage |

---

## Project Structure

```
6G_Welding/
├── index.html          ← Landing page
├── styles.css          ← Design system & components
├── main.js             ← Firebase integration + form logic
├── PRD.md              ← Product requirements
└── FRONTEND_VISUAL_DOC.md  ← Design specifications
```

---

## Local Development

No build step required.

```bash
git clone https://github.com/Sanjog-Poojary/6G_Welding.git
cd 6G_Welding

# Must be served (not opened via file://) — ES modules require a server
npx serve .
```

---

## Firebase Setup

1. Create a Firebase project and enable **Firestore** and **Storage**
2. Add your project config to the `firebaseConfig` object at the top of `main.js`
3. Set appropriate **Firestore** and **Storage Security Rules** before going live

---

## Deployment

Static files — deploy anywhere:

- **GitHub Pages** → Settings → Pages → Deploy from `main`
- **Firebase Hosting** → `firebase deploy --only hosting`
- **Vercel / Netlify** → Connect repo, auto-detected as static

---

## License

MIT © 2026 Antigravity Industrial
