import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const form = formRef.current;

    if (!section || !leftCol || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftCol,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: leftCol,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(form,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-bg-dark py-[8vh] px-[6vw] z-[80]"
    >
      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[4%] max-w-[1200px] mx-auto">
        {/* Left Column */}
        <div ref={leftColRef} className="flex flex-col justify-center">
          <h2 className="heading-display text-[clamp(34px,3.6vw,56px)] text-white mb-4">
            Let's work together.
          </h2>
          
          <p className="text-[clamp(15px,1.2vw,18px)] text-text-muted-dark leading-relaxed mb-10 max-w-[500px]">
            Have a project, a dataset that needs cleaning, or a dashboard idea? 
            Send a message and I'll reply within 1–2 business days.
          </p>

          {/* Direct Contact */}
          <div className="space-y-4">
            <h3 className="text-label text-text-muted-dark mb-4">DIRECT CONTACT</h3>
            
            <a
              href="mailto:mussabafridi@outlook.com"
              className="flex items-center gap-3 text-white hover:text-accent-indigo transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-indigo/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">mussabafridi@outlook.com</span>
            </a>
            
            <a
              href="https://linkedin.com/in/muhammad-mussab-bin-tahir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-accent-indigo transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-indigo/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-sm">linkedin.com/in/muhammad-mussab-bin-tahir</span>
            </a>
            
            <a
              href="https://github.com/mussabafridi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-accent-indigo transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-indigo/20 transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <span className="text-sm">github.com/mussabafridi</span>
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-lg p-8"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-16 h-16 text-accent-indigo mb-4" />
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                Message sent!
              </h3>
              <p className="text-text-muted-dark">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-label text-text-muted-dark mb-2"
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-muted-dark/50 focus:outline-none focus:border-accent-indigo transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-label text-text-muted-dark mb-2"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-muted-dark/50 focus:outline-none focus:border-accent-indigo transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-label text-text-muted-dark mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-muted-dark/50 focus:outline-none focus:border-accent-indigo transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 pill-button justify-center"
              >
                Send message
                <Send className="ml-2 w-4 h-4" />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
