import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import ProjectSection from './sections/ProjectSection';
import ProcessSection from './sections/ProcessSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

// Project data
const projects = [
  {
    id: 'work',
    label: 'PROJECT',
    title: 'Sales Performance Dashboard',
    description: 'A single-page BI view that tracks revenue, pipeline, and rep-level targets—built for weekly leadership reviews.',
    year: '2024',
    type: 'PRODUCT',
    image: '/images/project_dashboard.jpg',
    zIndex: 20,
  },
  {
    id: 'project-2',
    label: 'PROJECT',
    tag: 'ML / PYTHON',
    title: 'Customer Churn Predictor',
    description: 'Built a classification pipeline to flag at-risk accounts and surfaced drivers through feature importance and cohort analysis.',
    year: '2024',
    type: 'ANALYTICS',
    image: '/images/project_ml.jpg',
    zIndex: 30,
  },
  {
    id: 'project-3',
    label: 'PROJECT',
    title: 'Marketing Attribution Model',
    description: 'Mapped multi-touch journeys to revenue, reduced reporting time, and improved budget allocation decisions.',
    year: '2023',
    type: 'MODELING',
    image: '/images/project_marketing.jpg',
    zIndex: 40,
    showAccentPanel: true,
  },
  {
    id: 'project-4',
    label: 'PROJECT',
    title: 'Supply Chain BI Suite',
    description: 'Unified inventory, procurement, and logistics data into a clean monitoring layer with alerts and drill-downs.',
    year: '2023',
    type: 'OPERATIONS',
    image: '/images/project_supply.jpg',
    zIndex: 50,
    showHorizontalRule: true,
  },
];

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Project Sections */}
        {projects.map((project) => (
          <ProjectSection
            key={project.id}
            {...project}
          />
        ))}

        {/* Process Section */}
        <ProcessSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
