import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface FormDataState {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Nama lengkap wajib diisi.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Format alamat email tidak valid.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Pesan terlalu pendek (minimal 15 karakter).';
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status !== 'idle' && status !== 'sending') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      setStatus('success');
      setStatusMessage('Pesan Anda telah diterima.');
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        setStatus('success');
        setStatusMessage(
          'Pesan Anda berhasil dicatat secara lokal (Kredensial EmailJS belum diisi di .env, mode pratinjau aktif).'
        );
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      }, 700);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        message: formData.message.trim(),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setStatusMessage('Terima kasih! Pesan dan cerita Anda telah terkirim ke kurator.');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setStatusMessage('Gagal mengirim pesan melalui EmailJS. Silakan periksa koneksi atau coba beberapa saat lagi.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-line bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-tambak/10 text-tambak border border-tambak/25 text-xs font-medium tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-tambak"></span>
              <span>Hubungi Pengelola</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
              Kirimkan Kisah atau Saran
            </h2>
            <p className="text-sm text-ink/75 leading-relaxed font-sans max-w-lg mx-auto">
              Punya usulan toponimi baru, catatan arsip masa lampau, atau ingin berkolaborasi merawat ingatan Sidoarjo? Tuliskan pesan Anda kepada kami.
            </p>
          </Reveal>
        </div>

        <div className="max-w-xl mx-auto">
          <Reveal delay={0.15}>
            <div className="bg-[#FAF7F2] border border-line rounded-md p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSubmit} noValidate>
                
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-honeypot">Jangan isi kolom ini jika Anda manusia</label>
                  <input
                    type="text"
                    id="contact-honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider"
                  >
                    Nama Lengkap <span className="text-clay">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Raden Suryo"
                    className={`w-full bg-paper border ${
                      errors.name ? 'border-red-500 ring-1 ring-red-400' : 'border-line hover:border-ink/30 focus:border-clay'
                    } rounded-md px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-clay/40 transition-colors`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-600 mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider"
                  >
                    Alamat Email <span className="text-clay">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className={`w-full bg-paper border ${
                      errors.email ? 'border-red-500 ring-1 ring-red-400' : 'border-line hover:border-ink/30 focus:border-clay'
                    } rounded-md px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-clay/40 transition-colors`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider"
                  >
                    Pesan atau Usulan <span className="text-clay">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Sampaikan cerita, kritik, atau usulan titik sejarah Sidoarjo yang belum terdata..."
                    className={`w-full bg-paper border ${
                      errors.message ? 'border-red-500 ring-1 ring-red-400' : 'border-line hover:border-ink/30 focus:border-clay'
                    } rounded-md p-3.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-clay/40 transition-colors resize-y leading-relaxed`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-600 mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div
                    aria-live="polite"
                    className={`p-3 rounded-md text-xs mb-5 flex items-start gap-2 border ${
                      status === 'success'
                        ? 'bg-tambak/10 border-tambak/30 text-tambak font-medium'
                        : 'bg-red-50 border-red-200 text-red-700 font-medium'
                    }`}
                  >
                    {status === 'success' ? (
                      <svg className="w-4 h-4 shrink-0 text-tambak" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="leading-relaxed">{statusMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'sending'}
                  className="w-full"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4 text-paper" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sedang Mengirim...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Kirim Pesan ke Kurator</span>
                    </span>
                  )}
                </Button>

              </form>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
