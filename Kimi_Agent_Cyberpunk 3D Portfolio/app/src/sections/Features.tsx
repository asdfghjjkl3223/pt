import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CenteredHeader from '../components/CenteredHeader';
import {
  Palette,
  Zap,
  Smartphone,
  Brain,
  TrendingUp,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: 'Custom UI/UX Design',
    description:
      'Every interface is thoughtfully designed from scratch to match your brand identity and maximize user engagement.',
    icon: Palette,
  },
  {
    id: 2,
    title: 'Lightning Performance',
    description:
      'Sub-second load times with 90+ Lighthouse scores. Optimized assets, lazy loading, and efficient rendering pipelines.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Mobile-First Fluidity',
    description:
      'Pixel-perfect responsive design that delivers a native app-like experience across every device and screen size.',
    icon: Smartphone,
  },
  {
    id: 4,
    title: 'AI-Powered Automation',
    description:
      'Integrate intelligent automation workflows, chatbots, and AI agents that streamline operations and boost productivity.',
    icon: Brain,
  },
  {
    id: 5,
    title: 'Conversion Architecture',
    description:
      'Strategic layout psychology, A/B-tested components, and data-driven design decisions that turn visitors into buyers.',
    icon: TrendingUp,
  },
  {
    id: 6,
    title: 'Future-Proof Stack',
    description:
      'Built with modern, scalable technologies — React, Next.js, Tailwind CSS, and cloud-native deployment strategies.',
    icon: Layers,
  },
];

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.from(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: gridRef });

  return (
    <section
      id="features"
      className="relative z-10 w-full py-20 md:py-[120px] px-4 md:px-6 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <CenteredHeader
          badge="Why Choose Me"
          heading="Built for Performance, Designed for Results"
          subheading="Every project is crafted with precision, speed, and conversion-focused design principles"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-zinc-900/40 backdrop-blur-lg border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:border-[#22D3EE]/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#22D3EE]" />
                </div>
                <h3 className="text-lg font-semibold text-[#FAFAFA]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
