import ParticleBackground from './ParticleBackground';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import WorkShowcase from '../sections/WorkShowcase';
import Features from '../sections/Features';
import Pricing from '../sections/Pricing';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function PageLayout() {
  return (
    <>
      {/* 3D Particle Background - Fixed behind everything */}
      <ParticleBackground />

      {/* Navigation - Fixed on top */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-[1]">
        <Hero />
        <WorkShowcase />
        <Features />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
