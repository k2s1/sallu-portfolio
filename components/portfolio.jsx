'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ----------------------------- Global Styles ----------------------------- */
const GLOBAL_CSS = `
html{overflow-x:hidden;scroll-behavior:smooth;background:#0C0C0C;}
body{background:#0C0C0C;-webkit-font-smoothing:antialiased;}
section[id]{scroll-margin-top:90px;}
.hero-heading{background:linear-gradient(180deg,#646973 0%,#BBCCD7 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
::selection{background:#B600A8;color:#fff;}
`;

/* --------------------------------- Icons --------------------------------- */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const CalendarIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
const GlobeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></svg>
);
const XIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const TelegramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
);
const DiscordIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" /></svg>
);

/* ------------------------------- FadeIn ---------------------------------- */
const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '', style = {} }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: '50px', amount: 0 }}
    transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

/* -------------------------------- Magnet --------------------------------- */
const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = 'transform';
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const expanded = {
        left: rect.left - padding,
        right: rect.right + padding,
        top: rect.top - padding,
        bottom: rect.bottom + padding,
      };
      const inside =
        e.clientX >= expanded.left &&
        e.clientX <= expanded.right &&
        e.clientY >= expanded.top &&
        e.clientY <= expanded.bottom;
      if (inside) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / strength;
        const dy = (e.clientY - cy) / strength;
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      } else {
        el.style.transition = inactiveTransition;
        el.style.transform = 'translate3d(0,0,0)';
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [padding, strength, activeTransition, inactiveTransition]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ----------------------------- AnimatedText ------------------------------ */
const AnimatedText = ({ text, className = '', style = {} }) => {
  const ref = useRef(null);
  const charRefs = useRef([]);
  const chars = text.split('');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  useEffect(() => {
    const apply = (v) => {
      const n = chars.length;
      for (let i = 0; i < n; i++) {
        const start = i / n;
        const end = (i + 1.5) / n;
        let t = (v - start) / (end - start);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const op = 0.2 + 0.8 * t;
        const node = charRefs.current[i];
        if (node) node.style.opacity = op;
      }
    };
    apply(scrollYProgress.get());
    const unsub = scrollYProgress.on('change', apply);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p ref={ref} className={className} style={{ whiteSpace: 'pre-wrap', ...style }}>
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => (charRefs.current[i] = el)}
          style={{ opacity: 0.2 }}
        >
          {ch}
        </span>
      ))}
    </p>
  );
};

/* ------------------------------ Buttons ---------------------------------- */
const ContactButton = ({ className = '' }) => (
  <a
    href="mailto:sallu.x331@gmail.com"
    className={`inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 hover:scale-[1.04] ${className}`}
    style={{
      background:
        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow:
        '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
      outline: '2px solid #ffffff',
      outlineOffset: '-3px',
    }}
  >
    Contact Me
  </a>
);

const PeriodPill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
    {children}
  </span>
);

/* -------------------------------- Data ----------------------------------- */
const PORTRAIT = '/images/portrait-nobg.png';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const ABOUT_DECOR = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  obj: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

const SKILLS = [
  {
    n: '01',
    name: 'Community Management',
    desc: 'Managing and moderating Telegram and Discord communities, keeping discussions active, organized, and welcoming for every member.',
  },
  {
    n: '02',
    name: 'Moderation & Support',
    desc: 'Handling user support, resolving issues, onboarding new members, and enforcing community guidelines across every platform.',
  },
  {
    n: '03',
    name: 'AMA Hosting & Events',
    desc: 'Hosting AMAs and community events that drive engagement, educate members, and build genuine loyalty around a project.',
  },
  {
    n: '04',
    name: 'Content & Translation',
    desc: 'Creating educational, engaging content and translating announcements into multiple languages for a truly global community.',
  },
  {
    n: '05',
    name: 'Ambassador Programs',
    desc: 'Representing Web3 and AI projects as a regional and global ambassador, collecting feedback and growing active communities.',
  },
];

const EXPERIENCE = [
  {
    n: '01',
    category: 'Admin',
    name: 'ALICE AI',
    period: 'Present',
    focus: ['Moderation', 'User Support', 'Engagement'],
    highlightTitle: 'Day-to-day',
    highlightText:
      'Keeping discussions active, welcoming new members and resolving support queries across the community.',
    image:
      'https://image.qwenlm.ai/public_source/a5605fe7-5f56-4f91-8103-e24ae40b36c5/10118562e-45a9-4414-8c1b-c05f03fde8ab.png',
  },
  {
    n: '02',
    category: 'Regional Ambassador & Host',
    name: 'GaiaNet.AI',
    period: '1+ Year',
    focus: ['AMAs', 'Translation', 'Events'],
    highlightTitle: 'Contribution',
    highlightText:
      'Represented the project in regional & global communities and created educational, engaging content.',
    image:
      'https://image.qwenlm.ai/public_source/a5605fe7-5f56-4f91-8103-e24ae40b36c5/18d662465-5d60-442e-a1eb-530ba94ffc35.png',
  },
  {
    n: '03',
    category: 'Regional Ambassador & Host',
    name: 'Morph Network',
    period: '1+ Year',
    focus: ['Onboarding', 'Feedback', 'Content'],
    highlightTitle: 'Contribution',
    highlightText:
      'Moderated channels, collected community feedback and helped lift engagement across platforms.',
    image:
      'https://image.qwenlm.ai/public_source/a5605fe7-5f56-4f91-8103-e24ae40b36c5/1f50cc4b0-cd1e-4586-8c61-7d82868c1e84.png',
  },
];

const CONTACT_LINKS = [
  { icon: MailIcon, label: 'Email', value: 'sallu.x331@gmail.com', href: 'mailto:sallu.x331@gmail.com' },
  { icon: DiscordIcon, label: 'Discord', value: 'salluu1', href: null },
  { icon: XIcon, label: 'Twitter / X', value: 'sallu_high', href: 'https://x.com/sallu_high' },
  { icon: TelegramIcon, label: 'Telegram', value: 'salluu_1', href: 'https://t.me/salluu_1' },
];

const PLATFORMS = ['Telegram', 'Discord', 'Twitter / X', 'Web3 Communities', 'DAOs'];
const LANGUAGES = ['Urdu — Native', 'English — Working Proficiency'];

/* ------------------------------ Hero Section ----------------------------- */
const HeroSection = () => (
  <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          'radial-gradient(60% 50% at 50% 18%, rgba(118,33,176,0.22) 0%, rgba(12,12,12,0) 70%)',
      }}
    />
    <FadeIn delay={0} y={-20} className="relative z-20">
      <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </FadeIn>

    <div className="relative z-0 overflow-hidden px-2 mt-6 sm:mt-4 md:-mt-5">
      <FadeIn delay={0.15} y={40}>
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11.5vw]">
          Hi, i’m sallu
        </h1>
      </FadeIn>
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
      <FadeIn delay={0.6} y={30}>
        <Magnet padding={150} strength={3}>
          <div className="relative w-full aspect-[4/5]">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4"
              style={{
                background:
                  'radial-gradient(50% 60% at 50% 100%, rgba(118,33,176,0.35) 0%, rgba(12,12,12,0) 70%)',
              }}
            />
            <img
              src={PORTRAIT}
              alt="Sallu — Web3 Community Manager"
              className="relative w-full h-full object-contain object-bottom"
            />
          </div>
        </Magnet>
      </FadeIn>
    </div>

    <div className="relative z-20 mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
      <FadeIn delay={0.35} y={20}>
        <p
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          Web3 community manager · moderator · ambassador &amp; content creator
        </p>
      </FadeIn>
      <FadeIn delay={0.5} y={20}>
        <ContactButton />
      </FadeIn>
    </div>
  </section>
);

/* ----------------------------- About Section ----------------------------- */
const AboutSection = () => (
  <section
    id="about"
    className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
  >
    <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
      <img src={ABOUT_DECOR.moon} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
    </FadeIn>
    <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
      <img src={ABOUT_DECOR.lego} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
    </FadeIn>
    <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
      <img src={ABOUT_DECOR.obj} alt="" className="w-[100px] sm:w-[140px] md:w-[180px]" />
    </FadeIn>
    <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
      <img src={ABOUT_DECOR.group} alt="" className="w-[130px] sm:w-[170px] md:w-[220px]" />
    </FadeIn>

    <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text="Dedicated Web3 Community Manager and Moderator with over 1 year of experience working in Web3 and AI communities. Experienced in managing Telegram and Discord communities, supporting users, hosting AMAs, handling community engagement, and creating educational content. Skilled in moderation, announcement translation, feedback collection, and maintaining active and organized online communities."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>
      <FadeIn delay={0.2} y={20}>
        <ContactButton />
      </FadeIn>
    </div>
  </section>
);

/* ---------------------------- Skills Section ----------------------------- */
const SkillsSection = () => (
  <section
    id="skills"
    className="relative z-10 bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
  >
    <FadeIn y={40}>
      <h2
        className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </h2>
    </FadeIn>
    <div className="max-w-5xl mx-auto">
      {SKILLS.map((s, i) => (
        <FadeIn key={s.n} delay={i * 0.1} y={30}>
          <div
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 sm:py-10 md:py-12"
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12,12,12,0.15)' }}
          >
            <span
              className="font-black leading-none text-[#0C0C0C] shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {s.n}
            </span>
            <div className="flex flex-col gap-3">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {s.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

/* -------------------------- Experience Card ------------------------------ */
const ExperienceCard = ({ index, total, data }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        style={{ scale, top: `${96 + index * 24}px` }}
        className="sticky rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div className="flex items-start gap-4 md:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {data.n}
            </span>
            <div className="pt-2 md:pt-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D7E2EA]/50 mb-2">
                {data.category}
              </p>
              <h3
                className="font-semibold uppercase leading-none text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}
              >
                {data.name}
              </h3>
            </div>
          </div>
          <PeriodPill>{data.period}</PeriodPill>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            <div className="rounded-[28px] sm:rounded-[34px] border border-[#D7E2EA]/15 bg-white/[0.02] p-5 sm:p-6 flex flex-col justify-between min-h-[150px]">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/50">
                Focus
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {data.focus.map((f) => (
                  <span
                    key={f}
                    className="text-[#D7E2EA] text-xs sm:text-sm border border-[#D7E2EA]/25 rounded-full px-3 py-1.5"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] sm:rounded-[34px] border border-[#D7E2EA]/15 bg-white/[0.02] p-5 sm:p-6 flex flex-col justify-between min-h-[150px]">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/50">
                {data.highlightTitle}
              </p>
              <p className="text-[#D7E2EA]/80 font-light leading-relaxed text-sm sm:text-base mt-4">
                {data.highlightText}
              </p>
            </div>
          </div>
          <div className="md:col-span-3">
            <img
              src={data.image}
              alt={`${data.name} visual`}
              loading="lazy"
              className="w-full h-[260px] md:h-full md:min-h-[420px] object-cover rounded-[32px] sm:rounded-[44px] md:rounded-[56px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------------- Experience Section --------------------------- */
const ProjectsSection = () => (
  <section
    id="experience"
    className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
  >
    <FadeIn y={40}>
      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </h2>
    </FadeIn>
    <div className="max-w-6xl mx-auto flex flex-col">
      {EXPERIENCE.map((p, i) => (
        <ExperienceCard key={p.n} index={i} total={EXPERIENCE.length} data={p} />
      ))}
    </div>
  </section>
);

/* ---------------------------- Contact Section ---------------------------- */
const Tag = ({ children }) => (
  <span className="text-[#D7E2EA] text-xs sm:text-sm border border-[#D7E2EA]/25 rounded-full px-4 py-2">
    {children}
  </span>
);

const ContactSection = () => (
  <section id="contact" className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Let’s connect
      </h2>
    </FadeIn>

    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <FadeIn y={30} className="flex flex-col gap-8">
        <p
          className="text-[#D7E2EA] font-light leading-relaxed max-w-md"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
        >
          Looking for a dedicated moderator, ambassador or community manager? I help Web3 &amp; AI
          projects stay active, organized and growing. Let’s build something incredible together.
        </p>
        <div>
          <ContactButton />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          {CONTACT_LINKS.map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <span className="w-11 h-11 rounded-full border border-[#D7E2EA]/25 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#D7E2EA]" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/50">
                    {c.label}
                  </span>
                  <span className="text-[#D7E2EA] text-base sm:text-lg font-medium">{c.value}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#D7E2EA]/60 ml-auto" />
              </>
            );
            const cls =
              'group flex items-center gap-4 rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.02] p-4 transition-colors duration-200 hover:bg-white/[0.05]';
            return c.href ? (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div key={c.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} y={30} className="flex flex-col gap-6">
        <div className="rounded-[28px] sm:rounded-[34px] border border-[#D7E2EA]/15 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <GlobeIcon className="w-5 h-5 text-[#D7E2EA]/70" />
            <h3 className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm">
              Platforms &amp; Tools
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {PLATFORMS.map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] sm:rounded-[34px] border border-[#D7E2EA]/15 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <GlobeIcon className="w-5 h-5 text-[#D7E2EA]/70" />
            <h3 className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm">
              Languages
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {LANGUAGES.map((l) => (
              <Tag key={l}>{l}</Tag>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] sm:rounded-[34px] border border-[#D7E2EA]/15 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <ClockIcon className="w-5 h-5 text-[#D7E2EA]/70" />
            <h3 className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm">
              Availability
            </h3>
          </div>
          <ul className="flex flex-col gap-4 text-[#D7E2EA]">
            <li className="flex items-start gap-3">
              <GlobeIcon className="w-5 h-5 text-[#D7E2EA]/60 mt-0.5 shrink-0" />
              <span className="font-light">Pakistan Standard Time (PST) · UTC+5</span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-[#D7E2EA]/60 mt-0.5 shrink-0" />
              <span className="font-light">Active 6 days per week</span>
            </li>
            <li className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-[#D7E2EA]/60 mt-0.5 shrink-0" />
              <span className="font-light">2:00 PM — 2:00 AM (UTC+5)</span>
            </li>
          </ul>
        </div>
      </FadeIn>
    </div>

    <div className="max-w-6xl mx-auto mt-16 sm:mt-20 pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#D7E2EA]/50 text-xs sm:text-sm uppercase tracking-widest">
      <span>Sallu — Web3 Community Manager</span>
      <span>© 2026 · Pakistan (PST)</span>
    </div>
  </section>
);

/* --------------------------------- App ----------------------------------- */
export default function Portfolio() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div
        className="font-sans"
        style={{
          background: '#0C0C0C',
          color: '#D7E2EA',
          minHeight: '100vh',
        }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}
