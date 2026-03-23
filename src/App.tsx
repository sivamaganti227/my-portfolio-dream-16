import { useState, useEffect, useRef, ReactNode } from 'react';
import { Mail, Phone, Github, Linkedin, ExternalLink, ChevronUp, Menu, X } from 'lucide-react';

import profileImg from '@/assets/profile.png';
import cert1 from '@/assets/cert-1.png';
import cert2 from '@/assets/cert-2.png';
import cert3 from '@/assets/cert-3.png';
import training1 from '@/assets/training-1.png';
import training2 from '@/assets/training-2.png';
import projectRedbus from '@/assets/project-redbus.png';
import projectFlight from '@/assets/project-flight-delay.png';

/* ── scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-5 blur-[3px]'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── section wrapper ── */
function Section({ id, title, children, className = '' }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 md:py-28 overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-brand-50 tracking-tight">
            {title}
            <span className="block h-1 w-16 mt-3 rounded-full bg-gradient-to-r from-accent to-cyan" />
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ── nav ── */
const NAV = ['About', 'Skills', 'Projects', 'Journey', 'Training', 'Certificates', 'Education', 'Contact'] as const;

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <a href="#hero" className="font-display font-bold text-lg text-accent-light">Siva.</a>
        <ul className="hidden md:flex gap-6 text-sm font-medium text-brand-200">
          {NAV.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} className="hover:text-accent-light transition-colors">{n}</a></li>)}
        </ul>
        <button onClick={() => setOpen(!open)} className="md:hidden text-brand-100" aria-label="Menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && (
        <ul className="md:hidden glass px-5 pb-4 rounded-b-xl mx-2">
          {NAV.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-2 text-brand-200 hover:text-accent-light">{n}</a></li>)}
        </ul>
      )}
    </nav>
  );
}

/* ── hero ── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden orb-gradient">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <Reveal><p className="text-accent-light font-medium mb-2 tracking-wide text-sm uppercase">Hello, I'm</p></Reveal>
          <Reveal delay={80}><h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white mb-4">Maganti Siva<br />Naga Sai Kumar</h1></Reveal>
          <Reveal delay={160}><p className="text-lg text-brand-200 mb-8 max-w-md leading-relaxed">Aspiring Data Scientist & Python Developer passionate about turning data into actionable insights.</p></Reveal>
          <Reveal delay={240}>
            <div className="flex gap-4 flex-wrap">
              <a href="#contact" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-glow active:scale-[0.97] transition-all shadow-lg shadow-accent/20">Get in Touch</a>
              <a href="https://github.com/sivamaganti227" target="_blank" rel="noopener" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium text-brand-100 hover:text-white active:scale-[0.97] transition-all"><Github size={18} /> GitHub</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200} className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl shadow-accent/20 ring-2 ring-accent/30">
            <img src={profileImg} alt="Siva Naga Sai Kumar" className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── about ── */
function About() {
  return (
    <Section id="about" title="About Me">
      <Reveal>
        <div className="glass rounded-2xl p-8 max-w-3xl text-brand-200 leading-relaxed space-y-4 text-lg">
          <p>I'm a B.Tech Computer Science student at Lovely Professional University with a deep interest in Data Science, Python programming, and data analytics. I enjoy building interactive dashboards, performing exploratory data analysis, and solving real-world problems with data.</p>
          <p>With strong foundations in Python, SQL, Power BI, and libraries like Pandas, NumPy, and Matplotlib, I strive to derive meaningful insights from complex datasets.</p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── skills ── */
const SKILLS = [
  { cat: 'Languages', items: ['Python', 'C++', 'DSA'] },
  { cat: 'Libraries', items: ['NumPy', 'Pandas', 'Seaborn', 'Matplotlib'] },
  { cat: 'Big Data / Tools', items: ['MS Excel', 'Power BI', 'SQL'] },
  { cat: 'Soft Skills', items: ['Problem-Solving', 'Adaptability'] },
];

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((s, i) => (
          <Reveal key={s.cat} delay={i * 80}>
            <div className="glass rounded-2xl p-6 hover:border-accent/30 transition-all group">
              <h3 className="font-display font-semibold text-accent-light mb-4">{s.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map(it => <span key={it} className="text-sm glass-light px-3 py-1.5 rounded-full text-brand-100">{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── projects ── */
const PROJECTS = [
  {
    title: 'RedBus Ticket Booking Analyzer',
    desc: 'Built an interactive Excel dashboard to analyze RedBus ticket booking data with pivot tables, charts and slicers.',
    link: 'https://github.com/sivamaganti227/red-bus',
    image: projectRedbus,
  },
  {
    title: 'EDA on Medical Insurance Dataset',
    desc: 'Analyzed Medical Insurance dataset using Python, creating visualizations with Pandas, NumPy, Matplotlib and Seaborn.',
    link: 'https://github.com/sivamaganti227/python',
    image: null,
  },
  {
    title: 'Airport Delay Analysis Dashboard',
    desc: 'Developed an interactive Power BI dashboard to analyze airport and flight delay patterns using real-world datasets.',
    link: 'https://github.com/sivamaganti227/Analysis-of-Flight-Delay-Patterns-Using-Power-BI-Dashboard',
    image: projectFlight,
  },
];

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <div className="group glass rounded-2xl overflow-hidden hover:border-accent/30 transition-all flex flex-col">
              {p.image && (
                <div className="h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-brand-300 text-sm mb-4 flex-1">{p.desc}</p>
                <a href={p.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent hover:underline transition-colors">
                  View on GitHub <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={300}>
        <div className="mt-8 text-center">
          <a href="https://github.com/sivamaganti227?tab=repositories" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-brand-200 hover:text-accent-light font-medium transition-colors">
            <Github size={18} /> View all repositories
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── data science journey ── */
const JOURNEY = [
  { year: '2023', event: 'Started B.Tech in CSE at Lovely Professional University' },
  { year: '2023', event: 'Completed Responsive Web Design certification (FreeCodeCamp)' },
  { year: '2024', event: 'Earned Hardware & OS (Coursera) and English Grammar Pro (Udemy) certifications' },
  { year: '2025', event: 'Cloud Computing certification from NPTEL' },
  { year: '2025', event: 'Python & DSA Internship at Cse Pathshala' },
  { year: '2025', event: 'Built RedBus Analyzer, Medical Insurance EDA, and Airport Delay Dashboard projects' },
];

function Journey() {
  return (
    <Section id="journey" title="Data Science Journey">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-cyan/30 to-transparent -translate-x-1/2" />
        {JOURNEY.map((j, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-brand-900 shadow-lg shadow-accent/30" />
              <div className="ml-10 md:ml-0 md:w-[45%] glass rounded-xl p-5">
                <span className="text-xs font-semibold text-accent-light">{j.year}</span>
                <p className="text-brand-200 mt-1">{j.event}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── training ── */
function Training() {
  return (
    <Section id="training" title="Training">
      <Reveal>
        <div className="glass rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="font-display font-semibold text-white text-xl mb-2">Cse Pathshala — Python & DSA Internship</h3>
          <p className="text-sm text-brand-300 mb-4">Jul 2025 · Technical Trainee</p>
          <ul className="list-disc list-inside text-brand-200 space-y-2 text-sm">
            <li>Completed a one-month technical internship in Python programming.</li>
            <li>Gained hands-on experience in core Python concepts including data types, control structures, functions, file handling, and OOP.</li>
            <li>Collaborated with mentors to complete programming assignments and problem-solving tasks.</li>
            <li>Recognized for professional conduct and active participation.</li>
          </ul>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-6">
        {[training1, training2].map((img, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="glass rounded-2xl overflow-hidden">
              <img src={img} alt={`Training certificate ${i + 1}`} className="w-full h-auto" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── certificates ── */
const CERTS = [
  { name: 'Cloud Computing', org: 'NPTEL', date: "Apr '25" },
  { name: 'Hardware and Operating System', org: 'Coursera', date: "Sep '24" },
  { name: 'English Grammar Pro', org: 'Udemy', date: "Nov '24" },
  { name: 'Responsive Web Design', org: 'FreeCodeCamp', date: "Nov '23" },
];

function Certificates() {
  return (
    <Section id="certificates" title="Certificates">
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {CERTS.map((c, i) => (
          <Reveal key={c.name} delay={i * 70}>
            <div className="glass rounded-xl p-5 hover:border-accent/30 transition-all">
              <h3 className="font-semibold text-white">{c.name}</h3>
              <p className="text-sm text-brand-300">{c.org} · {c.date}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {[cert1, cert2, cert3].map((img, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="glass rounded-2xl overflow-hidden">
              <img src={img} alt={`Certificate ${i + 1}`} className="w-full h-auto" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── education ── */
const EDU = [
  { school: 'Lovely Professional University', loc: 'Phagwara, India', deg: 'B.Tech - CSE; CGPA: 6.19', period: "Aug '23 - present" },
  { school: 'Sasi Junior College', loc: 'Andhra Pradesh, India', deg: 'Intermediate; 95.4%', period: "Aug '21 – May '23" },
  { school: 'Ushodaya High School', loc: 'Andhra Pradesh, India', deg: 'Matriculation; 96%', period: "Apr '20 – Jul '21" },
];

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {EDU.map((e, i) => (
          <Reveal key={e.school} delay={i * 90}>
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="font-display font-semibold text-white">{e.school}</h3>
                  <p className="text-brand-300 text-sm">{e.loc}</p>
                </div>
                <span className="text-sm text-accent-light font-medium whitespace-nowrap">{e.period}</span>
              </div>
              <p className="mt-2 text-brand-200">{e.deg}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── contact ── */
function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <div className="glass rounded-2xl p-8 max-w-lg space-y-6">
          <p className="text-brand-200 text-lg">Feel free to reach out — I'd love to connect!</p>
          <div className="space-y-4">
            <a href="mailto:siva.maganti4321@gmail.com" className="flex items-center gap-3 text-brand-100 hover:text-accent-light transition-colors">
              <Mail size={20} /> siva.maganti4321@gmail.com
            </a>
            <a href="tel:+919701659042" className="flex items-center gap-3 text-brand-100 hover:text-accent-light transition-colors">
              <Phone size={20} /> +91 9701659042
            </a>
            <a href="https://linkedin.com/in/shiva-maganti-25" target="_blank" rel="noopener" className="flex items-center gap-3 text-brand-100 hover:text-accent-light transition-colors">
              <Linkedin size={20} /> linkedin.com/in/shiva-maganti-25
            </a>
            <a href="https://github.com/sivamaganti227" target="_blank" rel="noopener" className="flex items-center gap-3 text-brand-100 hover:text-accent-light transition-colors">
              <Github size={20} /> github.com/sivamaganti227
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── back to top ── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 glass text-accent-light p-3 rounded-full hover:text-white active:scale-95 transition-all z-40" aria-label="Back to top">
      <ChevronUp size={20} />
    </button>
  );
}

/* ── app ── */
export default function App() {
  return (
    <div className="bg-brand-900 min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Training />
      <Certificates />
      <Education />
      <Contact />
      <BackToTop />
      <footer className="glass-nav text-brand-300 text-center py-6 text-sm">
        © 2025 Maganti Siva Naga Sai Kumar. All rights reserved.
      </footer>
    </div>
  );
}
