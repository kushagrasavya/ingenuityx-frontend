import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Search, Lock, CheckCircle2, ChevronRight, Clock, Award, Upload, Scale, FileText, TrendingUp, MessageCircle, Mic, Terminal } from 'lucide-react';

// --- MEDIA IMPORTS ---
import billboardImage from '../imports/Gemini_Generated_Image_1l2vfz1l2vfz1l2v.png';
import logoImage from '../imports/ingenuityx-logo.svg';

// --- LOCAL LOGOS ---
import nuvocoLogo from '../imports/logo_nuvoco.jpg';
import srmbLogo from '../imports/srmb.jpg';
import ingenxLogo from '../imports/ingenx.png';
import trootechLogo from '../imports/trootech.png';

// --- POSTER IMAGES ---
import legrandBg from '../imports/legrand.png';
import nuvocoGreenBg from '../imports/nuvoco (1).png';
import srmbShiftBg from '../imports/nuvoco.png';
import srmbGreenProBg from '../imports/srmb (1).png';
import srmbIroncladBg from '../imports/srmb.png';
import trootechPosterBg from '../imports/Trootech (2).png';
import ingenxPosterBg from '../imports/IngenX (2).png';
import evereadyBg from '../imports/eveready.png';

// --- HERO VIDEOS ---
import travel from '../imports/travel.mp4';
import intervie from '../imports/intervie.mp4';
import preparation2 from '../imports/preparation2.mp4';
import pizza from '../imports/pizza.mp4';
import prep from '../imports/prep.mp4';
import chaos from '../imports/chaos.mp4';
import celebration4 from '../imports/celebration4.mp4';
import celebration3 from '../imports/celebration3.mp4';

import img6 from '../imports/img6.jpg';
import img7 from '../imports/img7.png';

// =====================================================================
// ENVIRONMENT & CONSTANTS
// =====================================================================
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
const PLACEHOLDER_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
const GLOBAL_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop"; 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATEGORY_COLORS = {
  Marketing: '#E92A39',
  Tech: '#2E73E6',
  Design: '#A855F7',
  Sustainability: '#10B981',
  Innovation: '#F59E0B',
};

const CATEGORY_DATA = {
  Marketing: { img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop', desc: 'Brand strategy, GTM, research, and positioning.' },
  Tech: { img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', desc: 'Hackathons, coding challenges, AI, and systems.' },
  Design: { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop', desc: 'UI/UX, product design, branding, and aesthetics.' },
  Sustainability: { img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop', desc: 'Green tech, decarbonisation, and eco-innovation.' },
  Innovation: { img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop', desc: 'Open-ended problem solving and lateral thinking.' }
};

// --- REWARD IMAGES (For Section 4 Cards) ---
const REWARD_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", 
  img6, 
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"  
];

// --- SCROLL REVEAL ---
function ScrollReveal({ children, direction = "up", delay = 0, width = "100%", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  let dirClass = "";
  if (!isVisible) {
    if (direction === "up") dirClass = "translate-y-8 md:translate-y-12 opacity-0";
    if (direction === "down") dirClass = "-translate-y-8 md:-translate-y-12 opacity-0";
    if (direction === "left") dirClass = "-translate-x-8 md:-translate-x-12 opacity-0";
    if (direction === "right") dirClass = "translate-x-8 md:translate-x-12 opacity-0";
    if (direction === "scale") dirClass = "scale-95 opacity-0";
  } else {
    dirClass = "translate-y-0 translate-x-0 scale-100 opacity-100";
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${dirClass} ${className}`} style={{ transitionDelay: `${delay}ms`, width }}>
      {children}
    </div>
  );
}

// --- FAQ ACCORDION ITEM ---
function FaqItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-[#2A2A2E] last:border-0">
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 md:py-6 text-left group">
        <span className="text-base md:text-xl font-bold text-[#FAFAFA] pr-4 md:pr-6 group-hover:text-[#E92A39] transition-colors">{q}</span>
        <span className={`text-[#E92A39] text-xl md:text-2xl transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : '+'}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[500px] pb-5 md:pb-6' : 'max-h-0'}`}>
        <p className="text-[#A1A1AA] text-sm md:text-base font-semibold leading-relaxed pr-6 md:pr-10">{a}</p>
      </div>
    </div>
  );
}

// --- PINNED CARD (proof wall artifact wrapper) ---
function PinnedCard({ rotate = 0, className = '', children }) {
  return (
    <div
      className={`bg-[#161616] border border-[#2A2A2E] rounded-xl shadow-xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [isLoadingOpps, setIsLoadingOpps] = useState(true);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [openFaq, setOpenFaq] = useState(-1);
  const [heroVideoIndex, setHeroVideoIndex] = useState(0);

  const teaserScrollRef = useRef(null);

  // Seeded mock rank for the queue mechanic
  const waitlistRank = 2843;

  const heroVideos = [
    travel, intervie, preparation2, pizza, prep, chaos, celebration4, celebration3
  ].filter(Boolean); 
  
  const heroRedHooks = [
    "sabse bade problems.", "real, unfiltered briefs.", "whiteboard war rooms.", 
    "late-night build sessions.", "mentorship moments.", "campus showdowns.", 
    "massive prize pools.", "your 'I made it' era." 
  ];

  const scrollTrack = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Performant Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (heroVideos.length <= 1) return; 
    const videoInterval = setInterval(() => {
      setHeroVideoIndex((prevIndex) => (prevIndex + 1) % heroVideos.length);
    }, 4000);
    return () => clearInterval(videoInterval);
  }, [heroVideos.length]);

  useEffect(() => {
    const targetDate = new Date('2026-08-31T00:00:00Z').getTime();
    const tick = () => {
      const distance = targetDate - Date.now();
      if (distance < 0) { setCountdown({ days: 0, hours: 0, minutes: 0 }); return; }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };
    tick();
    const interval = setInterval(tick, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const oppsResponse = await axios.get(`${API_URL}/api/challenges`).catch(() => ({ data: { data: [] } }));
        const fetchedOpps = oppsResponse.data.data.map(item => {
          const attr = item.attributes || item;
          let plainTextDescription = attr.description;
          if (Array.isArray(attr.description)) {
            plainTextDescription = attr.description.map(block => block.children ? block.children.map(child => child.text).join('') : '').join('\n');
          }
          let finalLogoUrl = attr.logoUrl;
          if (!finalLogoUrl) {
            const compNameLower = (attr.company || '').toLowerCase();
            if (compNameLower.includes('nuvoco')) finalLogoUrl = nuvocoLogo;
            else if (compNameLower.includes('srmb')) finalLogoUrl = srmbLogo;
            else if (compNameLower.includes('ingenx') || compNameLower.includes('ingenuityx')) finalLogoUrl = ingenxLogo;
            else if (compNameLower.includes('trootech')) finalLogoUrl = trootechLogo;
          }
          return {
            id: item.documentId || item.id,
            title: attr.title,
            company: attr.company,
            logoUrl: finalLogoUrl,
            type: attr.type || 'Competition',
            category: attr.category || 'Marketing',
            duration: attr.duration,
            points: attr.points,
            description: plainTextDescription,
            deadline: attr.deadline,
          };
        });

        const DEMO_CHALLENGES = [
          { id: "demo-eveready-1", title: "Keep It Lit", company: "Eveready", logoUrl: null, bgImage: evereadyBg, type: "Innovation Project", category: "Innovation", duration: "4 Weeks", points: "Internship + Rs 50k", description: "Reinvent portable lighting for rural and everyday India. Design a robust, affordable, and sustainable portable lighting solution.", deadline: "Oct 30, 2026", isDemo: true },
          { id: "demo-trootech-1", title: "TrooTech 2030", company: "TrooTech", logoUrl: trootechLogo, bgImage: trootechPosterBg, type: "Innovation Challenge", category: "Innovation", duration: "5 Weeks", points: "Certification", description: "Reposition a 350+ person AI company's brand story. Innovate, collaborate, and change the game in this challenge.", deadline: "Oct 28, 2026", isDemo: true },
          { id: "demo-legrand-1", title: "Power Protocol", company: "Legrand", logoUrl: null, bgImage: legrandBg, type: "Tech Hackathon", category: "Tech", duration: "3 Weeks", points: "Rs 1L + Tech Setup", description: "Design intelligent power distribution for AI data centers. Develop energy-efficient systems capable of sustaining high-density loads.", deadline: "Oct 20, 2026", isDemo: true },
          { id: "demo-nuvoco-1", title: "Grey 2 Green", company: "Nuvoco", logoUrl: nuvocoLogo, bgImage: nuvocoGreenBg, type: "Sustainability Project", category: "Sustainability", duration: "4 Weeks", points: "PPI + Rs 50k", description: "Cut the carbon footprint of cement manufacturing. Develop innovative strategies to drastically reduce emissions across supply chains.", deadline: "Oct 18, 2026", isDemo: true },
          { id: "demo-srmb-1", title: "Solid Shift Challenge", company: "SRMB", logoUrl: srmbLogo, bgImage: srmbShiftBg, type: "Innovation Challenge", category: "Design", duration: "5 Weeks", points: "Rs 75k Pool", description: "Reimagine advanced building materials. Pitch a revolutionary approach to materials that adapt to environmental stress.", deadline: "Oct 25, 2026", isDemo: true },
          { id: "demo-srmb-3", title: "Ironclad Challenge", company: "SRMB", logoUrl: srmbLogo, bgImage: srmbIroncladBg, type: "Marketing Campaign", category: "Marketing", duration: "4 Weeks", points: "Internship + Rs 40k", description: "Position SRMB among Gen-Z homeowners. Design a robust go-to-market strategy to solidify their leadership.", deadline: "Oct 22, 2026", isDemo: true }
        ];

        setOpportunities([...DEMO_CHALLENGES, ...fetchedOpps]);
      } catch (error) {
        console.error("Error fetching platform data:", error);
      } finally {
        setIsLoadingOpps(false);
      }
    };
    fetchPlatformData();
  }, []);

  const handleWaitlistJoin = async () => {
    const trimmedEmail = waitlistEmail.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setWaitlistStatus('error');
      return;
    }
    setWaitlistStatus('submitting');
    try {
      await axios.post(`${API_URL}/api/waitlists`, { data: { email: trimmedEmail } }).catch(()=>{});
      setWaitlistStatus('success');
    } catch (err) {
      setWaitlistStatus('success'); 
    }
  };

  const faqs = [
    { q: "Is this actually legit, or just dummy projects?", a: "Every brief on InGenuityX comes directly from a verified corporate partner looking to solve a real business problem. If you win, the brand actually implements (or tests) your solution." },
    { q: "Do I need to be from a top college to apply?", a: "No. Brands evaluate your submission, not your college name. We hide academic pedigree during the initial shortlist phase to ensure ideas win on merit." },
    { q: "Do I need a team?", a: "It depends on the brief. Some are solo, but most allow cross-campus teams (up to 4 members). You can build a team with friends from entirely different colleges." },
    { q: "Is there an entry fee?", a: "Never. InGenuityX is completely free for students. Brands pay to host challenges, you participate for free." },
    { q: "What happens if I submit but don't win?", a: "You get 'The Rejection Letter'—a scorecard breaking down exactly how judges rated your Insight, Strategy, and Execution so you can actually improve." }
  ];

  const filters = ['All', 'Marketing', 'Tech', 'Design', 'Sustainability', 'Innovation'];
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesFilter = activeFilter === 'All' || opp.category === activeFilter;
    const matchesSearch = searchQuery === '' || opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) || opp.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueRewards = Array.from(new Set(opportunities.map(o => o.points).filter(Boolean))).slice(0, 4);

  // Pre-launch: no real "squads mid-brief" number exists yet. Wire this to
  // a real live count once the vault opens Aug 31 — until then it renders
  // as "—" so we're not faking a stat.
  const liveSquadCount = 0;

  return (
    <div className="grain min-h-screen bg-transparent text-[#FAFAFA] font-sans overflow-x-hidden relative selection:bg-[#E92A39] selection:text-white">
      
      {/* GLOBAL BACKGROUND IMAGE WITH BLUR OVERLAY */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <img src={GLOBAL_BG} alt="" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/80 via-[#151515]/95 to-[#151515] backdrop-blur-[60px]"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Kalam:wght@400;700&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .grain::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 100; mix-blend-mode: overlay;
        }
        @keyframes textFadeUp { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-text-fade-up { animation: textFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInOpacity { 0% { opacity: 0; transform: scale(1.05); } 100% { opacity: 0.8; transform: scale(1); } }
        .animate-video-fade { animation: fadeInOpacity 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      {/* COUNTDOWN BANNER */}
      <div className="fixed top-0 w-full h-10 bg-[#0A0A0A]/80 backdrop-blur-md text-[#FAFAFA] px-4 md:px-6 text-center text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 z-[60] border-b border-[#2A2A2E]">
        <span className="text-[#E92A39] animate-pulse">LIVE</span>
        <span className="hidden sm:inline">Launching in</span> {countdown.days}d {countdown.hours}h {countdown.minutes}m --
        <button onClick={scrollToWaitlist} className="underline hover:text-[#E92A39] transition-colors">Join</button>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-10 w-full z-50 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2E] shadow-sm' : 'bg-gradient-to-b from-black/80 to-transparent pt-6 md:pt-4'}`}>
        <div className="w-auto md:w-48 flex justify-start">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img src={logoImage} alt="InGenuityX" className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-6 md:h-8' : 'h-8 md:h-10'}`} />
          </Link>
        </div>
        <div className={`hidden md:flex items-center justify-center gap-10 text-sm font-bold tracking-wide transition-colors duration-300 flex-1 ${isScrolled ? 'text-[#A1A1AA]' : 'text-white/90'}`}>
          <a href="#opportunities" className="hover:text-[#FAFAFA] transition-colors">Opportunities</a>
          <Link to="/for-brands" className="hover:text-[#FAFAFA] transition-colors">For Brands</Link>
          <Link to="/about" className="hover:text-[#FAFAFA] transition-colors">About Us</Link>
        </div>
        <div className="w-auto md:w-48 flex justify-end">
          <button onClick={scrollToWaitlist} className="bg-[#E92A39] hover:bg-[#ff3b4b] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm shadow-sm transition-colors">
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION & QUEUE MECHANIC */}
      <section className="relative w-full min-h-[100dvh] flex items-start justify-center overflow-hidden bg-transparent pb-24 lg:pb-32 pt-[22vh] md:pt-[28vh]">
        <div className="absolute inset-0 bg-transparent">
          {heroVideos && heroVideos.length > 0 ? (
            <video key={heroVideoIndex} src={heroVideos[heroVideoIndex]} poster={billboardImage} autoPlay muted playsInline loop className="w-full h-full object-cover opacity-0 animate-video-fade" />
          ) : (
            <ImageWithFallback src={billboardImage} alt="InGenuityX" className="w-full h-full object-cover opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/90 via-[#151515]/50 to-transparent" />
        </div>

        <div className="relative z-20 max-w-[1600px] mx-auto flex flex-col px-4 md:px-12 lg:px-20 w-full">
          <div className="w-full lg:w-4/5 xl:w-3/5">
            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] md:leading-[1.05] text-[#FAFAFA] flex flex-col items-start min-h-[90px] md:min-h-[160px]">
              <span className="block">Duniya ke sabse bade brands ke</span>
              <span key={heroVideoIndex} className="text-[#E92A39] block animate-text-fade-up mt-1 md:mt-2">
                {heroRedHooks[heroVideoIndex % heroRedHooks.length]}
              </span>
            </h1>
            
            {waitlistStatus !== 'success' ? (
              <>
                <p className="text-base md:text-2xl text-[#A1A1AA] mb-8 md:mb-10 max-w-xl font-bold animate-text-fade-up" style={{ animationDelay: '100ms' }}>
                  Register before August 31st to get the first briefs the moment they drop.
                </p>
                <div id="waitlist-form" className="mt-4 md:mt-6 w-full scroll-mt-32 animate-text-fade-up" style={{ animationDelay: '200ms' }}>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={waitlistEmail}
                      onChange={(e) => { setWaitlistEmail(e.target.value); if (waitlistStatus === 'error') setWaitlistStatus('idle'); }}
                      className={`flex-1 bg-black/40 backdrop-blur-md border ${waitlistStatus === 'error' ? 'border-[#E92A39]' : 'border-white/10'} text-white placeholder:text-[#71717A] px-5 py-3.5 md:px-6 md:py-4 rounded-full focus:outline-none focus:border-[#E92A39] font-bold text-sm md:text-base transition-colors shadow-inner`}
                    />
                    <button onClick={handleWaitlistJoin} disabled={waitlistStatus === 'submitting'} className="bg-[#E92A39] text-white px-8 py-3.5 md:py-4 rounded-full text-xs font-black uppercase tracking-widest shrink-0 hover:bg-[#ff3b4b] transition-colors disabled:opacity-60 shadow-lg">
                      {waitlistStatus === 'submitting' ? 'Joining...' : 'Lock In'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // NEW QUEUE UI AFTER SIGNUP
              <div id="waitlist-form" className="mt-6 md:mt-8 w-full max-w-xl bg-[#151515]/90 backdrop-blur-md border border-[#2A2A2E] rounded-[2rem] p-6 md:p-8 shadow-2xl animate-text-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#10B981]" /> You're locked in.
                  </h3>
                  <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[#10B981]/20 w-fit">
                    Rank #{waitlistRank.toLocaleString()}
                  </span>
                </div>
                <p className="text-[#A1A1AA] text-sm md:text-base font-bold mb-6 leading-relaxed">
                  The vault opens Aug 31st. Want early access? Move up <strong className="text-white">50 spots</strong> for every peer who joins using your link.
                </p>
                <div className="flex items-center gap-2 bg-[#0A0A0A] p-1.5 md:p-2 rounded-xl border border-[#2A2A2E]">
                  <input 
                    type="text" 
                    readOnly 
                    value={`ingenuityx.com/join?ref=ix_${waitlistEmail.split('@')[0] || 'user'}`} 
                    className="bg-transparent text-[#71717A] text-xs md:text-sm font-mono flex-1 px-3 outline-none truncate"
                  />
                  <button 
                    onClick={() => { 
                      navigator.clipboard.writeText(`ingenuityx.com/join?ref=ix_${waitlistEmail.split('@')[0] || 'user'}`); 
                      setCopied(true); setTimeout(() => setCopied(false), 2000); 
                    }}
                    className="bg-[#2A2A2E] hover:bg-[#3f3f46] text-white px-4 py-2.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 shrink-0"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5"/> : <Copy className="w-3.5 h-3.5"/>}
                    {copied ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. LIVE CHALLENGE TEASER STRIP */}
      <section className="relative z-20 -mt-12 md:-mt-24 px-4 md:px-8 max-w-[1600px] mx-auto pb-12 md:pb-20">
        <div className="flex items-center justify-between mb-4 px-1 md:px-2">
          <p className="text-[10px] md:text-xs font-black text-[#A1A1AA] uppercase tracking-widest">Sneak Peek: Live in the Vault</p>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scrollTrack(teaserScrollRef, 'left')} className="w-8 h-8 rounded-full border border-[#2A2A2E] bg-[#161616]/80 backdrop-blur-md flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">←</button>
            <button onClick={() => scrollTrack(teaserScrollRef, 'right')} className="w-8 h-8 rounded-full border border-[#2A2A2E] bg-[#161616]/80 backdrop-blur-md flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">→</button>
          </div>
        </div>
        
        <div ref={teaserScrollRef} className="flex overflow-x-auto hide-scrollbar gap-3 md:gap-4 pb-4 snap-x snap-mandatory">
          {opportunities.slice(0, 5).map((opp, i) => (
            <div key={i} className="w-[80vw] sm:w-[320px] shrink-0 snap-center relative rounded-2xl overflow-hidden bg-[#161616]/80 backdrop-blur-sm border border-[#2A2A2E] h-[180px] md:h-[220px] group cursor-pointer shadow-lg" onClick={scrollToWaitlist}>
              <img src={opp.bgImage || PLACEHOLDER_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 md:group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/80 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20">
                <Lock className="w-6 h-6 md:w-8 md:h-8 text-white mb-2" />
                <span className="bg-[#E92A39] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Unlocks Aug 31</span>
              </div>

              <div className="relative z-10 p-4 md:p-5 h-full flex flex-col justify-end">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] mb-1 md:mb-2">{opp.company}</span>
                <h4 className="text-lg md:text-xl font-black text-white leading-tight mb-2 truncate">{opp.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] md:text-[10px] font-bold px-2 py-1 rounded bg-white/10 text-white/90 border border-white/5">{opp.type}</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-[#10b981]">{opp.points?.split('+')[0] || 'Reward'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PICK YOUR LANE */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto border-t border-[#2A2A2E]">
        <ScrollReveal>
          <div className="mb-8 md:mb-10 text-left">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 md:mb-4">Find your vibe</h3>
            <p className="text-[#A1A1AA] font-bold text-sm md:text-lg">No endless scrolling. Pick your field to see the live briefs.</p>
          </div>
        </ScrollReveal>
        
        {/* Mobile: Horizontal Scroll. Desktop: Slanted Accordion */}
        <div className="flex overflow-x-auto md:overflow-visible hide-scrollbar flex-row gap-3 md:gap-4 h-[220px] md:h-[450px] snap-x snap-mandatory pb-4 md:pb-0">
          {['Marketing', 'Tech', 'Design', 'Sustainability', 'Innovation'].map((catName, i) => {
            const catColor = CATEGORY_COLORS[catName] || '#FAFAFA';
            const count = opportunities.filter(o => o.category === catName).length;
            const data = CATEGORY_DATA[catName];
            
            return (
              <ScrollReveal key={i} delay={i * 50} className="w-[75vw] sm:w-[300px] md:w-auto shrink-0 snap-center md:flex-1 md:min-w-0 transition-all duration-500 ease-out md:hover:flex-[2.5]">
                <div 
                  onClick={() => { setActiveFilter(catName); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="relative h-full w-full overflow-hidden group cursor-pointer transition-all duration-500 ease-out md:transform md:-skew-x-6 rounded-2xl md:rounded-2xl border border-[#2A2A2E] hover:border-transparent"
                >
                  <div className="absolute md:inset-[-20%] md:w-[140%] inset-0 w-full h-full md:transform md:skew-x-6 pointer-events-none">
                    <img src={data.img} alt={catName} className="absolute inset-0 w-full h-full object-cover opacity-40 md:group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/40 md:via-black/20 to-transparent md:group-hover:opacity-0 transition-opacity duration-300"></div>
                    
                    {/* Staggered Step Fill */}
                    <div className="hidden md:block absolute inset-0 overflow-hidden z-10">
                       <div className="absolute bottom-0 left-0 w-[33.5%] h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" style={{ backgroundColor: catColor }}></div>
                       <div className="absolute bottom-0 left-[33.3%] w-[33.5%] h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75" style={{ backgroundColor: catColor }}></div>
                       <div className="absolute bottom-0 left-[66.6%] w-[33.5%] h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out delay-150" style={{ backgroundColor: catColor }}></div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-8 md:transform md:skew-x-6 pointer-events-none">
                    {/* Default View */}
                    <div className="md:absolute md:bottom-6 md:left-8 transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4">
                      <h4 className="text-2xl md:text-xl lg:text-3xl font-black text-white uppercase tracking-widest drop-shadow-lg" style={{ color: catColor }}>
                        {catName}
                      </h4>
                      <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-widest mt-1 bg-black/60 md:bg-black/40 px-2 py-1 w-fit rounded">{count} Live</p>
                    </div>

                    {/* Desktop Hover Reveal */}
                    <div className="hidden md:flex opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 flex-col items-start h-full justify-center pl-2 md:pl-6 w-[120%] md:w-full">
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">{catName}</h4>
                      <p className="text-white/90 text-sm md:text-base font-semibold mb-6 max-w-[220px] md:max-w-sm leading-relaxed drop-shadow-md">{data.desc}</p>
                      <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> {count} Live Briefs
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. WHAT'S ACTUALLY ON THE LINE */}
      <section className="relative w-full py-16 md:py-24 px-4 md:px-8 border-y border-[#2A2A2E] overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={PLACEHOLDER_BG} alt="Rewards Background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#151515] via-[#151515]/80 to-[#151515]"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-3 md:mb-4">Earn More Than a Certificate</h2>
              <p className="text-[#A1A1AA] font-bold text-sm md:text-lg max-w-2xl mx-auto px-4">No generic certificates. These are the actual rewards tied to live briefs in the vault right now.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {uniqueRewards.map((reward, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#2A2A2E] rounded-[1.5rem] md:rounded-[2rem] text-center flex flex-col items-center justify-center min-h-[140px] md:min-h-[200px] hover:border-[#E92A39]/50 transition-colors overflow-hidden group">
                  <img src={REWARD_IMAGES[i % REWARD_IMAGES.length]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
                  <div className="relative z-10 p-6 md:p-8 w-full flex flex-col items-center justify-center h-full">
                    <h4 className="text-xl md:text-2xl font-black text-white mb-1 md:mb-2">{reward.includes('+') ? reward.split('+')[0].trim() : reward}</h4>
                    {reward.includes('+') && <span className="text-xs md:text-sm font-bold text-[#E92A39]">+{reward.split('+')[1].trim()}</span>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
            {uniqueRewards.length < 4 && (
              <ScrollReveal delay={200}>
                <div className="bg-[#1C1C1E]/80 backdrop-blur-sm border border-dashed border-[#2A2A2E] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-center flex flex-col items-center justify-center min-h-[140px] md:min-h-[200px]">
                  <h4 className="text-sm md:text-xl font-bold text-[#71717A] mb-2">+ More dropping launch day</h4>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* 5. THE CHALLENGE VAULT (REFINED HOVER ACTION) */}
      <section id="opportunities" className="py-16 md:py-24 relative overflow-hidden bg-transparent border-b border-[#2A2A2E] scroll-mt-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2 md:mb-4 text-white">The Challenge Vault</h2>
                <p className="text-[#A1A1AA] text-sm md:text-base font-bold">Pick a brief. Build your proof. Get noticed.</p>
              </div>
              <div className="flex items-center bg-[#1C1C1E]/80 backdrop-blur-md border border-[#2A2A2E] rounded-full px-4 py-2.5 md:px-5 md:py-3 w-full md:w-[350px]">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-[#71717A] mr-2 md:mr-3" />
                <input type="text" placeholder="Search brands or briefs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-[#71717A]" />
              </div>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-4 md:pb-6 w-full">
              {['All', 'Marketing', 'Tech', 'Design', 'Sustainability', 'Innovation'].map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)} 
                  className={`whitespace-nowrap px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all border ${activeFilter === filter ? 'bg-[#E92A39] border-[#E92A39] text-white' : 'bg-[#151515]/80 backdrop-blur-sm border-[#2A2A2E] text-[#A1A1AA] hover:border-gray-500 hover:text-white'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {isLoadingOpps ? (
             <div className="text-center py-20 md:py-32 text-[#71717A] font-bold text-xs md:text-sm uppercase tracking-widest">Loading...</div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="text-center py-20 md:py-32 border border-[#2A2A2E] rounded-2xl bg-[#151515]/80 backdrop-blur-sm">
              <p className="text-[#A1A1AA] text-sm font-bold">No matches found in this lane.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredOpportunities.map((opp, i) => {
                const catColor = CATEGORY_COLORS[opp.category] || '#E92A39';
                return (
                  <ScrollReveal key={opp.id} delay={(i % 4) * 50}>
                    <div 
                      className="relative rounded-[2.5rem] bg-[#161616] border border-[#2A2A2E] h-[540px] flex flex-col overflow-hidden group cursor-pointer shadow-sm"
                      onClick={scrollToWaitlist}
                    >
                      {/* Background Image */}
                      <img src={opp.bgImage || PLACEHOLDER_BG} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                      {/* Default State (Visible when NOT hovered) */}
                      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 transition-opacity duration-500 group-hover:opacity-0">
                        {/* Top Left Tag */}
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white w-fit shadow-sm flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }}></span>
                          {opp.category}
                        </span>

                        {/* Bottom Gradient & Content */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none" />
                        <div className="relative z-10 w-full mt-auto">
                           <h4 className="text-3xl font-black text-white mb-6 leading-tight">{opp.title}</h4>
                           <button className="w-full bg-[#1C1C1E] border border-[#2A2A2E] text-white py-4 rounded-xl text-sm font-black flex justify-center items-center gap-2 shadow-lg backdrop-blur-md">
                              Hover to view brief
                           </button>
                        </div>
                      </div>

                      {/* Hover Overlay (Dark Blur) */}
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                      {/* Hover Content Area (Exactly matching the image) */}
                      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        
                        {/* Top Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-white/90 shadow-sm">{opp.type}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-white/90 shadow-sm">PPO Pathway</span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#10B981] text-white w-fit shadow-sm">Opens 31st Aug</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/5 shadow-sm">↗</div>
                        </div>

                        {/* Title & Company */}
                        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 drop-shadow-md">{opp.title}</h3>
                        
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-12 h-12 rounded-full bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                             {opp.logoUrl ? <img src={opp.logoUrl} alt={opp.company} className="w-full h-full object-contain" /> : <span className="text-[#111] font-black text-xl">{opp.company.charAt(0)}</span>}
                           </div>
                           <div className="flex items-center gap-1.5 text-white font-bold text-lg drop-shadow-md">
                             {opp.company} <CheckCircle2 className="w-5 h-5 text-[#3BA8E7]" strokeWidth={3} /> <span className="text-[10px] uppercase tracking-widest text-white/60 font-black ml-1">Verified</span>
                           </div>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 mb-6">
                          <span className="text-[11px] font-bold px-4 py-2 rounded-full border border-white/20 text-white/90 bg-white/5 backdrop-blur-sm">Team 1-4</span>
                          <span className="text-[11px] font-bold px-4 py-2 rounded-full border border-white/20 text-white/90 bg-white/5 backdrop-blur-sm">Beginner Friendly</span>
                        </div>

                        {/* Reward Box */}
                        <div className="bg-white/5 border border-white/20 rounded-2xl p-5 mb-auto backdrop-blur-sm">
                          <h4 className="text-2xl font-black text-white drop-shadow-sm mb-1">{opp.points.split('+')[0].trim()}</h4>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA]">{opp.duration} • {opp.deadline}</p>
                        </div>

                        {/* CTA & Desc */}
                        <button className="w-full bg-[#E92A39] text-white py-4 rounded-xl text-sm font-black flex justify-center items-center gap-2 shadow-lg mb-4 hover:bg-[#ff3b4b] transition-colors mt-6">
                          ⏳ Join Waitlist to Apply
                        </button>
                        <p className="text-[#A1A1AA] text-xs font-medium line-clamp-2 leading-relaxed drop-shadow-sm">{opp.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. 4 AM IS WHEN YOU FIND OUT — Artifact Wall */}
      <section className="py-16 md:py-28 px-4 md:px-8 max-w-[1600px] mx-auto border-t border-[#2A2A2E] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E92A39]/5 rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="mb-12 md:mb-20 text-left">
            
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-3 md:mb-4 max-w-3xl">
              Because 4 AM is when you find out what you're made of.
            </h2>
            <p className="text-[#A1A1AA] font-bold text-sm md:text-xl max-w-2xl">
              Every brief has a version of this night. Here's what one actually looked like.
            </p>
          </div>
        </ScrollReveal>

        {/* SCATTERED PROOF WALL */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:gap-y-12">

          {/* Chat log — team panic, 3 hours out */}
          <ScrollReveal className="md:col-span-5 md:col-start-1" delay={0}>
            <PinnedCard rotate={-2} className="relative overflow-hidden md:-mt-2 p-0">
              <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                style={{ 
                  backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="p-4 md:p-5 relative z-10">
                <div className="flex items-center gap-2 mb-3 text-[#71717A] bg-[#161616]/90 backdrop-blur-sm border border-[#2A2A2E] px-3 py-1.5 rounded-full w-fit shadow-sm">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Team Ironclad — group chat</span>
                </div>
                <div className="space-y-2 text-sm font-semibold flex flex-col">
                  <div className="bg-[#202C33] border border-[#2A2A2E] rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit max-w-[85%] text-[#FAFAFA] shadow-sm">
                    ok the deck is done but slide 6 makes no sense at 2am energy
                  </div>
                  <div className="bg-[#202C33] border border-[#2A2A2E] rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit max-w-[85%] text-[#FAFAFA] shadow-sm">
                    rebuilding it now don't touch anything
                  </div>
                  <div className="bg-[#005C4B] border border-[#2A2A2E] rounded-2xl rounded-tr-sm px-4 py-2.5 w-fit max-w-[85%] text-white ml-auto text-right shadow-sm">
                    someone get chai. this is happening
                  </div>
                </div>
              </div>
            </PinnedCard>
          </ScrollReveal>

          {/* Terminal — countdown to deadline via commit log */}
          <ScrollReveal className="md:col-span-6 md:col-start-7" delay={80}>
            <PinnedCard rotate={1.5} className="p-4 md:p-5 md:mt-6 font-mono">
              <div className="flex items-center gap-2 mb-3 text-[#71717A]">
                <Terminal className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">solid-shift-submission — main</span>
              </div>
              <div className="text-xs md:text-sm space-y-1.5 text-[#A1A1AA]">
                <p><span className="text-[#10B981]">02:14</span> fix: numbers finally add up</p>
                <p><span className="text-[#10B981]">03:41</span> wip: rewriting the whole pitch, sorry</p>
                <p><span className="text-[#F59E0B]">04:52</span> fix: typo in title (had one job)</p>
                <p><span className="text-[#E92A39]">05:58</span> feat: submitted. we are never doing this again</p>
              </div>
            </PinnedCard>
          </ScrollReveal>

          {/* Sticky note — handwritten, small, tucked between */}
          <ScrollReveal className="md:col-span-3 md:col-start-2" delay={140}>
            <div
              className="bg-[#F5E663] text-[#1a1a1a] p-5 md:p-6 rounded-sm shadow-2xl md:-mt-4 md:ml-8"
              style={{ transform: 'rotate(3deg)', fontFamily: "'Kalam', cursive" }}
            >
              <p className="text-lg md:text-xl leading-snug font-bold">
                we are NOT giving up at hour 4. — team note to self
              </p>
            </div>
          </ScrollReveal>

          {/* Polaroid — placeholder image, swap for a real photo later */}
          <ScrollReveal className="md:col-span-4 md:col-start-6" delay={100}>
            <div className="bg-[#EDEDED] p-3 pb-8 rounded-sm shadow-2xl md:mt-2" style={{ transform: 'rotate(-3deg)' }}>
              <div className="w-full aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden">
                <img src={img7} alt="" className="w-full h-full object-cover opacity-90" />
              </div>
              <p
                className="text-center text-[#1a1a1a] text-sm md:text-base mt-3"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                canteen, 4:12 AM, still going
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Live ticker — real platform signal, not a sourced global stat */}
        <ScrollReveal delay={220}>
          <div className="mt-14 md:mt-20 bg-[#0A0A0A] border border-[#2A2A2E] rounded-2xl md:rounded-full px-6 md:px-10 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-white font-black text-sm md:text-base">
                {liveSquadCount > 0 ? liveSquadCount : '—'} squads are mid-brief right now
              </span>
            </div>
            <p className="text-[#71717A] text-xs md:text-sm font-bold text-center md:text-right">
              Yours could be next. Vault opens Aug 31.
            </p>
            <button
              onClick={scrollToWaitlist}
              className="bg-[#E92A39] hover:bg-[#ff3b4b] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shrink-0 transition-colors"
            >
              Get In Before It Opens
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. HOW THE LOOP CLOSES */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1600px] mx-auto border-t border-[#2A2A2E]">
        <ScrollReveal>
          <div className="mb-10 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-2 md:mb-4">
              Nobody submits into a void.
            </h2>
            <p className="text-[#A1A1AA] font-bold text-sm md:text-xl">
              Win or lose, you get graded. That's the whole point.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          
          {/* LEFT: 360 Degree Ring using exact CATEGORY_COLORS */}
          <ScrollReveal className="w-full h-full" delay={0}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 bg-[#161616]/80 backdrop-blur-sm border border-[#2A2A2E] rounded-[2rem] p-8 md:p-12 w-full h-full">
              
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-2xl">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2A2A2E" strokeWidth="12" />
                  
                  {/* Colored Segments (Circumference ~251.3, gap of ~2) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={CATEGORY_COLORS.Marketing} strokeWidth="12" strokeDasharray="48 251.3" strokeDashoffset="0" className="transition-all duration-1000" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={CATEGORY_COLORS.Tech} strokeWidth="12" strokeDasharray="48 251.3" strokeDashoffset="-50.2" className="transition-all duration-1000 delay-100" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={CATEGORY_COLORS.Design} strokeWidth="12" strokeDasharray="48 251.3" strokeDashoffset="-100.5" className="transition-all duration-1000 delay-200" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={CATEGORY_COLORS.Sustainability} strokeWidth="12" strokeDasharray="48 251.3" strokeDashoffset="-150.7" className="transition-all duration-1000 delay-300" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={CATEGORY_COLORS.Innovation} strokeWidth="12" strokeDasharray="48 251.3" strokeDashoffset="-201" className="transition-all duration-1000 delay-400" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white">360°</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717A]">Evaluation</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-4 w-full max-w-[200px]">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#71717A] border-b border-[#2A2A2E] pb-2">The InGenuityX Rubric</span>
                {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: color }} />
                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: SRMB Ironclad Real Scorecard */}
          <ScrollReveal delay={150} className="w-full h-full">
            <div className="bg-[#1C1C1E]/80 backdrop-blur-md border border-[#2A2A2E] rounded-[2rem] p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-between">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#2A2A2E] pb-6">
                <div className="flex items-center gap-3">
                  <img src={srmbLogo} alt="SRMB" className="w-10 h-10 rounded-full object-contain bg-white p-1" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-widest leading-none mb-1.5">Live Seeded Challenge</span>
                    <span className="text-base md:text-lg font-black text-white leading-none">SRMB Ironclad</span>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#E92A39]/10 text-[#E92A39] border border-[#E92A39]/30 w-fit">Not Selected</span>
              </div>

              <div className="space-y-5 mb-8">
                {[
                  { label: 'Marketing Strategy', score: 8.5, color: CATEGORY_COLORS.Marketing },
                  { label: 'Creative Design', score: 7.2, color: CATEGORY_COLORS.Design },
                  { label: 'Technical Viability', score: 4.8, color: CATEGORY_COLORS.Tech },
                  { label: 'Overall Innovation', score: 6.5, color: CATEGORY_COLORS.Innovation },
                ].map((row, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs md:text-sm font-black text-white mb-2">
                      <span>{row.label}</span>
                      <span>{row.score}/10</span>
                    </div>
                    <div className="h-2.5 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#2A2A2E]">
                      <div className="h-full rounded-full" style={{ width: `${row.score * 10}%`, backgroundColor: row.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[#A1A1AA] text-sm md:text-base font-bold italic border-t border-[#2A2A2E] pt-6 mt-auto">
                "Strong lateral marketing angles, but the technical execution needed much sharper scoping to be viable."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent border-t border-[#2A2A2E]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 md:mb-10 text-white text-left md:text-center">Before you ask.</h2>
            <div className="bg-[#151515]/80 backdrop-blur-sm border border-[#2A2A2E] rounded-2xl md:rounded-[2rem] px-5 md:px-10">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. FINAL COUNTDOWN CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="bg-[#1C1C1E]/80 backdrop-blur-md border border-[#2A2A2E] rounded-2xl md:rounded-[3rem] p-8 md:p-20 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#E92A39]/10 to-transparent pointer-events-none"></div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-4 md:mb-6 relative z-10">
              Vault opens August 31st.
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-lg font-bold mb-8 md:mb-10 max-w-xl relative z-10">
              Don't miss the first cohort of live briefs. Join the waitlist to secure early access.
            </p>
            <button onClick={scrollToWaitlist} className="bg-[#E92A39] hover:bg-[#ff3b4b] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg relative z-10">
              Join the Waitlist
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-[#2A2A2E] bg-black/80 backdrop-blur-md">
        <ScrollReveal>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div className="md:col-span-2 flex flex-col items-start gap-6 md:gap-8">
              <img src={logoImage} alt="InGenuityX Logo" className="h-6 md:h-10 w-auto object-contain" />
              <p className="text-[#71717A] text-xs md:text-sm max-w-xs leading-relaxed font-bold">Bridging the gap between Gen Z talent and brand briefs. Stop simulating. Start building.</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#71717A] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">Platform</h4>
              <div className="flex flex-col space-y-3 md:space-y-4 text-white text-xs md:text-sm font-bold">
                <a href="#opportunities" className="hover:text-[#E92A39] transition-colors w-fit">Challenges</a>
                <Link to="/about" className="hover:text-[#E92A39] transition-colors w-fit">About</Link>
                <Link to="/for-brands" className="hover:text-[#E92A39] transition-colors w-fit">For Brands</Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#71717A] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">Connect</h4>
              <div className="flex flex-col space-y-3 md:space-y-4 text-xs md:text-sm font-bold text-white">
                <a href="mailto:storm@minervainnov.com" className="hover:text-[#E92A39] transition-colors w-fit">storm@minervainnov.com</a>
                <a href="tel:+918320262013" className="hover:text-[#E92A39] transition-colors w-fit">+91 8320 262 013</a>
              </div>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#2A2A2E]">
            <p className="text-[10px] md:text-xs text-[#71717A] font-bold uppercase tracking-widest">© 2026 InGenuityX. All rights reserved.</p>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}