'use client';

import { useState, useRef, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  yearsExp: string;
  certFile: File | null;
  resumeFile: File | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  yearsExp?: string;
  certFile?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Supabase Integration Layer ──────────────────────────────────────────────
// Wire this up with your Supabase client

async function submitApplication(form: FormState): Promise<void> {
  // 1. Upload certification file
  // const { data: certData } = await supabase.storage
  //   .from('certifications')
  //   .upload(`${Date.now()}-${form.certFile?.name}`, form.certFile!);

  // 2. Upload resume file (optional)
  // let resumeUrl = null;
  // if (form.resumeFile) {
  //   const { data: resumeData } = await supabase.storage
  //     .from('resumes')
  //     .upload(`${Date.now()}-${form.resumeFile.name}`, form.resumeFile);
  //   resumeUrl = resumeData?.path;
  // }

  // 3. Insert application record
  // await supabase.from('applications').insert({
  //   full_name: form.fullName,
  //   phone: form.phone,
  //   email: form.email,
  //   years_exp: parseInt(form.yearsExp),
  //   cert_url: certData?.path,
  //   resume_url: resumeUrl,
  //   status: 'pending',
  //   created_at: new Date().toISOString(),
  // });

  // Simulate async network call — remove in production
  await new Promise((r) => setTimeout(r, 1800));
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

const IconWrench = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const IconCertificate = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const IconBlueprint = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconUpload = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── File Upload Component ───────────────────────────────────────────────────

interface FileUploadProps {
  label: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  accept?: string;
  hint?: string;
}

function FileUpload({ label, required, file, onChange, error, accept = '.pdf,.jpg,.jpeg,.png', hint }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.size <= 5 * 1024 * 1024) onChange(dropped);
  }, [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.size <= 5 * 1024 * 1024) onChange(selected);
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4A5568' }}>
        {label} {required && <span style={{ color: '#9B2335' }}>*</span>}
      </label>

      {file ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1.5px solid #2D4A63', background: '#F0F5F8', fontFamily: 'DM Sans, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ color: '#2D4A63' }}><IconCheck /></div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#111418' }}>{file.name}</div>
              <div style={{ fontSize: '12px', color: '#8A9BB0' }}>{formatSize(file.size)}</div>
            </div>
          </div>
          <button type="button" onClick={() => onChange(null)} style={{ color: '#8A9BB0', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }} aria-label="Remove file">
            <IconX />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${isDragging ? '#4A7A9B' : error ? '#9B2335' : '#D4DBE3'}`,
            background: isDragging ? '#F0F5F8' : 'transparent',
            padding: '28px 24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            transition: 'all 200ms ease',
          }}
          role="button"
          aria-label={`Upload ${label}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <div style={{ color: '#8A9BB0' }}><IconUpload /></div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4A5568', textAlign: 'center' }}>
            Drop file here or <span style={{ color: '#2D4A63', fontWeight: 500 }}>click to browse</span>
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8A9BB0' }}>PDF, JPG, PNG — max 5MB</div>
          {hint && <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#8A9BB0', letterSpacing: '0.03em' }}>{hint}</div>}
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="sr-only" aria-hidden="true" />
      {error && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9B2335' }} role="alert">{error}</span>}
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function WelderHiringPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    yearsExp: '',
    certFile: null,
    resumeFile: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = 'Please enter your full name';
    if (!form.phone.trim() || !/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.yearsExp) e.yearsExp = 'Please select your experience level';
    if (!form.certFile) e.certFile = 'Your 6G certification is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitStatus('loading');
    try {
      await submitApplication(form);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  const field = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const InputField = ({
    id, label, type = 'text', placeholder, value, onChange, error, required = true,
  }: {
    id: string; label: string; type?: string; placeholder?: string;
    value: string; onChange: (v: string) => void; error?: string; required?: boolean;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4A5568' }}>
        {label} {required && <span style={{ color: '#9B2335' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          height: 52,
          padding: '0 16px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          color: '#111418',
          background: '#FFFFFF',
          border: `1.5px solid ${error ? '#9B2335' : '#D4DBE3'}`,
          borderRadius: 0,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#2D4A63'; e.currentTarget.style.boxShadow = '0 0 0 3px #D6E8F2'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#9B2335' : '#D4DBE3'; e.currentTarget.style.boxShadow = 'none'; }}
      />
      {error && <span id={`${id}-error`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9B2335' }} role="alert">{error}</span>}
    </div>
  );

  const requirements = [
    { icon: <IconWrench />, title: 'SMAW & GTAW Proficiency', desc: 'Demonstrated field expertise in Shielded Metal Arc and Gas Tungsten Arc welding processes' },
    { icon: <IconCertificate />, title: 'Valid 6G Certification', desc: 'Current, verifiable 6G fixed-inclined position welding certification — required for all applicants' },
    { icon: <IconBlueprint />, title: 'Isometric Drawing Interpretation', desc: 'Ability to read and execute from isometric and orthographic piping schematics without supervision' },
    { icon: <IconShield />, title: 'Safety & Compliance', desc: 'Strict adherence to PPE protocols, LOTO procedures, hot-work permits, and site safety standards' },
    { icon: <IconClock />, title: '3+ Years Field Experience', desc: 'Proven track record on industrial, refinery, or pipeline construction projects' },
  ];

  const benefits = [
    { stat: '$48–$62', unit: 'Per Hour', desc: 'Competitive union-scale rates based on certification grade and project complexity' },
    { stat: '18+', unit: 'Months', desc: 'Long-term project duration with possibility of contract extension and permanent placement' },
    { stat: '0', unit: 'LTI Record', desc: 'Zero Lost Time Incidents on our last four major pipeline campaigns — safety is non-negotiable' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F4F5F6; }
        ::selection { background: #D6E8F2; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'DM Sans, sans-serif', color: '#111418', background: '#F4F5F6' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section style={{
          background: '#1B2B3A',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px',
        }}>
          {/* Structural grid overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,122,155,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,122,155,0.06) 1px, transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none' }} />
          {/* Subtle diagonal accent */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 480, height: 480, background: 'radial-gradient(ellipse at center, rgba(45,74,99,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(139,175,199,0.3)', padding: '6px 14px', marginBottom: 32 }}>
              <div style={{ width: 7, height: 7, background: '#4A7A9B', borderRadius: '50%' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8BAFC7' }}>Now Hiring · Immediate Start</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#FFFFFF', textTransform: 'uppercase', maxWidth: 700, marginBottom: 24 }}>
              Hiring Expert<br />
              <span style={{ color: '#8BAFC7' }}>6G Welders</span>
            </h1>

            {/* Subheadline */}
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginBottom: 40 }}>
              Join a tier-one pipeline project. Competitive hourly rates, long-term placement, and a safety-first culture built for experienced professionals.
            </p>

            {/* CTA */}
            <button
              onClick={scrollToForm}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#2D4A63', color: '#FFFFFF',
                fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '16px 36px', border: 'none', borderRadius: 0, cursor: 'pointer',
                transition: 'background 200ms ease, transform 200ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#4A7A9B'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#2D4A63'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Apply Now <IconArrow />
            </button>

            {/* Trust bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {['SMAW / GTAW Roles', 'Pipeline & Refinery Projects', 'Safety-First Culture', 'Long-Term Placement'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ color: '#4A7A9B' }}><IconCheck /></div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REQUIREMENTS ─────────────────────────────────────────────────── */}
        <section style={{ background: '#F4F5F6', padding: 'clamp(48px,8vw,96px) 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A9BB0', marginBottom: 12 }}>Role Requirements</div>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.01em', color: '#111418', textTransform: 'uppercase' }}>
                What We're Looking For
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: '#D4DBE3' }}>
              {requirements.map((r, i) => (
                <div key={i} style={{ background: '#FFFFFF', padding: '28px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', borderLeft: '3px solid #4A7A9B' }}>
                  <div style={{ color: '#3D4F5C', flexShrink: 0, marginTop: 2 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 15, color: '#111418', marginBottom: 6 }}>{r.title}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#4A5568' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
        <section style={{ background: '#1B2B3A', padding: 'clamp(48px,8vw,96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,122,155,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,122,155,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7A9B', marginBottom: 12 }}>Why Join Us</div>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.01em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                Built for Professionals
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '36px 32px' }}>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 52, lineHeight: 1, color: '#8BAFC7', marginBottom: 4 }}>{b.stat}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B0BEC5', marginBottom: 16 }}>{b.unit}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ──────────────────────────────────────────────── */}
        <section ref={formRef} id="apply" style={{ background: '#ECEEF0', padding: 'clamp(48px,8vw,100px) 24px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A9BB0', marginBottom: 12 }}>Start Your Application</div>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-0.01em', color: '#111418', textTransform: 'uppercase', marginBottom: 12 }}>
                Apply Now
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#4A5568', lineHeight: 1.65 }}>
                Complete the form below. All submissions are reviewed by our talent team within 48 hours.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div style={{ background: '#FFFFFF', border: '1.5px solid #2D6A4F', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#2D6A4F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <IconCheck />
                </div>
                <h3 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: 22, color: '#111418' }}>Application Received</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#4A5568', maxWidth: 360 }}>
                  Thank you. Our talent team will review your credentials and reach out within 48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ background: '#FFFFFF', padding: 'clamp(24px, 5vw, 40px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <InputField id="fullName" label="Full Name" placeholder="John Smith" value={form.fullName} onChange={(v) => field('fullName', v)} error={errors.fullName} />
                <InputField id="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(v) => field('phone', v)} error={errors.phone} />
                <InputField id="email" label="Email Address" type="email" placeholder="john@example.com" value={form.email} onChange={(v) => field('email', v)} error={errors.email} />

                {/* Years of Experience */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="yearsExp" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4A5568' }}>
                    Years of Experience <span style={{ color: '#9B2335' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="yearsExp"
                      value={form.yearsExp}
                      onChange={(e) => field('yearsExp', e.target.value)}
                      aria-invalid={!!errors.yearsExp}
                      style={{
                        height: 52, padding: '0 40px 0 16px', width: '100%',
                        fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: form.yearsExp ? '#111418' : '#8A9BB0',
                        background: '#FFFFFF', border: `1.5px solid ${errors.yearsExp ? '#9B2335' : '#D4DBE3'}`,
                        borderRadius: 0, outline: 'none', appearance: 'none', cursor: 'pointer',
                      }}
                    >
                      <option value="">Select range</option>
                      <option value="1-2">1–2 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="6-10">6–10 years</option>
                      <option value="11-15">11–15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#8A9BB0' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                  </div>
                  {errors.yearsExp && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#9B2335' }} role="alert">{errors.yearsExp}</span>}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#ECEEF0', margin: '4px 0' }} />

                <FileUpload
                  label="6G Certification"
                  required
                  file={form.certFile}
                  onChange={(f) => setForm((s) => ({ ...s, certFile: f }))}
                  error={errors.certFile}
                  hint="Upload your current, valid certification document"
                />
                <FileUpload
                  label="Resume"
                  file={form.resumeFile}
                  onChange={(f) => setForm((s) => ({ ...s, resumeFile: f }))}
                  hint="Optional — PDF preferred"
                />

                {submitStatus === 'error' && (
                  <div style={{ background: '#FEF2F2', border: '1.5px solid #9B2335', padding: '12px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9B2335' }} role="alert">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  style={{
                    height: 56, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: submitStatus === 'loading' ? '#2D4A63' : '#1B2B3A',
                    color: '#FFFFFF', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: 16,
                    letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', borderRadius: 0,
                    cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: submitStatus === 'loading' ? 0.7 : 1,
                    transition: 'background 200ms ease',
                    marginTop: 8,
                  }}
                  onMouseEnter={(e) => { if (submitStatus !== 'loading') e.currentTarget.style.background = '#2D4A63'; }}
                  onMouseLeave={(e) => { if (submitStatus !== 'loading') e.currentTarget.style.background = '#1B2B3A'; }}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>Submit Application <IconArrow /></>
                  )}
                </button>

                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#8A9BB0', textAlign: 'center', lineHeight: 1.6 }}>
                  By submitting, you consent to our team reviewing your credentials. Your data is stored securely and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{ background: '#111418', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.03em' }}>
            © 2026 Antigravity Industrial. All rights reserved.
          </p>
        </footer>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    </>
  );
}
