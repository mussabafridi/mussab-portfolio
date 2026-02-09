import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer.querySelector('.footer-content'),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-bg-dark py-[6vh] px-[6vw] z-[90]"
    >
      <div className="footer-content max-w-[1200px] mx-auto text-center">
        {/* Main Text */}
        <p className="text-xl font-display font-medium text-white mb-4">
          Thanks for visiting.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <a
            href="https://linkedin.com/in/muhammad-mussab-bin-tahir"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-indigo/20 hover:text-accent-indigo transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/mussabafridi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-indigo/20 hover:text-accent-indigo transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:mussabafridi@outlook.com"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-indigo/20 hover:text-accent-indigo transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-text-muted-dark">
          © 2026 Mussab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
