# Product Requirements Document
## Project Antigravity — 6G Welder Talent Acquisition Landing Page

**Version:** 1.0.0
**Status:** Draft → In Review
**Owner:** Talent Acquisition / Engineering Platform
**Last Updated:** June 7, 2026

---

## 1. Executive Summary

Project Antigravity is a high-conversion, standalone web landing page built to attract and onboard certified 6G welders for critical pipeline and infrastructure projects. The page must eliminate friction in the application process, communicate role legitimacy and compensation clarity, and funnel qualified candidates directly into a structured backend pipeline.

The solution must be deployable on the existing Next.js/Supabase infrastructure and adhere to the Antigravity design system: clean, industrial-minimal, and deeply professional.

---

## 2. Problem Statement

Current talent acquisition channels for specialized trade roles (6G welders specifically) suffer from:

- **Low trust signals** — generic job boards don't convey project credibility or pay transparency
- **High drop-off** — multi-step application flows on legacy ATS systems cause candidate abandonment
- **Poor mobile experience** — field workers primarily browse via mobile; existing flows are not mobile-first
- **Weak credential capture** — no structured mechanism to collect certification documents at point of application

### Goals
| Goal | Metric | Target |
|------|--------|--------|
| Reduce time-to-apply | Completion time | < 3 minutes |
| Improve qualified lead rate | % with valid 6G cert | > 65% |
| Mobile conversion | Mobile submission rate | ≥ 50% |
| Trust signal effectiveness | Avg. session duration | > 90 seconds |

---

## 3. Target Users

### Primary Persona — The Certified Pipe Welder
- **Demographics:** 28–52 years old, primarily male, trade school educated
- **Tech literacy:** Medium — comfortable with smartphones, hesitant with complex web forms
- **Motivations:** Competitive pay, consistent project work, site safety standards, resume building
- **Pain points:** Time wasted on illegitimate postings, unclear compensation, excessive paperwork
- **Device:** ~70% mobile (Android), ~30% desktop

### Secondary Persona — Staffing Coordinator / Recruiter
- **Role:** Internal reviewer of submitted applications via Supabase dashboard
- **Needs:** Structured data fields, downloadable cert files, filterable submission queue

---

## 4. Scope

### In Scope (v1.0)
- [x] Hero section with headline, subheadline, and CTA
- [x] Role & Requirements section with bullet list
- [x] Benefits / Why Join Us section
- [x] Application form (Name, Phone, Email, Years of Experience, file upload)
- [x] Supabase integration-ready form handler
- [x] Responsive design (mobile-first)
- [x] Accessibility: WCAG 2.1 AA compliance
- [x] Basic analytics event hooks (submit, CTA click, scroll depth)

### Out of Scope (v1.0)
- [ ] Multi-language support (planned v1.2)
- [ ] Video testimonials section
- [ ] Admin dashboard UI
- [ ] Email confirmation flow (backend concern)
- [ ] Job board API syndication

---

## 5. Functional Requirements

### 5.1 Hero Section
- **FR-001:** Display a clear primary headline: *"Hiring Expert 6G Welders"*
- **FR-002:** Display a subheadline summarizing the opportunity in ≤ 20 words
- **FR-003:** Render a prominent CTA button labeled "Apply Now" that smooth-scrolls to the application form
- **FR-004:** Hero must render above-the-fold on all common viewport sizes (320px–1440px)

### 5.2 Role & Requirements Section
- **FR-005:** Render a section titled "Role & Requirements"
- **FR-006:** List the following skills as discrete, scannable items:
  - Proficiency in SMAW (Stick) and GTAW (TIG) welding processes
  - Valid and current 6G position welding certification
  - Ability to interpret isometric and orthographic piping drawings
  - Strict adherence to site safety protocols (PPE, LOTO, hot-work permits)
  - 3+ years of field experience on industrial or pipeline projects
- **FR-007:** Each list item must be visually distinct (icon + text, or styled bullet)

### 5.3 Benefits / Why Join Us Section
- **FR-008:** Surface 3–4 trust-building highlights (compensation, safety record, project scope)
- **FR-009:** Render as a responsive card/grid layout (1 col mobile, 3 col desktop)
- **FR-010:** Include one social proof element (e.g., years of operation, project count, safety record)

### 5.4 Application Form
- **FR-011:** Capture the following fields:

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| Full Name | Text | Min 2 chars | Yes |
| Phone Number | Tel | E.164 format | Yes |
| Email Address | Email | RFC 5322 | Yes |
| Years of Experience | Select / Number | 0–40 | Yes |
| 6G Certification (file) | File upload | PDF/JPG/PNG ≤ 5MB | Yes |
| Resume (file) | File upload | PDF ≤ 5MB | Optional |

- **FR-012:** Inline, real-time validation with clear error states
- **FR-013:** Submit button disabled until all required fields are valid
- **FR-014:** On successful submission → show inline success state (no page reload)
- **FR-015:** On error → show contextual error message with retry option

### 5.5 Supabase Integration Readiness
- **FR-016:** Form `onSubmit` handler must call a clearly named `submitApplication()` async function
- **FR-017:** Text fields submitted as JSON payload to Supabase `applications` table
- **FR-018:** Files uploaded to Supabase Storage bucket `certifications/` and `resumes/`
- **FR-019:** Insert record includes `created_at` timestamp and `status: 'pending'` default

---

## 6. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Lighthouse score ≥ 90 (mobile). LCP < 2.5s |
| **Accessibility** | WCAG 2.1 AA. All interactive elements keyboard-navigable |
| **SEO** | Proper `<meta>` tags, OG tags, semantic HTML structure |
| **Security** | File upload type/size validation client-side AND server-side |
| **Browser Support** | Chrome 110+, Safari 16+, Firefox 115+, Edge 110+ |
| **Analytics** | GTM-ready event layer: `apply_click`, `form_start`, `form_submit` |

---

## 7. Design Constraints

- **Color palette:** Slate grays, steel blues, muted metallics, crisp whites
- **Constraint:** No purple in any design token, icon, or accent
- **Aesthetic:** Industrial-minimal — clean, calm, serious, and trustworthy
- **Typography:** Display font (industrial/condensed), body font (readable, refined)
- **Motion:** Subtle. Scroll-triggered reveals, no gratuitous animation

---

## 8. Technical Architecture

```
project-antigravity/
├── app/
│   ├── page.tsx                  ← Landing page root (RSC)
│   └── api/
│       └── apply/
│           └── route.ts          ← Server Action / API route (Supabase write)
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── RequirementsSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   └── ApplicationForm.tsx
│   └── ui/
│       ├── FileUpload.tsx
│       └── FormField.tsx
├── lib/
│   └── supabase.ts               ← Supabase client + submitApplication()
└── styles/
    └── globals.css               ← Tailwind + CSS custom properties
```

### Supabase Schema (applications table)
```sql
CREATE TABLE applications (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  years_exp   INTEGER NOT NULL,
  cert_url    TEXT,            -- Supabase Storage public URL
  resume_url  TEXT,
  status      TEXT DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## 9. Success Criteria & KPIs

| KPI | Baseline | v1.0 Target |
|-----|----------|-------------|
| Application submission rate | — | ≥ 12% of page visitors |
| Form completion rate | — | ≥ 40% of form starters |
| Mobile submission % | — | ≥ 50% |
| Avg. time to submit | — | < 3 minutes |
| Qualified applicants (with cert) | — | ≥ 65% of submissions |

---

## 10. Milestones

| Phase | Deliverable | Target Date |
|-------|-------------|-------------|
| Design | Visual doc approved | Week 1 |
| Dev | Frontend complete (no backend) | Week 2 |
| Integration | Supabase wired, file upload working | Week 3 |
| QA | Cross-browser, a11y, mobile testing | Week 3 |
| Launch | Production deploy | Week 4 |

---

## 11. Open Questions

- [ ] Do we need reCAPTCHA / bot protection on the form? (Supabase rate limits alone?)
- [ ] Should the cert upload field enforce expiry date validation?
- [ ] Is there a max applicant cap per campaign run?
- [ ] Who receives email notifications on new submissions — recruiter or auto-only?

---

## 12. Appendix

### Related Docs
- Frontend Visual Doc → `FRONTEND_VISUAL_DOC.md`
- Supabase Storage config → internal wiki
- Brand guidelines → design.antigravity.internal

### Glossary
| Term | Definition |
|------|-----------|
| **6G** | Fixed-inclined pipe welding position — the most demanding certification |
| **SMAW** | Shielded Metal Arc Welding (Stick welding) |
| **GTAW** | Gas Tungsten Arc Welding (TIG welding) |
| **LOTO** | Lockout/Tagout safety procedure |
| **LCP** | Largest Contentful Paint (Core Web Vital) |
