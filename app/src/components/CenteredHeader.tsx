import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBadge from './SectionBadge';

gsap.registerPlugin(ScrollTrigger);

interface CenteredHeaderProps {
  badge: string;
  heading: string;
  subheading: string;
}

export default function CenteredHeader({ badge, heading, subheading }: CenteredHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const els = ref.current.children;
    gsap.from(els, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="text-3xl md:text-5xl font-bold text-[#FAFAFA] mt-4 leading-tight">
        {heading}
      </h2>
      <p className="text-base md:text-lg text-[#A1A1AA] mt-3 max-w-xl mx-auto">
        {subheading}
      </p>
    </div>
  );
}
