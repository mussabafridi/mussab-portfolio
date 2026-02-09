import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectSectionProps {
  id: string;
  label: string;
  tag?: string;
  title: string;
  description: string;
  year: string;
  type: string;
  image: string;
  zIndex: number;
  showAccentPanel?: boolean;
  showHorizontalRule?: boolean;
}

export default function ProjectSection({
  id,
  label,
  tag,
  title,
  description,
  year,
  type,
  image,
  zIndex,
  showAccentPanel = false,
  showHorizontalRule = false,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const accentPanelRef = useRef<HTMLDivElement>(null);
  const horizontalRuleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const imageEl = imageRef.current;
    const line = lineRef.current;
    const underline = underlineRef.current;
    const accentPanel = accentPanelRef.current;
    const horizontalRule = horizontalRuleRef.current;

    if (!section || !headline || !imageEl || !line || !underline) return;

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
        .fromTo(underline,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', transformOrigin: 'left' },
          0.05
        )
        .fromTo(imageEl,
          { x: '55vw', scale: 0.72, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(line,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', transformOrigin: 'top' },
          0.1
        );

      if (accentPanel) {
        scrollTl.fromTo(accentPanel,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );
      }

      if (horizontalRule) {
        scrollTl.fromTo(horizontalRule,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', transformOrigin: 'left' },
          0.15
        );
      }

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(imageEl,
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.88, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(line,
          { scaleY: 1, opacity: 1 },
          { scaleY: 0.2, opacity: 0.2, ease: 'power2.in' },
          0.70
        );

      if (accentPanel) {
        scrollTl.fromTo(accentPanel,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.70
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen bg-bg-primary overflow-hidden"
      style={{ zIndex }}
    >
      {/* Accent Panel (optional) */}
      {showAccentPanel && (
        <div
          ref={accentPanelRef}
          className="absolute left-[68vw] top-[18vh] w-[18vw] h-[22vh] bg-accent-indigo/10 border-l-2 border-accent-indigo"
        />
      )}

      {/* Content Container */}
      <div className="relative w-full h-full px-[6vw] py-[8vh]">
        {/* Left Text Block */}
        <div
          ref={headlineRef}
          className="absolute left-[6vw] top-[18vh] w-[46vw] max-w-[600px]"
        >
          {/* Label */}
          <p className="text-label text-text-secondary mb-4">{label}</p>

          {/* Tag (optional) */}
          {tag && (
            <span className="inline-block px-3 py-1 bg-accent-indigo/10 text-accent-indigo text-xs font-mono uppercase tracking-wider rounded-full mb-4">
              {tag}
            </span>
          )}

          {/* Title */}
          <h2 className="heading-display text-[clamp(34px,3.6vw,56px)] text-text-primary mb-4">
            {title}
          </h2>

          {/* Accent Underline */}
          <div
            ref={underlineRef}
            className="accent-line w-[38vw] max-w-[400px] mb-6"
          />

          {/* Description */}
          <p className="text-[clamp(15px,1.2vw,18px)] text-text-secondary leading-relaxed mb-8 max-w-[480px]">
            {description}
          </p>

          {/* Meta Row */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-label text-text-secondary">
              YEAR {year}
            </span>
            <span className="text-label text-text-secondary">
              TYPE {type}
            </span>
          </div>

          {/* Horizontal Rule (optional) */}
          {showHorizontalRule && (
            <div
              ref={horizontalRuleRef}
              className="accent-line w-[28vw] max-w-[300px] mb-8"
            />
          )}

          {/* CTA Button */}
          <button className="pill-button-outline group">
            Read case study
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              src={image}
              alt={title}
              className="w-[clamp(280px,34vw,520px)] h-[clamp(280px,34vw,520px)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
