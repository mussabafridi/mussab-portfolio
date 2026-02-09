import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Search, Database, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '01', title: 'DISCOVER', icon: Search },
  { number: '02', title: 'MODEL', icon: Database },
  { number: '03', title: 'VISUALIZE', icon: BarChart3 },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const stepsEl = stepsRef.current;
    const image = imageRef.current;
    const line = lineRef.current;

    if (!section || !headline || !stepsEl || !image || !line) return;

    const stepItems = stepsEl.querySelectorAll('.step-item');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(headline,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(stepItems,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        )
        .fromTo(image,
          { x: '55vw', scale: 0.72, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(line,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: 'top' },
          0.1
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(stepsEl,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(image,
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.88, opacity: 0, ease: 'power2.in' },
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

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full h-screen bg-bg-primary overflow-hidden z-[60]"
    >
      {/* Content Container */}
      <div className="relative w-full h-full px-[6vw] py-[8vh]">
        {/* Left Text Block */}
        <div
          ref={headlineRef}
          className="absolute left-[6vw] top-[18vh] w-[50vw] max-w-[650px]"
        >
          {/* Label */}
          <p className="text-label text-text-secondary mb-4">PROCESS</p>

          {/* Title */}
          <h2 className="heading-display text-[clamp(34px,3.6vw,56px)] text-text-primary mb-4">
            From raw data to clarity.
          </h2>

          {/* Accent Underline */}
          <div className="accent-line w-[38vw] max-w-[400px] mb-6" />

          {/* Description */}
          <p className="text-[clamp(15px,1.2vw,18px)] text-text-secondary leading-relaxed mb-10 max-w-[480px]">
            I follow a lightweight, repeatable workflow: understand the business 
            question, clean and model the data, then build a dashboard that's 
            easy to maintain.
          </p>

          {/* Steps */}
          <div ref={stepsRef} className="space-y-4 mb-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="step-item flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-indigo/10 flex items-center justify-center group-hover:bg-accent-indigo/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-indigo" />
                  </div>
                  <span className="text-label text-accent-indigo">{step.number}</span>
                  <span className="text-label text-text-primary">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <button className="pill-button group">
            Download resume
            <Download className="ml-2 w-4 h-4" />
          </button>
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
              src="/images/process_whiteboard.jpg"
              alt="Process Workflow"
              className="w-[clamp(280px,34vw,520px)] h-[clamp(280px,34vw,520px)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
