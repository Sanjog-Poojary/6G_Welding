# Project ArcNexus — 6G Welder Hiring Page

> A high-conversion, standalone hiring landing page built to attract and onboard certified **6G pipe welders** for critical pipeline and infrastructure projects.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS |
| Logic | Vanilla JS (ES Modules) |
| Backend | **Supabase** (PostgreSQL + Storage) |

---

## Project Structure

```
6G_Welding/
├── index.html          ← Landing page
├── styles.css          ← Design system & components
├── main.js             ← Supabase integration + form logic
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

## Supabase Setup

1. Create a [Supabase project](https://database.new) (100% Free, no credit card required)
2. Copy `supabase-config.example.js` to `supabase-config.js` and add your **Project URL** and **anon public key**.
3. Create a table named `applications` with these text columns: `full_name`, `phone`, `email`, `years_exp`, `cert_url`, `resume_url`, and `status` (default: 'pending').
4. Create two public Storage buckets: `certifications` and `resumes`.

---

## Deployment

Since we moved off Firebase Hosting, you can deploy this static site anywhere instantly:

- **GitHub Pages** → Settings → Pages → Deploy from `main`
- **Vercel / Netlify** → Connect repo, auto-detected as static

---

## License

MIT © 2026 ArcNexus
