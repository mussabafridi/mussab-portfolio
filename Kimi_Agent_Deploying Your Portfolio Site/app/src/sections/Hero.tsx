import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;
    const line = lineRef.current;
    const micro = microRef.current;

    if (!section || !headline || !subheadline || !cta || !image || !line || !micro) return;

    const ctx = gsap.context(() => {
      // Split headline into words
      const words = headline.querySelectorAll('.word');
      
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(words, 
          { opacity: 0, y: 24, rotateX: 25 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03 }
        )
        .fromTo(subheadline,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(cta,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(micro,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(image,
          { opacity: 0, scale: 0.65, rotate: -8 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(line,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, transformOrigin: 'top' },
          '-=0.6'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headline, subheadline, cta, micro, image, line], {
              opacity: 1, x: 0, scale: 1, scaleY: 1
            });
          }
        }
      });

      // ENTRANCE (0-30%): Hold state (already visible from load animation)
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(subheadline,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(cta,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(micro,
          { x: 0, opacity: 1 },
          { x: '-8vw', opacity: 0, ease: 'power2.in' },
          0.76
        )
        .fromTo(image,
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.85, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(line,
          { scaleY: 1, opacity: 1 },
          { scaleY: 0.2, opacity: 0.2, ease: 'power2.in' },
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-bg-primary overflow-hidden z-10"
    >
      {/* Content Container */}
      <div className="relative w-full h-full px-[6vw] py-[8vh]">
        {/* Left Text Block */}
        <div className="absolute left-[6vw] top-[18vh] w-[52vw] max-w-[700px]">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="heading-display text-[clamp(44px,5vw,76px)] text-text-primary mb-6"
            style={{ perspective: '1000px' }}
          >
            <span className="word inline-block">Turning</span>{' '}
            <span className="word inline-block">data</span>{' '}
            <span className="word inline-block">into</span>{' '}
            <span className="word inline-block">decisions.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-[clamp(16px,1.3vw,20px)] text-text-secondary leading-relaxed max-w-[500px] mb-8"
          >
            I'm Mussab — a data analyst and BI developer who cleans, models, and 
            visualizes complex datasets into dashboards people actually use.
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={scrollToWork}
            className="pill-button group mb-6"
          >
            Explore work
            <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          {/* Micro Label */}
          <p
            ref={microRef}
            className="text-label text-text-secondary"
          >
            BASED IN KARACHI • AVAILABLE FOR PROJECTS
          </p>
        </div>

        {/* Vertical Divider Line */}
        <div
          ref={lineRef}
          className="accent-line-vertical absolute left-[58vw] top-[18vh] h-[64vh]"
        />

        {/* Circular Image */}
        <div
          ref={imageRef}
          className="absolute right-[10vw] top-1/2 -translate-y-1/2"
        >
          <div className="circular-mask-ring">
            <img
              src="/images/hero_workspace.jpg"
              alt="Analyst Workspace"
              className="w-[clamp(280px,34vw,520px)] h-[clamp(280px,34vw,520px)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
