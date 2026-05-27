import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CenteredHeader from '../components/CenteredHeader';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'business', label: 'Local & Business' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'premium', label: 'Premium Portals' },
];

const projects: Project[] = [
  {
    id: 1,
    title: 'EduVibe Academy',
    description: 'Modern school website with student portal integration, course management, and online admissions system.',
    image: '/assets/project-1.jpg',
    category: 'business',
    tags: ['Education', 'Portal', 'React'],
  },
  {
    id: 2,
    title: 'IronPulse Gym',
    description: 'High-energy fitness center site with class booking system, trainer profiles, and membership management.',
    image: '/assets/project-2.jpg',
    category: 'business',
    tags: ['Fitness', 'Booking', 'Next.js'],
  },
  {
    id: 3,
    title: 'BrewHaven Café',
    description: 'Artisan coffee shop with online ordering, delivery tracking, and loyalty program integration.',
    image: '/assets/project-3.jpg',
    category: 'ecommerce',
    tags: ['Food', 'E-Commerce', 'Stripe'],
  },
  {
    id: 4,
    title: 'LuxeLiving Estates',
    description: 'Premium real estate platform with virtual 3D tours, property listings, and mortgage calculator.',
    image: '/assets/project-4.jpg',
    category: 'ecommerce',
    tags: ['Real Estate', '3D', 'Vue.js'],
  },
  {
    id: 5,
    title: 'Nexus Dashboard',
    description: 'AI-powered business analytics platform with real-time data visualization and predictive insights.',
    image: '/assets/project-5.jpg',
    category: 'premium',
    tags: ['SaaS', 'AI', 'D3.js'],
  },
  {
    id: 6,
    title: 'AutoFlow Systems',
    description: 'Intelligent workflow automation engine with no-code builder and multi-platform integrations.',
    image: '/assets/project-6.jpg',
    category: 'premium',
    tags: ['Automation', 'No-Code', 'Python'],
  },
];

export default function WorkShowcase() {
  const [activeTab, setActiveTab] = useState('business');
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = projects.filter((p) => p.category === activeTab);

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
  }, { scope: sectionRef, dependencies: [activeTab] });

  const handleTabSwitch = (tabId: string) => {
    if (tabId === activeTab || !gridRef.current) return;

    const cards = gridRef.current.children;

    // Animate out
    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      stagger: 0.03,
      onComplete: () => {
        setActiveTab(tabId);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-10 w-full py-20 md:py-[120px] px-4 md:px-6 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <CenteredHeader
          badge="Portfolio"
          heading="Featured Work"
          subheading="A curated selection of projects spanning web design, e-commerce, and automation systems"
        />

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10 md:mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabSwitch(cat.id)}
              className={`px-5 md:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#22D3EE] text-[#09090B] border border-[#22D3EE]'
                  : 'bg-transparent text-[#A1A1AA] border border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/5 transition-colors duration-300" />
                {/* Category tag */}
                <span className="absolute top-3 left-3 tag-pill !bg-[#09090B]/80 !backdrop-blur-lg !text-[#22D3EE] !text-[10px] !px-2.5 !py-1">
                  {categories.find((c) => c.id === project.category)?.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#FAFAFA]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Launch Button */}
                <button className="ghost-btn mt-4 !py-2.5 !px-5 !text-xs">
                  Launch Live Preview
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
