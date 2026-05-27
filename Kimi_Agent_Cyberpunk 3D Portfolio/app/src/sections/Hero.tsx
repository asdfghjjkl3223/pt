import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { MessageCircle, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { buttonRef, handlers } = useMagneticButton();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.2
    );

    // Headline
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.3
    );

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.45
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.6
    );

    // Canvas fade in
    tl.fromTo(
      canvasRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2 },
      0.8
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5 },
      1
    );

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      if (window.scrollY > 100 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToWork = () => {
    const el = document.querySelector('#work');
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas container (animated in via GSAP) */}
      <div ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
        {/* Canvas is rendered by ParticleBackground at root level */}
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        {/* Availability Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
          <span
            className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span className="section-badge !text-xs">Available for Projects</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold text-[#FAFAFA] leading-[1.1]"
          style={{ opacity: 0 }}
        >
          I Build{' '}
          <span className="text-[#22D3EE]" style={{ textShadow: '0 0 40px rgba(34, 211, 238, 0.3)' }}>
            Websites That Convert
          </span>{' '}
          Visitors Into Customers
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-base md:text-xl text-[#A1A1AA] mt-6 max-w-[600px] mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          Creative Web Developer &amp; Next-Gen AI Automation Expert crafting digital experiences that drive real business growth.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-10" style={{ opacity: 0 }}>
          <button
            ref={buttonRef}
            {...handlers}
            onClick={() => window.open('https://wa.me/', '_blank')}
            className="neon-btn text-base md:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Start a Project on WhatsApp
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={scrollToWork}
        style={{ opacity: 0 }}
      >
        <ChevronDown
          className="w-6 h-6 text-[#A1A1AA]"
          style={{ animation: 'bounce-chevron 1.5s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
