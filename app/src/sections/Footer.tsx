import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  };

  return (
    <footer className="relative z-10 w-full py-10 px-6 bg-[#050507] border-t border-white/[0.03]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#71717A]">
          &copy; {new Date().getFullYear()} Ansh Soni. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#22D3EE] transition-colors duration-300 cursor-pointer"
        >
          Back to Top
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
