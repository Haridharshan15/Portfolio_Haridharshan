import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Cpu, 
  FileText, 
  Award, 
  BookOpen,
  Send,
  ChevronRight,
  Menu,
  X,
  Terminal,
  Brain,
  Moon,
  Sun,
  MapPin,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const SectionHeading = ({ title, accent }: { title: string, accent: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12 text-left"
  >
    <div className="relative inline-block">
      <h2 className="text-4xl md:text-5xl font-bold mb-2">
        {title} <span className="text-accent">{accent}</span>
      </h2>
      <div className="h-1.5 w-20 bg-primary rounded-full" />
    </div>
  </motion.div>
);

const CursorParticles = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particles = React.useRef<any[]>([]);
  const mouse = React.useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 1,
        color: Math.random() > 0.5 ? '#3b82f6' : '#10b981', // primary or accent
        waveOffset: Math.random() * Math.PI * 2
      };
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.current.active) {
        for (let i = 0; i < 2; i++) {
          particles.current.push(createParticle(mouse.current.x, mouse.current.y));
        }
      }

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.life -= 0.01;
        
        // Waving motion
        p.x += p.speedX + Math.sin(time * 0.005 + p.waveOffset) * 0.5;
        p.y += p.speedY + Math.cos(time * 0.005 + p.waveOffset) * 0.5;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
    />
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold flex items-center gap-2 text-primary">
          <Brain className="w-8 h-8" />
          <span>HB</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors ml-4"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden flex flex-col p-6 gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-text-muted hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-12 px-6 relative overflow-hidden text-center">
      <CursorParticles />
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 select-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 select-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 select-none">
            Available for Opportunities
          </span>
          <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6">
            Hi, I'm <span className="text-gradient">Haridharshan B</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-text-muted font-medium mb-8">
            AI & Data Science Developer
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mb-10 leading-relaxed">
            I build intelligent systems using machine learning, computer vision, and modern web technologies to solve real-world problems.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href="#" 
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              <FileText className="w-5 h-5" />
              Resume
            </a>
            <div className="flex gap-3">
              {[
                { icon: <Github />, href: "https://github.com/", label: "GitHub" },
                { icon: <Linkedin />, href: "https://linkedin.com/", label: "LinkedIn" },
                { icon: <Code2 />, href: "https://www.hackerrank.com/", label: "HackerRank" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass hover:bg-white/10 rounded-xl text-text-main transition-all hover:scale-110"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-200 dark:border-white/10 shadow-2xl mx-auto ring-8 ring-primary/5">
            <img 
              src="https://picsum.photos/seed/profile/600/600" 
              alt="Haridharshan B" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Decorative elements for circular shape */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full blur-xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About" accent="Me" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass p-8 md:p-12 rounded-[2rem] shadow-xl">
            <div className="flex flex-wrap gap-6 mb-10 text-text-muted text-sm font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>AI & Data Science Graduate</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Open to Opportunities</span>
              </div>
            </div>

            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-text-main/90">
                I'm an AI and Data Science graduate passionate about building intelligent systems that solve real-world problems. 
                With a strong foundation in <span className="text-primary font-semibold">Python</span>, <span className="text-primary font-semibold">Machine Learning</span>, and modern web technologies, I specialize in creating solutions that bridge the gap between data and actionable insights.
              </p>
              
              <p className="text-text-main/90">
                My interests lie in <span className="text-accent font-semibold">Natural Language Processing</span> and <span className="text-accent font-semibold">Computer Vision</span>, where I enjoy exploring how AI can interpret and understand the world around us. I'm equally passionate about integrating AI capabilities into web applications to deliver seamless, intelligent user experiences.
              </p>

              <p className="text-text-muted">
                Currently seeking entry-level opportunities or internships where I can contribute to innovative, technology-driven solutions and continue growing as a developer.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Programming Languages",
      icon: <Code2 />,
      skills: ["Python", "C", "C++"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Web Technologies",
      icon: <Layout />,
      skills: ["HTML", "CSS", "JavaScript", "Node.js"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Databases",
      icon: <Database />,
      skills: ["MySQL", "MongoDB"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Tools & Technologies",
      icon: <Cpu />,
      skills: ["Machine Learning", "Power BI", "Git", "VS Code", "JupyterLab"],
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
            >
              Expertise & Stack
            </motion.span>
            <SectionHeading title="Technical" accent="Proficiency" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-muted max-w-md text-lg leading-relaxed"
          >
            A comprehensive overview of my technical toolkit, ranging from core programming to advanced AI and web technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2.5rem] blur-xl -z-10" />
              
              <div className="glass h-full p-8 rounded-[2.5rem] overflow-hidden group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-500 flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/10`}>
                  <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[calc(1rem-2px)] flex items-center justify-center text-slate-800 dark:text-white">
                    {React.cloneElement(cat.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-6 text-text-main group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-4 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 text-text-main border border-black/10 dark:border-white/10 group-hover:border-primary/30 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Vision-Based Age and Gender Detection",
      desc: "Computer vision system using YOLO and CNN to detect people in images and classify age and gender for surveillance and analytics.",
      tech: ["Python", "YOLO", "CNN", "OpenCV"],
      link: "#"
    },
    {
      title: "Automated Third Umpire Technology",
      desc: "Smart cricket decision system using IoT sensors and machine learning to assist umpires with accurate decisions.",
      tech: ["IoT", "Python", "Machine Learning", "Sensors"],
      link: "#"
    },
    {
      title: "PlantCare AI",
      desc: "AI-based plant disease detection system using transfer learning to identify plant diseases from leaf images and generate reports.",
      tech: ["Transfer Learning", "Keras", "TensorFlow", "React"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured" accent="Projects" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[2rem] overflow-hidden group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-500"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/project-${i}/600/400`} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-text-main">{project.title}</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest font-bold text-primary/80">
                      {t}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center gap-2 text-sm font-bold text-text-main hover:text-primary transition-colors"
                >
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { title: "Programming Fundamentals Using Python", issuer: "Infosys" },
    { title: "Python Certification", issuer: "GUVI" },
    { title: "Cyber Security and Penetration Testing", issuer: "Value Added Course" }
  ];

  const training = [
    { title: "IoT with Raspberry Pi", location: "NSIC Chennai" },
    { title: "Mobile Application Development", location: "NSIC Chennai" }
  ];

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Certifications &" accent="Training" />
        <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Award className="text-primary" /> Certifications
          </h2>
          <div className="space-y-4">
            {certs.map((cert, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex items-start gap-4 hover:bg-primary/5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-white/5">
                <div className="mt-1"><ChevronRight className="text-primary w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-lg text-text-main">{cert.title}</h3>
                  <p className="text-text-muted text-sm">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <BookOpen className="text-accent" /> Training
          </h2>
          <div className="space-y-4">
            {training.map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex items-start gap-4 hover:bg-accent/5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-white/5">
                <div className="mt-1"><ChevronRight className="text-accent w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-lg text-text-main">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-black/[0.02] dark:bg-white/[0.02] transition-colors">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Get In" accent="Touch" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <p className="text-text-muted text-xl leading-relaxed max-w-lg">
              I'm open to internship opportunities, collaborations, and conversations about AI and tech. Feel free to reach out!
            </p>

            <div className="space-y-6">
              {[
                { 
                  icon: <Mail className="w-5 h-5" />, 
                  value: "haridharshan1583@gmail.com",
                  href: "mailto:haridharshan1583@gmail.com"
                },
                { 
                  icon: <Github className="w-5 h-5" />, 
                  value: "github.com/haridharshan",
                  href: "https://github.com/haridharshan"
                },
                { 
                  icon: <Linkedin className="w-5 h-5" />, 
                  value: "linkedin.com/in/haridharshan",
                  href: "https://linkedin.com/in/haridharshan"
                },
                { 
                  icon: <Code2 className="w-5 h-5" />, 
                  value: "hackerrank.com/haridharshan",
                  href: "https://hackerrank.com/haridharshan"
                }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-text-main font-medium group-hover:text-primary transition-colors">
                    {item.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <input 
                  type="text" 
                  className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all text-text-main placeholder:text-text-muted"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="email" 
                  className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all text-text-main placeholder:text-text-muted"
                  placeholder="Your Email"
                />
              </div>
              <div className="space-y-2">
                <textarea 
                  rows={5}
                  className="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all resize-none text-text-main placeholder:text-text-muted"
                  placeholder="Your Message"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Haridharshan B. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-text-muted hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-text-muted hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="text-text-muted hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="relative cursor-default">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
