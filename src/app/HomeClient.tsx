"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Caveat, Quicksand } from "next/font/google";
import { Mail, Store, MapPin, LayoutDashboard, Compass, Smartphone, Cpu, Code, Monitor, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type PostMetadata } from "@/lib/mdx";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ───────────────────────────────────────────────────────
   Inline SVGs & Icons
   ─────────────────────────────────────────────────────── */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────
   Components
   ─────────────────────────────────────────────────────── */

function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: any[] = [];
    // Reduce density for better performance
    const particleCount = width < 768 ? 40 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        wind: Math.random() * 0.5 - 0.25,
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx!.beginPath();
      for (const p of particles) {
        ctx!.moveTo(p.x, p.y);
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        p.y += p.speed;
        p.x += p.wind;
        if (p.y > height) p.y = -10;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
      }
      ctx!.fill();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

function ProjectCard({ title, desc, tags, link, image }: { title: string; desc: string; tags: string[]; link: string; image?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white/40 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] shadow-xl shadow-sky-100 group transition-all duration-500"
    >
      <div className="mb-6 relative h-48 w-full rounded-2xl overflow-hidden bg-sky-50 flex items-center justify-center">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
        ) : (
          <LayoutDashboard className="w-12 h-12 text-sky-200 group-hover:text-sky-300 transition-colors" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">{desc}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <span key={tag} className="px-4 py-1.5 bg-white/60 text-sky-700 text-xs font-bold rounded-full border border-sky-100 uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      <Link href={link} target="_blank" className="inline-flex items-center gap-2 text-sky-600 font-bold group/link">
        Explore Project <span className="group-hover/link:translate-x-1 transition-transform">→</span>
      </Link>
    </motion.div>
  );
}

function Navbar() {
  const logoImage = null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 bg-white/80 border-b border-sky-100 shadow-sm transition-all">
      <Link href="/" className={`${caveat.className} text-3xl font-bold text-slate-800`}>
        {logoImage ? (
          <Image src={logoImage} alt="Logo" width={40} height={40} className="object-contain" unoptimized />
        ) : (
          "Shadman."
        )}
      </Link>

      <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600 uppercase tracking-widest">
        <Link href="#about" className="hover:text-sky-500 transition-colors">About</Link>
        <Link href="#skills" className="hover:text-sky-500 transition-colors">Skills</Link>
        <Link href="#projects" className="hover:text-sky-500 transition-colors">Projects</Link>
        <Link href="/blog" className="hover:text-sky-500 transition-colors">Blog</Link>
      </div>

      <Link href="mailto:boxercoder@gmail.com" className="bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all">
        Get in Touch
      </Link>
    </nav>
  );
}

export default function HomeClient({ latestPosts }: { latestPosts: PostMetadata[] }) {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const yText = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className={`${quicksand.className} bg-white text-slate-800 selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden`}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO SECTION (Beautiful Sky & Mountains)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-sky-300 via-sky-200 to-sky-50 flex flex-col items-center justify-start pt-32 pb-20 overflow-visible">

        <Snowfall />

        {/* Floating Clouds (Parallax) */}
        <motion.div style={{ y: y1 }} className="absolute top-20 left-10 opacity-30 z-0">
          <svg width="200" height="100" viewBox="0 0 200 100" fill="white">
            <path d="M50,80 Q70,50 100,80 T150,80" stroke="white" strokeWidth="20" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div style={{ y: yText }} className="absolute top-40 right-20 opacity-20 z-0">
          <svg width="250" height="120" viewBox="0 0 250 120" fill="white">
            <path d="M60,90 Q90,50 130,90 T200,90" stroke="white" strokeWidth="25" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: yText }}
          className="relative z-20 flex flex-col items-center text-center px-6"
        >

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-bold text-sky-800 tracking-[0.2em] uppercase mb-4"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className={`${caveat.className} text-7xl md:text-8xl lg:text-9xl text-slate-800 mb-6 drop-shadow-sm`}
          >
            Shadman Ahmmed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-slate-700 font-medium max-w-2xl mb-10 leading-relaxed"
          >
            A CSE student weaving code into beautiful, cross-platform experiences for web, iOS, Android, macOS, Linux and Windows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-5"
          >
            {[
              { href: "https://github.com/CoderBoxer", label: "GitHub", icon: GithubIcon },
              { href: "https://www.linkedin.com/in/shadman-a-67a361b8/", label: "LinkedIn", icon: LinkedinIcon },
              { href: "mailto:boxercoder@gmail.com", label: "Email", icon: Mail },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white text-sky-600 shadow-md hover:shadow-xl hover:scale-110 hover:bg-sky-500 hover:text-white transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Soft Organic Mountains (Transitions to White) */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[150px] md:h-[250px] lg:h-[300px] block">
            {/* Back Mountain Layer */}
            <path fill="#bae6fd" opacity="0.6" d="M0,192L60,181.3C120,171,240,149,360,149.3C480,149,600,171,720,165.3C840,160,960,128,1080,128C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            {/* Middle Mountain Layer */}
            <path fill="#e0f2fe" opacity="0.8" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,240C840,245,960,203,1080,186.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            {/* Front Pure White Layer (Matches the section below) */}
            <path fill="#ffffff" d="M0,288L60,272C120,256,240,224,360,229.3C480,235,600,277,720,277.3C840,277,960,235,1080,218.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
          ═══════════════════════════════════════════ */}
      <section id="about" className="relative w-full bg-white pt-20 md:pt-32 pb-10 px-6 z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-xl md:text-2xl font-medium text-slate-600 mb-4">Hello, buddy...</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-slate-800 leading-tight mb-8">
              This is <span className="text-sky-600 font-bold tracking-tight">&lt;Shadman /&gt;</span> I build things for the web and mobile.
            </h2>
            <div className="text-lg md:text-xl text-slate-600 space-y-6 leading-relaxed">
              <p>
                Currently, I am a <span className="text-slate-900 font-bold">CSE Student & Cross-Platform App Developer</span>. I am helping brands and businesses to build and deliver <span className="text-slate-900 font-bold">performant, maintainable and UX friendly</span> web and mobile app projects.
              </p>
              <p>
                I weave code into beautiful, cross-platform experiences for <span className="text-sky-600 font-bold">web, iOS, Android, macOS, Linux and Windows</span>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[400px] relative"
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-sky-200 border-8 border-white bg-sky-50">
              <Image
                src="/me.jpg"
                alt="Shadman Ahmmed"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS SECTION
          ═══════════════════════════════════════════ */}
      <section id="skills" className="relative w-full bg-slate-50/50 py-20 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-12"
          >
            I'm skilled at
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Flutter", icon: Smartphone },
              { name: "Dart", icon: Code },
              { name: "Next.js", icon: LayoutDashboard },
              { name: "React", icon: Compass },
              { name: "PostgreSQL", icon: Store },
              { name: "MySQL & PHP", icon: LayoutDashboard },
              { name: "Tailwind CSS", icon: Palette },
              { name: "AI Development", icon: Cpu },
              { name: "macOS / Xcode", icon: Monitor },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center text-sky-500">
                  <skill.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 tracking-tight">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION (Clean & Organic)
          ═══════════════════════════════════════════ */}
      <section id="projects" className="relative w-full bg-white py-20 md:py-32 px-6 z-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">

          <div className="text-center flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${caveat.className} text-5xl md:text-6xl text-slate-800 mb-4`}
            >
              Things I've Built
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-sky-300 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="Happy Burger"
              desc="A robust Point-of-Sale (POS) system built for retail. Features high-end UI, offline-first syncing, and complex cart management."
              tags={["Flutter", "PostgreSQL", "Isar"]}
              link="https://github.com/CoderBoxer"
            />
            <ProjectCard
              title="Nearo"
              desc="A location-based commuter alarm tracking GPS routes. Designed to ensure you never miss your stop with precise geo-fencing."
              tags={["Flutter", "Dart", "Google Maps"]}
              link="https://github.com/CoderBoxer"
            />
            <ProjectCard
              title="PetShop"
              desc="A comprehensive management system for pet stores. Built with Python and Flask, it handles inventory tracking, customer orders, and animal welfare records."
              tags={["Python", "Flask", "MySQL", "Bootstrap"]}
              link="https://github.com/CoderBoxer"
            />
            <ProjectCard
              title="Shia Essentials"
              desc="Utility application featuring prayer timings and specialized calendars for the community."
              tags={["Flutter", "Dart"]}
              link="https://github.com/CoderBoxer"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BLOG SECTION
          ═══════════════════════════════════════════ */}
      <section id="blog" className="relative w-full bg-white py-20 md:py-32 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
              >
                Latest from the Blog
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 max-w-xl"
              >
                Sharing my thoughts on software engineering, cross-platform development, and the future of AI.
              </motion.p>
            </div>
            <Link
              href="/blog"
              className="text-sky-600 font-bold hover:text-sky-700 transition-colors flex items-center gap-2 group"
            >
              View All Posts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all duration-300 h-full"
                >
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold mb-4">
                    {post.date}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 font-medium mt-auto">
                    <span className="text-sky-600 font-bold group-hover:translate-x-2 transition-transform">Read Post →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="w-full bg-slate-50 py-12 border-t border-slate-100 text-center relative z-20">
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} Shadman Ahmmed. Crafted with care and code.
        </p>
      </footer>
    </div>
  );
}
