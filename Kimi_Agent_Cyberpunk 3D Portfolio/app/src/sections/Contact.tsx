import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CenteredHeader from '../components/CenteredHeader';
import {
  Send,
  Loader2,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FormState = 'idle' | 'sending' | 'sent';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me', label: 'WhatsApp' },
];

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const form = sectionRef.current.querySelector('.contact-form-wrapper');
    const socials = sectionRef.current.querySelectorAll('.social-icon');

    if (form) {
      gsap.from(form, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (socials.length) {
      gsap.from(socials, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: socials[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState !== 'idle') return;

    setFormState('sending');

    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => {
        setFormState('idle');
        if (formRef.current) formRef.current.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 w-full py-20 md:py-[120px] px-4 md:px-6 border-t border-white/5"
    >
      <div className="max-w-[700px] mx-auto">
        <CenteredHeader
          badge="Contact"
          heading="Let's Build Something Amazing Together"
          subheading="Have a project in mind? Fill out the form below and I'll get back to you within 24 hours."
        />

        {/* Form */}
        <div className="contact-form-wrapper glass-card !p-8 md:!p-12 mt-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                disabled={formState === 'sending' || formState === 'sent'}
                className="w-full bg-[#09090B]/60 border border-white/10 rounded-xl px-5 py-4 text-[#FAFAFA] placeholder:text-[#71717A] text-[15px] focus:outline-none focus:border-[#22D3EE] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)] transition-all duration-200 disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                disabled={formState === 'sending' || formState === 'sent'}
                className="w-full bg-[#09090B]/60 border border-white/10 rounded-xl px-5 py-4 text-[#FAFAFA] placeholder:text-[#71717A] text-[15px] focus:outline-none focus:border-[#22D3EE] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)] transition-all duration-200 disabled:opacity-50"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                Project Type
              </label>
              <select
                required
                disabled={formState === 'sending' || formState === 'sent'}
                className="w-full bg-[#09090B]/60 border border-white/10 rounded-xl px-5 py-4 text-[#FAFAFA] text-[15px] focus:outline-none focus:border-[#22D3EE] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)] transition-all duration-200 disabled:opacity-50 appearance-none cursor-pointer"
              >
                <option value="">Select a project type...</option>
                <option value="business">Business Website</option>
                <option value="ecommerce">E-Commerce Store</option>
                <option value="webapp">Web Application</option>
                <option value="automation">AI Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                Tell Me About Your Project
              </label>
              <textarea
                rows={5}
                placeholder="Describe your goals, timeline, and any specific requirements..."
                required
                disabled={formState === 'sending' || formState === 'sent'}
                className="w-full bg-[#09090B]/60 border border-white/10 rounded-xl px-5 py-4 text-[#FAFAFA] placeholder:text-[#71717A] text-[15px] focus:outline-none focus:border-[#22D3EE] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)] transition-all duration-200 resize-none disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState !== 'idle'}
              className={`neon-btn w-full !py-4 transition-all duration-300 ${
                formState === 'sent'
                  ? '!bg-emerald-400 !shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                  : ''
              }`}
            >
              {formState === 'idle' && (
                <>
                  Send Message
                  <Send className="w-[18px] h-[18px]" />
                </>
              )}
              {formState === 'sending' && (
                <>
                  Sending...
                  <Loader2 className="w-[18px] h-[18px] animate-spin" />
                </>
              )}
              {formState === 'sent' && (
                <>
                  Message Sent!
                  <CheckCircle2 className="w-[18px] h-[18px]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 md:gap-6 mt-12">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#71717A] transition-all duration-300 hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 hover:text-[#22D3EE] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
