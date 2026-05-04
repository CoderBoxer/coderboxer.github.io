"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Caveat, Quicksand } from "next/font/google";
import { Mail, Store, MapPin, LayoutDashboard, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

function CloudSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M405.333,234.667c-11.52,0-22.187,2.133-32.427,5.547C356.267,185.387,298.027,149.333,234.667,149.333 c-73.173,0-134.827,49.92-155.093,117.76C34.773,275.2,0,317.867,0,362.667C0,415.573,43.093,458.667,96,458.667h309.333 C464.213,458.667,512,410.88,512,352C512,287.36,459.52,234.667,405.333,234.667z" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────
   Gentle Snowfall Component (Optimized)
   ─────────────────────────────────────────────────────── */

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  opacity: number;
}

function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let snowflakes: Snowflake[] = [];
    let animId: number;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Mobile optimization
      const isMobile = width < 768;
      const count = isMobile ? 35 : 100;

      snowflakes = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1, // Slightly larger flakes
        vy: Math.random() * 0.5 + 0.2, // Slower, softer falling speed
        vx: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      snowflakes.forEach((flake) => {
        flake.y += flake.vy;
        flake.x += flake.vx;

        if (flake.y > height) flake.y = -5;
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

/* ───────────────────────────────────────────────────────
   Main Page
   ─────────────────────────────────────────────────────── */

/* ───────────────────────────────────────────────────────
   Reusable Components for Easy Editing
   ─────────────────────────────────────────────────────── */

/**
 * ProjectCard: Change 'image' to a path like "/projects/my-logo.png" 
 * to use an image instead of an icon.
 */
function ProjectCard({ title, desc, tech, icon: Icon, image, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      className="group flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6 overflow-hidden group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
        {image ? (
          <Image src={image} alt={title} width={56} height={56} className="object-cover" unoptimized />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow leading-relaxed font-medium">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t: string) => (
          <span key={t} className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-bold tracking-wide">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────
   Sticky Navbar
   ─────────────────────────────────────────────────────── */

function Navbar() {
  // To use an image logo, uncomment the line below and put your logo in /public
  // const logoImage = "/logo.png";
  const logoImage = null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 bg-white/80 border-b border-sky-100 shadow-sm transition-all">
      <Link
        href="#"
        className={`${caveat.className} text-3xl text-sky-900 hover:scale-105 transition-transform flex items-center gap-2`}
      >
        {logoImage ? (
          <Image src={logoImage} alt="Logo" width={40} height={40} unoptimized />
        ) : (
          "Shadman."
        )}
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-sky-900/80">
        <Link href="#" className="hover:text-sky-600 transition-colors">Home</Link>
        <Link href="#projects" className="hover:text-sky-600 transition-colors">Projects</Link>
        <Link href="mailto:contact@example.com" className="hover:text-sky-600 transition-colors">Contact</Link>
      </div>

      {/* Social Shortcut (Desktop) */}
      <div className="hidden md:block">
        <Link
          href="https://github.com/CoderBoxer"
          target="_blank"
          className="px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-bold shadow-md hover:bg-sky-700 transition-all"
        >
          My GitHub
        </Link>
      </div>
    </nav>
  );
}

export default function Home() {
  const { scrollY } = useScroll();

  // Parallax effects for the hero section
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yClouds = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className={`${quicksand.className} bg-white text-slate-800 selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden`}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO SECTION (Beautiful Sky & Mountains)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-sky-300 via-sky-200 to-sky-50 flex flex-col items-center justify-start pt-32 pb-20 overflow-visible">

        <Snowfall />

        {/* Floating Clouds */}
        <motion.div style={{ y: yClouds }} className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            animate={{ x: ["-10vw", "110vw"] }}
            transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
            className="absolute top-[15%] -left-[20%] text-white/80"
          >
            <CloudSVG className="w-48 md:w-64 h-auto" />
          </motion.div>
          <motion.div
            animate={{ x: ["110vw", "-10vw"] }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            className="absolute top-[30%] -right-[20%] text-white/60"
          >
            <CloudSVG className="w-56 md:w-80 h-auto" />
          </motion.div>
          <motion.div
            animate={{ x: ["-20vw", "120vw"] }}
            transition={{ repeat: Infinity, duration: 150, ease: "linear", delay: 10 }}
            className="absolute top-[5%] -left-[30%] text-white/70"
          >
            <CloudSVG className="w-32 md:w-48 h-auto" />
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: yText }}
          className="relative z-20 flex flex-col items-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-sky-100 relative">
              <Image
                src="/me.jpg"
                alt="Shadman Ahmmed"
                fill
                className="object-cover scale-125 blur-[0.6px] contrast-[0.95] brightness-[1.02]"
                unoptimized
              />
            </div>
          </motion.div>

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
            A CSE student weaving code into beautiful, cross-platform experiences for iOS, Android, macOS and Windows.
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
          PROJECTS SECTION (Clean & Organic)
          ═══════════════════════════════════════════ */}
      <section className="relative w-full bg-white py-20 md:py-32 px-6 z-20">
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
              tech={["Flutter", "PostgreSQL", "Isar"]}
              icon={Store}
            // To add a logo: image="/projects/happy-burger.png"
            />
            <ProjectCard
              title="Nearo"
              desc="A location-based commuter alarm tracking GPS routes. Designed to ensure you never miss your stop with precise geo-fencing."
              tech={["Flutter", "Dart", "Google Maps"]}
              icon={MapPin}
              delay={0.1}
            // To add a logo: image="/projects/nearo.png"
            />
            <ProjectCard
              title="Mess Management System"
              desc="Web-based dashboard for managing meals, expenses, and member balances efficiently for shared accommodations."
              tech={["PHP", "MySQL", "Tailwind"]}
              icon={LayoutDashboard}
              delay={0.2}
            // To add a logo: image="/projects/mess.png"
            />
            <ProjectCard
              title="Shia Essentials"
              desc="Utility application featuring prayer timings and specialized calendars for the community."
              tech={["Flutter", "Dart"]}
              icon={Compass}
              delay={0.3}
            // To add a logo: image="/projects/shia.png"
            />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="w-full bg-slate-50 py-12 border-t border-slate-100 text-center relative z-20">
        <p className="text-slate-500 font-medium">
          © {new Date().getFullYear()} Shadman Ahmmed. Crafted with care and code.
        </p>
      </footer>

    </div>
  );
}
