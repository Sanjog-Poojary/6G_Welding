/* ─────────────────────────────────────────────────────────────────────────
   PROJECT ANTIGRAVITY — Main JavaScript (ES Module)
   Backend: Firebase v10 (Firestore + Storage)
   ───────────────────────────────────────────────────────────────────────── */

// ════════════════════════════════════════════════════════════════════════════
// SECTION A — Firebase Configuration & Initialization
// Config is loaded from firebase-config.js (gitignored — never committed).
// Copy firebase-config.example.js → firebase-config.js and fill in your values.
// ════════════════════════════════════════════════════════════════════════════

import { initializeApp }          from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp }
                                  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL }
                                  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';
import { firebaseConfig }         from './firebase-config.js';

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const storage   = getStorage(app);


// ════════════════════════════════════════════════════════════════════════════
// SECTION B — Firebase Submit Handler
//
// Firestore collection : "applications"
// Storage buckets      : "certifications/{timestamp}-{filename}"
//                        "resumes/{timestamp}-{filename}"
//
// Firestore document schema:
// {
//   full_name  : string   (required)
//   phone      : string   (required)
//   email      : string   (required)
//   years_exp  : string   (required)
//   cert_url   : string   (Storage download URL)
//   resume_url : string | null
//   status     : "pending"
//   created_at : Timestamp (serverTimestamp)
// }
// ════════════════════════════════════════════════════════════════════════════

async function uploadFile(bucket, file) {
  const path      = `${bucket}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

async function submitApplication(formData) {
  // 1 — Upload certification (required)
  const certUrl = await uploadFile('certifications', formData.certFile);

  // 2 — Upload resume (optional)
  let resumeUrl = null;
  if (formData.resumeFile) {
    resumeUrl = await uploadFile('resumes', formData.resumeFile);
  }

  // 3 — Write application record to Firestore
  await addDoc(collection(db, 'applications'), {
    full_name:  formData.fullName,
    phone:      formData.phone,
    email:      formData.email,
    years_exp:  formData.yearsExp,
    cert_url:   certUrl,
    resume_url: resumeUrl,
    status:     'pending',
    created_at: serverTimestamp(),
  });
}


// ════════════════════════════════════════════════════════════════════════════
// SECTION C — Scroll Reveal (Intersection Observer)
// ════════════════════════════════════════════════════════════════════════════

(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('is-visible'), 80);
    } else {
      observer.observe(el);
    }
  });
})();


// ════════════════════════════════════════════════════════════════════════════
// SECTION D — Nav Scroll State
// ════════════════════════════════════════════════════════════════════════════

(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ════════════════════════════════════════════════════════════════════════════
// SECTION E — Analytics Event Stubs (GTM-ready)
// ════════════════════════════════════════════════════════════════════════════

function trackEvent(name, data) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({ event: name, ...data });
  }
  console.info('[Analytics]', name, data ?? '');
}

document.getElementById('hero-apply-btn')?.addEventListener('click', () =>
  trackEvent('apply_click', { source: 'hero' })
);
document.getElementById('nav-apply-btn')?.addEventListener('click', () =>
  trackEvent('apply_click', { source: 'nav' })
);


// ════════════════════════════════════════════════════════════════════════════
// SECTION F — Application Form (Validation + Submit Flow)
// ════════════════════════════════════════════════════════════════════════════

(function initForm() {
  const form        = document.getElementById('application-form');
  const submitBtn   = document.getElementById('submit-btn');
  const successEl   = document.getElementById('form-success');
  const errorBanner = document.getElementById('form-error-banner');
  const btnText     = submitBtn?.querySelector('.btn-submit__text');
  const btnLoading  = submitBtn?.querySelector('.btn-submit__loading');

  if (!form || !submitBtn) return;

  let formStarted = false;
  const files = { certFile: null, resumeFile: null };

  // ── Validation Rules ────────────────────────────────────────────────────
  const validators = {
    fullName: (v) => v.trim().length >= 2
      ? null : 'Please enter your full name (at least 2 characters)',
    phone:    (v) => /^[\d\s\+\-\(\)]{7,}$/.test(v.trim())
      ? null : 'Enter a valid phone number',
    email:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null : 'Enter a valid email address',
    yearsExp: (v) => v
      ? null : 'Please select your experience level',
    certFile: (f) => f
      ? null : 'Your 6G certification document is required',
  };

  // ── Submit button enabled state ─────────────────────────────────────────
  function updateSubmitState() {
    const v = getValues();
    const valid = (
      validators.fullName(v.fullName)   === null &&
      validators.phone(v.phone)         === null &&
      validators.email(v.email)         === null &&
      validators.yearsExp(v.yearsExp)   === null &&
      validators.certFile(files.certFile) === null
    );
    submitBtn.disabled = !valid;
  }

  function getValues() {
    return {
      fullName: form.fullName.value,
      phone:    form.phone.value,
      email:    form.email.value,
      yearsExp: form.yearsExp.value,
    };
  }

  // ── Error display helpers ────────────────────────────────────────────────
  function setError(fieldId, msg) {
    const field   = document.getElementById(`field-${fieldId}`);
    const errSpan = document.getElementById(`${fieldId}-error`);
    const input   = document.getElementById(fieldId) ||
                    document.getElementById(`${fieldId}-zone`);
    if (!field) return;
    if (msg) {
      if (errSpan) errSpan.textContent = msg;
      if (input)   input.classList.add('has-error');
      field.setAttribute('data-invalid', 'true');
    } else {
      if (errSpan) errSpan.textContent = '';
      if (input)   input.classList.remove('has-error');
      field.removeAttribute('data-invalid');
    }
  }

  // ── Real-time field validation ───────────────────────────────────────────
  ['fullName', 'phone', 'email', 'yearsExp'].forEach((id) => {
    const el = form[id];
    if (!el) return;

    el.addEventListener('input', () => {
      if (!formStarted) {
        formStarted = true;
        trackEvent('form_start');
      }
      setError(id, validators[id](el.value));
      updateSubmitState();
    });

    el.addEventListener('blur', () => setError(id, validators[id](el.value)));
  });

  // ── File Upload Helper ───────────────────────────────────────────────────
  function setupFileUpload(key) {
    const zone      = document.getElementById(`${key}-zone`);
    const input     = document.getElementById(`${key}-input`);
    const preview   = document.getElementById(`${key}-preview`);
    const nameEl    = document.getElementById(`${key}-name`);
    const sizeEl    = document.getElementById(`${key}-size`);
    const removeBtn = document.getElementById(`${key}-remove`);

    if (!zone || !input) return;

    const MAX = 5 * 1024 * 1024; // 5 MB

    const fmt = (bytes) => bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    function setFile(file) {
      if (!file) {
        files[key] = null;
        if (preview) preview.hidden = true;
        zone.hidden = false;
        input.value = '';
        if (key === 'certFile') setError('certFile', null);
        updateSubmitState();
        return;
      }
      if (file.size > MAX) {
        setError(key, 'File is too large — maximum 5 MB allowed');
        return;
      }
      files[key] = file;
      if (nameEl)  nameEl.textContent = file.name;
      if (sizeEl)  sizeEl.textContent = fmt(file.size);
      if (preview) preview.hidden = false;
      zone.hidden = true;
      if (key === 'certFile') setError('certFile', null);
      updateSubmitState();
    }

    zone.addEventListener('click',   ()  => input.click());
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
    });

    input.addEventListener('change', () => {
      const f = input.files?.[0];
      if (f) setFile(f);
    });

    zone.addEventListener('dragover',  (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', ()  => zone.classList.remove('drag-over'));
    zone.addEventListener('drop',      (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const f = e.dataTransfer?.files?.[0];
      if (f) setFile(f);
    });

    removeBtn?.addEventListener('click', (e) => { e.stopPropagation(); setFile(null); });
  }

  setupFileUpload('certFile');
  setupFileUpload('resumeFile');

  // ── Form Submit ──────────────────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const v = getValues();
    let hasErrors = false;

    ['fullName', 'phone', 'email', 'yearsExp'].forEach((id) => {
      const err = validators[id](v[id]);
      setError(id, err);
      if (err) hasErrors = true;
    });

    const certErr = validators.certFile(files.certFile);
    setError('certFile', certErr);
    if (certErr) hasErrors = true;

    if (hasErrors) {
      const firstInvalid = form.querySelector('[data-invalid] input, [data-invalid] select, [data-invalid] .file-zone');
      firstInvalid?.focus();
      return;
    }

    // — Loading UI —
    submitBtn.disabled  = true;
    btnText.hidden      = true;
    btnLoading.hidden   = false;
    errorBanner.hidden  = true;

    try {
      await submitApplication({ ...v, ...files });

      form.hidden       = false; // keep form in DOM but hide it
      form.style.display = 'none';
      successEl.hidden  = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      trackEvent('form_submit', { status: 'success' });

    } catch (err) {
      console.error('[Firebase] Submission failed:', err);
      errorBanner.hidden = false;
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      trackEvent('form_submit', { status: 'error', reason: err?.message });

      submitBtn.disabled = false;
      btnText.hidden     = false;
      btnLoading.hidden  = true;
    }
  });

})();
