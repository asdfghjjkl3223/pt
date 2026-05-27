import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center gap-1 group"
          >
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28L14 4H18L28 28H24L21 20H11L8 28H4ZM12.5 16.5H19.5L16 7L12.5 16.5Z" fill="#FAFAFA"/>
              <path d="M30 4V28H34V18H40C46 18 50 14 50 11C50 8 46 4 40 4H30ZM34 8H40C43.5 8 46 9.5 46 11C46 12.5 43.5 14 40 14H34V8Z" fill="#FAFAFA"/>
              <path d="M54 4V28H58V18L66 28H71L62.5 17.5L70 4H66L59.5 15.5L58 14V4H54Z" fill="#FAFAFA"/>
              <path d="M74 4V28H78V4H74Z" fill="#FAFAFA"/>
              <circle cx="78" cy="6" r="3" fill="#22D3EE"/>
            </svg>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="relative text-sm font-medium text-[#A1A1AA] hover:text-[#22D3EE] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#22D3EE] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="neon-btn !py-3 !px-6 !text-sm"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-[#FAFAFA]" />
            ) : (
              <Menu className="w-6 h-6 text-[#FAFAFA]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#09090B]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8 text-[#FAFAFA]" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-2xl font-semibold text-[#FAFAFA] hover:text-[#22D3EE] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="neon-btn mt-4"
          >
            Let&apos;s Talk
          </button>
        </div>
      )}
    </>
  );
}
