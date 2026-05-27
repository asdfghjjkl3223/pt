import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CenteredHeader from '../components/CenteredHeader';
import { Check, X } from 'lucide-react';
import type { PricingTier } from '../types';

gsap.registerPlugin(ScrollTrigger);

const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: 'Starter',
    price: '$999',
    description:
      'Perfect for small businesses and personal brands launching their first professional website.',
    features: [
      { text: 'Single-page responsive website', included: true },
      { text: 'Custom UI/UX design', included: true },
      { text: 'Mobile optimization', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: '1 week delivery', included: true },
      { text: 'Content management system', included: false },
      { text: 'Advanced animations', included: false },
    ],
    cta: 'Get Started',
  },
  {
    id: 2,
    name: 'Professional',
    price: '$2,499',
    description:
      'Complete multi-page website with advanced features, automation integration, and conversion optimization.',
    highlighted: true,
    features: [
      { text: 'Multi-page responsive website (up to 6)', included: true },
      { text: 'Premium custom design', included: true },
      { text: 'Mobile-first optimization', included: true },
      { text: 'Advanced SEO & analytics', included: true },
      { text: 'WhatsApp/CRM integration', included: true },
      { text: 'Basic AI automation', included: true },
      { text: '2 weeks delivery', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Your Project',
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$5,999',
    description:
      'Full-scale digital transformation with custom systems, advanced AI integration, and dedicated support.',
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Bespoke design system', included: true },
      { text: 'Full AI automation suite', included: true },
      { text: 'Custom portal development', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: '1 month delivery', included: true },
      { text: '3 months support', included: true },
      { text: 'Dedicated project manager', included: true },
    ],
    cta: 'Contact for Custom',
  },
];

export default function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.from(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.15,
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
      id="pricing"
      className="relative z-10 w-full py-20 md:py-[120px] px-4 md:px-6 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <CenteredHeader
          badge="Pricing"
          heading="Transparent Pricing, Premium Results"
          subheading="Choose the package that fits your goals. All plans include dedicated support and pixel-perfect delivery."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-[20px] p-8 md:p-10 backdrop-blur-lg transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-zinc-900/70 border border-[#22D3EE] shadow-[0_0_30px_rgba(34,211,238,0.15),inset_0_0_30px_rgba(34,211,238,0.03)] lg:-translate-y-2'
                  : 'bg-zinc-900/50 border border-white/[0.08] hover:border-[#22D3EE]/30'
              }`}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#22D3EE] text-[#09090B] text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-semibold text-[#FAFAFA]">{tier.name}</h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-[#FAFAFA]">{tier.price}</span>
                <span className="text-[#A1A1AA] text-sm ml-1">/project</span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#A1A1AA] mt-2 min-h-[42px] leading-relaxed">
                {tier.description}
              </p>

              {/* Feature List */}
              <ul className="mt-8 space-y-0">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-b-0"
                  >
                    {feature.included ? (
                      <Check className="w-[18px] h-[18px] text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-[18px] h-[18px] text-white/15 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-[#A1A1AA]' : 'text-[#71717A] line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full mt-8 ${
                  tier.highlighted ? 'neon-btn' : 'ghost-btn !rounded-full !py-4'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
