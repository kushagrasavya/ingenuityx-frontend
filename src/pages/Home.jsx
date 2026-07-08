import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Search } from 'lucide-react';

import heroImage2 from '../imports/image-4.png';
import heroImage3 from '../imports/image-5.png';
import registeredImage from '../imports/image-1.png';
import campusRegistration from '../imports/image-2.png';
import groupDiscussion from '../imports/image-3.png';
import stagePresentation from '../imports/image-8.png';
import winningMoment from '../imports/image-5.png';
import certificateImage from '../imports/image-6.png';
import logoImage from '../imports/ingenuityx-logo.png';
import billboardImage from '../imports/Gemini_Generated_Image_1l2vfz1l2vfz1l2v.png';

// --- LOCAL LOGOS & IMAGES ---
import nuvocoLogo from '../imports/logo_nuvoco.jpg';
import srmbLogo from '../imports/srmb.jpg';
import ingenxLogo from '../imports/ingenx.png';        
import trootechLogo from '../imports/trootech.png';   
import colgateBg from '../imports/SmileBright.png'; 

// --- NEW POSTER UPLOADS ---
import legrandBg from '../imports/legrand.png';
import nuvocoGreenBg from '../imports/nuvoco (1).png';
import srmbShiftBg from '../imports/nuvoco.png'; 
import srmbGreenProBg from '../imports/srmb (1).png';
import srmbIroncladBg from '../imports/srmb.png';
import trootechPosterBg from '../imports/Trootech (2).png';
import ingenxPosterBg from '../imports/IngenX (2).png';
import evereadyBg from '../imports/eveready.png';

// --- ENVIRONMENT VARIABLE SETUP ---
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

// --- PLACEHOLDER BACKGROUND ---
const PLACEHOLDER_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

// --- CUSTOM SCROLL REVEAL COMPONENT ---
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
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  let dirClass = "";
  if (!isVisible) {
    if (direction === "up") dirClass = "translate-y-16 opacity-0";
    if (direction === "down") dirClass = "-translate-y-16 opacity-0";
    if (direction === "left") dirClass = "-translate-x-16 opacity-0";
    if (direction === "right") dirClass = "translate-x-16 opacity-0";
    if (direction === "scale") dirClass = "scale-90 opacity-0";
  } else {
    dirClass = "translate-y-0 translate-x-0 scale-100 opacity-100";
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${dirClass} ${className}`} style={{ transitionDelay: `${delay}ms`, width }}>
      {children}
    </div>
  );
}

// --- MINI WIDGET 1: AURA CALCULATOR ---
function AuraCalculator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  
  const questions = [
    { q: "HR asks: 'Where do you see yourself in 5 years?'", opts: [{ t: "Taking your job.", s: 5000 }, { t: "On a beach, unbothered.", s: 1000 }, { t: "Synergizing core deliverables.", s: -1000 }] },
    { q: "Your manager denies your PTO request. Your move:", opts: [{ t: "'Okay noted' (cries)", s: -500 }, { t: "It wasn't a request. It was a heads-up.", s: 5000 }, { t: "Call in sick that day anyway.", s: 500 }] },
    { q: "Colleague says 'Let's circle back offline'. Translation?", opts: [{ t: "We are never speaking of this again.", s: 500 }, { t: "I need to schedule a 1:1 meeting.", s: -1000 }, { t: "They hate me.", s: 0 }] }
  ];

  const handleAnswer = (points) => {
    setScore(score + points);
    setStep(step + 1);
  };

  return (
    <div className="bg-[#FDE25D] border border-gray-200 p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col h-[400px] relative overflow-hidden group hover:shadow-md transition-all">
      <h3 className="text-2xl font-black tracking-tight mb-1 text-[#111] flex items-center gap-2">🔮 Aura Calculator</h3>
      <p className="text-xs font-bold text-[#111]/60 uppercase tracking-widest mb-6">Mini-Game</p>
      {!isPlaying ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-global">
          <div className="text-5xl mb-4 drop-shadow-sm">💼</div>
          <h4 className="text-xl font-black leading-tight mb-3 text-[#111]">Discover your corporate vibe.</h4>
          <p className="text-sm font-bold text-[#111]/60 mb-6">Are you a CEO or an NPC?</p>
          <button onClick={() => setIsPlaying(true)} className="bg-white text-[#111] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-md">
            Start Quiz
          </button>
        </div>
      ) : step < questions.length ? (
        <div className="flex-1 flex flex-col justify-center animate-fade-in-global">
          <span className="text-[10px] font-black uppercase text-[#E92A39] mb-2 tracking-widest">Question {step + 1} / {questions.length}</span>
          <h4 className="text-xl font-black leading-tight mb-5 text-[#111]">{questions[step].q}</h4>
          <div className="space-y-3">
            {questions[step].opts.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.s)} className="w-full text-left bg-white/60 hover:bg-white text-sm font-bold text-[#111] px-5 py-3.5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-sm">
                {opt.t}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-global">
          <p className="text-sm font-bold text-gray-700 mb-2">Final Aura Score</p>
          <div className="text-6xl font-black text-[#111] mb-4 tracking-tighter">{score > 0 ? `+${score}` : score}</div>
          <p className="text-sm font-bold leading-relaxed text-[#111] bg-white/50 p-4 rounded-xl border border-white shadow-sm">
            {score >= 5000 ? "Sigma Energy. You are the CEO now." : score > 0 ? "You will survive the corporate machine." : "Negative Aura. Confirmed Corporate NPC."}
          </p>
          <button onClick={() => { setIsPlaying(false); setStep(0); setScore(0); }} className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#111] bg-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-sm">Play Again</button>
        </div>
      )}
    </div>
  );
}

// --- MINI WIDGET 2: FLAG GAME (COMPETITIVE, FIXED ENDING) ---
function FlagGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(null);
  
  const cards = [
    { t: "Looking for a rockstar ninja who wears many hats.", flag: "red", r: "Translation: You will do the job of 3 different people for the salary of one intern." },
    { t: "We actively encourage taking your PTO.", flag: "green", r: "Translation: Rare W. They don't want you burning out and crying in the office bathroom." },
    { t: "Salary is based on experience and passion.", flag: "red", r: "Translation: They pay in 'exposure' and occasional office pizza. Run." },
    { t: "We play hard, but we work even harder.", flag: "red", r: "Translation: You will be online at 11 PM on a Friday. The 'play' is a ping-pong table nobody uses." },
    { t: "We care about output, not hours logged.", flag: "green", r: "Translation: Massive Green Flag. No clock-watching or policing your active status on Slack." },
    { t: "You'll have the opportunity to define your own role.", flag: "red", r: "Translation: We have zero strategy or onboarding plan. Good luck figuring it out." },
    { t: "Salary range is listed directly in the Job Description.", flag: "green", r: "Translation: W company. No wasting 4 interview rounds just to find out it pays peanuts." },
    { t: "Please complete this 20-page assignment before the first round.", flag: "red", r: "Translation: They are crowdsourcing free labor to solve their actual client problems." },
    { t: "We're like a family here.", flag: "red", r: "Translation: We have zero boundaries, no HR department, and high emotional manipulation." },
    { t: "Junior ideas are actively tested and funded here.", flag: "green", r: "Translation: Green flag! You won't just be fetching coffee; your brain will actually be used." }
  ];

  const handleGuess = (guess) => {
    const isCorrect = guess === cards[index].flag;
    setLastGuessCorrect(isCorrect);
    if (isCorrect) { setScore(s => s + 100); } else { setScore(s => Math.max(0, s - 50)); }
    setRevealed(true);
  };

  const nextCard = () => { 
    setRevealed(false); setLastGuessCorrect(null);
    if (index + 1 < cards.length) { setIndex(index + 1); } else { setIsGameOver(true); }
  };

  const resetGame = () => {
    setIsPlaying(false); setIsGameOver(false); setIndex(0); setScore(0); setRevealed(false); setLastGuessCorrect(null);
  };

  const bgColor = !isPlaying || !revealed || isGameOver ? 'bg-[#111]' : (cards[index].flag === 'red' ? 'bg-[#E92A39]' : 'bg-[#10b981]');

  return (
    <div className={`${bgColor} border border-gray-200 p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col h-[400px] text-white relative group transition-colors duration-500 hover:shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight mb-1 text-white flex items-center gap-2">Scanner</h3>
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Guess to Score</p>
        </div>
        {isPlaying && !isGameOver && (
          <div className="bg-white/20 px-4 py-2 rounded-xl text-right animate-fade-in-global">
            <p className="text-[9px] uppercase tracking-widest font-bold text-white/70">Score</p>
            <p className="text-xl font-black">{score}</p>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        {!isPlaying ? (
          <div className="animate-fade-in-global w-full">
            <h4 className="text-xl font-black leading-tight mb-3 text-white">Can you spot the red flags?</h4>
            <p className="text-sm font-bold text-white/60 mb-6">Swipe on corporate jargon.</p>
            <button onClick={() => setIsPlaying(true)} className="bg-white text-[#111] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-md">Start Scanning</button>
          </div>
        ) : isGameOver ? (
          <div className="animate-fade-in-global w-full flex flex-col items-center">
            <h4 className="text-xl font-black leading-tight mb-3 text-white">Game Over</h4>
            <p className="text-sm font-bold text-white/60 mb-2">Final Score</p>
            <div className="text-6xl font-black text-white mb-6 tracking-tighter">{score} <span className="text-2xl opacity-50">/ 1000</span></div>
            <button onClick={resetGame} className="bg-white text-[#111] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-md">Play Again</button>
          </div>
        ) : !revealed ? (
          <div className="animate-fade-in-global w-full">
            <span className="text-[10px] font-black uppercase text-white/50 mb-3 block tracking-widest">Card {index + 1} / {cards.length}</span>
            <div className="bg-white/10 p-6 rounded-2xl mb-6 backdrop-blur-sm min-h-[120px] flex items-center justify-center border border-white/20 shadow-inner">
              <h4 className="text-xl font-black leading-tight">"{cards[index].t}"</h4>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => handleGuess('red')} className="hover:scale-105 transition-transform bg-[#E92A39] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md border border-white/20">Red Flag</button>
              <button onClick={() => handleGuess('green')} className="hover:scale-105 transition-transform bg-[#10b981] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md border border-white/20">Green Flag</button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-global w-full flex flex-col items-center">
            {lastGuessCorrect ? (
              <span className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full mb-3 shadow-md">+100 CORRECT</span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full mb-3 shadow-md">-50 WRONG</span>
            )}
            <p className="text-sm font-bold bg-black/20 p-5 rounded-xl leading-relaxed mb-6 border border-white/10 shadow-inner">{cards[index].r}</p>
            <button onClick={nextCard} className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-md">
              {index + 1 < cards.length ? 'Next Phrase →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- MINI WIDGET 3: WHACK-A-YAPPER (REACTION GAME) ---
function WhackAYapper() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [moles, setMoles] = useState(Array(9).fill(null));

  useEffect(() => {
    let moleTimer;
    let countdownTimer;

    if (isPlaying && !isGameOver) {
      moleTimer = setInterval(() => {
        setMoles(prev => {
          const newMoles = [...prev];
          for(let i = 0; i < 9; i++) { if (Math.random() > 0.4) newMoles[i] = null; }
          const emptyIndices = newMoles.map((v, i) => v === null ? i : null).filter(v => v !== null);
          
          if (emptyIndices.length > 0) {
            const numToAdd = Math.floor(Math.random() * 2) + 1;
            for(let i = 0; i < numToAdd; i++) {
              if (emptyIndices.length === 0) break;
              const randIdx = Math.floor(Math.random() * emptyIndices.length);
              const gridIdx = emptyIndices[randIdx];
              emptyIndices.splice(randIdx, 1);

              const isGreen = Math.random() > 0.8;
              if (isGreen) {
                const goodWords = ["PPO", "Raise", "Paid Leave", "Bonus"];
                newMoles[gridIdx] = { type: 'green', text: goodWords[Math.floor(Math.random() * goodWords.length)] };
              } else {
                const toxicWords = ["Synergy", "Plz Fix", "ASAP", "Bandwidth", "Circle Back"];
                newMoles[gridIdx] = { type: 'red', text: toxicWords[Math.floor(Math.random() * toxicWords.length)] };
              }
            }
          }
          return newMoles;
        });
      }, 700);

      countdownTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setIsGameOver(true); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { clearInterval(moleTimer); clearInterval(countdownTimer); };
  }, [isPlaying, isGameOver]);

  const whack = (index) => {
    const mole = moles[index];
    if (!mole) return;
    if (mole.type === 'red') { setScore(s => s + 10); } else { setScore(s => Math.max(0, s - 50)); }
    setMoles(prev => { const newMoles = [...prev]; newMoles[index] = null; return newMoles; });
  };

  const startGame = () => {
    setIsPlaying(true); setIsGameOver(false); setScore(0); setTimeLeft(15); setMoles(Array(9).fill(null));
  };

  return (
    <div className="bg-[#2E73E6] border border-gray-200 p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col h-[400px] text-white relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight mb-1 text-white flex items-center gap-2 relative z-20">Whack-A-Yapper</h3>
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest relative z-20">Reaction Game</p>
        </div>
        {isPlaying && !isGameOver && (
          <div className="bg-white/20 px-3 py-1.5 rounded-xl text-right animate-fade-in-global flex gap-4">
            <div>
              <p className="text-[8px] uppercase tracking-widest font-bold text-white/70">Time</p>
              <p className="text-lg font-black">{timeLeft}s</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-widest font-bold text-white/70">Score</p>
              <p className="text-lg font-black">{score}</p>
            </div>
          </div>
        )}
      </div>
      
      {!isPlaying ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-global z-20">
          <h4 className="text-xl font-black leading-tight mb-3 text-white">Smash the toxic jargon.</h4>
          <p className="text-sm font-bold text-white/60 mb-6 px-4">Hit the Red bubbles. <br/> Avoid the Green flags!</p>
          <button onClick={startGame} className="bg-white text-[#2E73E6] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-md">
            Start Game
          </button>
        </div>
      ) : isGameOver ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-global z-20">
          <h4 className="text-3xl font-black mb-3">Time's Up!</h4>
          <p className="text-sm font-bold text-white/80 mb-2 uppercase tracking-widest">Final Score</p>
          <div className="text-6xl font-black text-white mb-8 tracking-tighter">{score}</div>
          <button onClick={() => setIsPlaying(false)} className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-[#2E73E6] transition-colors shadow-sm">
            Main Menu
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center relative z-20 animate-fade-in-global">
          <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] aspect-square mx-auto">
            {moles.map((mole, i) => (
              <div 
                key={i} 
                className="bg-white/10 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-pointer shadow-inner active:bg-white/5" 
                onMouseDown={() => whack(i)}
                onTouchStart={() => whack(i)}
              >
                {mole && (
                  <div className={`w-[90%] h-[90%] rounded-xl flex items-center justify-center p-1 shadow-md scale-100 transition-transform active:scale-90 animate-fade-in-global ${mole.type === 'red' ? 'bg-[#E92A39]' : 'bg-[#10b981]'}`}>
                    <span className="text-[10px] md:text-xs font-black tracking-tighter leading-none text-center break-words px-1 drop-shadow-sm">
                      {mole.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  
  // --- PLATFORM STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [isLoadingOpps, setIsLoadingOpps] = useState(true);

  // --- UI STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [hasDismissedPopup, setHasDismissedPopup] = useState(
    () => sessionStorage.getItem('popup_dismissed') === 'true'
  );
  
  // Vault View Toggle State
  const [showAllVault, setShowAllVault] = useState(false);

  // --- SCROLL REFS ---
  const vaultScrollRef = useRef(null);
  const timelineScrollRef = useRef(null);
  
  // --- POPUP LOGIC STATE ---
  const [heroFactIndex, setHeroFactIndex] = useState(0);
  const [showHeroFact, setShowHeroFact] = useState(false);
  const [popupShownCount, setPopupShownCount] = useState(0); 

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- WALL LORE STATE ---
  const [newSubmission, setNewSubmission] = useState('');
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [wallSubmissions, setWallSubmissions] = useState([]);

  // Generic horizontal scroll function
  const scrollTrack = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleDismissPopup = () => {
    setHasDismissedPopup(true);
    sessionStorage.setItem('popup_dismissed', 'true');
    setShowScrollPopup(false);
  };

  // 1. CHECK LOGIN STATUS ON MOUNT
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const userStr = localStorage.getItem('user');
    const sessionStart = localStorage.getItem('session_start');
    
    const SESSION_LIMIT = 24 * 60 * 60 * 1000; 

    if (jwt && userStr && sessionStart) {
      const timeElapsed = Date.now() - parseInt(sessionStart);
      
      if (timeElapsed > SESSION_LIMIT) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('session_start');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        try {
          const userObj = JSON.parse(userStr);
          setUserName(userObj.name || userObj.username.split(' ')[0] || 'Student');
        } catch (e) { console.error(e); }
      }
    }
  }, []);

  // 2. FETCH REAL CHALLENGES & WALL LORE FROM STRAPI
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const oppsResponse = await axios.get(`${API_URL}/api/challenges`);
        const fetchedOpps = oppsResponse.data.data.map(item => {
          const attr = item.attributes || item; 

          let plainTextDescription = attr.description;
          if (Array.isArray(attr.description)) {
            plainTextDescription = attr.description
              .map(block => block.children ? block.children.map(child => child.text).join('') : '')
              .join('\n');
          }

          const compNameStr = attr.company || '';
          const compNameLower = compNameStr.toLowerCase();
          
          let finalLogoUrl = attr.logoUrl;
          if (!finalLogoUrl) {
            if (compNameLower.includes('nuvoco')) finalLogoUrl = nuvocoLogo;
            else if (compNameLower.includes('srmb')) finalLogoUrl = srmbLogo;
            else if (compNameLower.includes('ingenx') || compNameLower.includes('ingenuityx')) finalLogoUrl = ingenxLogo;
            else if (compNameLower.includes('trootech')) finalLogoUrl = trootechLogo;
            else finalLogoUrl = null;
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
            tags: [`#${attr.category}`, attr.type], 
          };
        });
        
        // --- INJECT ALL DUMMY CHALLENGES HERE ---
        const DUMMY_CHALLENGES = [
          {
            id: "dummy-eveready-1",
            title: "Keep It Lit",
            company: "Eveready",
            logoUrl: null,
            bgImage: evereadyBg,
            type: "Innovation Project",
            category: "Innovation",
            duration: "4 Weeks",
            points: "Internship + ₹50,000",
            description: "Reinvent portable lighting for rural and everyday India. Design a robust, affordable, and sustainable portable lighting solution that addresses the unique challenges of rural electrification and everyday utility.",
            deadline: "Oct 30, 2026",
            tags: ["#Innovation", "Product Design", "Sustainability"]
          },
          {
            id: "dummy-trootech-1",
            title: "TrooTech 2030: The Identity Problem",
            company: "TrooTech Business Solutions",
            logoUrl: trootechLogo,
            bgImage: trootechPosterBg,
            type: "Innovation Challenge",
            category: "Innovation",
            duration: "5 Weeks",
            points: "Pre-Placement Interview",
            description: "TrooTech is a 350+ person AI company with an ambitious 2030 vision. The problem? Their brand story needs an identity shift. Innovate, collaborate, and change the game in this challenge built for the next generation of thinkers. Ideas today. Impact tomorrow.",
            deadline: "Oct 28, 2026",
            tags: ["#Innovation", "Brand Identity", "AI"]
          },
          {
            id: "dummy-ingenuityx-1",
            title: "Market InGenuityX. Seriously.",
            company: "InGenuityX",
            logoUrl: ingenxLogo,
            bgImage: ingenxPosterBg,
            type: "Competition",
            category: "Marketing",
            duration: "3 Weeks",
            points: "PPO Available",
            description: "We connect India's sharpest Gen-Z students with real brand challenges. But here's the thing — we need YOUR help to market us. A marketing challenge for the bold and the brilliant. Pitch the ultimate growth and brand strategy for InGenuityX itself.",
            deadline: "Oct 25, 2026",
            tags: ["#Marketing", "Growth Strategy", "B2C"]
          },
          {
            id: "dummy-legrand-1",
            title: "Power Protocol",
            company: "Legrand",
            logoUrl: null,
            bgImage: legrandBg,
            type: "Tech Hackathon",
            category: "Tech",
            duration: "3 Weeks",
            points: "₹1,00,000 + Tech Setup",
            description: "AI Ready Data Centre Power Challenge. Design the next generation of intelligent, energy-efficient power distribution systems capable of sustaining high-density AI data centers.",
            deadline: "Oct 20, 2026",
            tags: ["#Tech", "AI", "Data Centers"]
          },
          {
            id: "dummy-nuvoco-1",
            title: "Grey 2 Green",
            company: "Nuvoco",
            logoUrl: nuvocoLogo,
            bgImage: nuvocoGreenBg,
            type: "Sustainability Project",
            category: "Sustainability",
            duration: "4 Weeks",
            points: "PPI + ₹50,000",
            description: "Green Cement and Decarbonisation Systems. Develop innovative strategies to drastically reduce the carbon footprint in cement manufacturing and supply chains.",
            deadline: "Oct 18, 2026",
            tags: ["#Sustainability", "Green Tech"]
          },
          {
            id: "dummy-srmb-1",
            title: "Solid Shift Challenge",
            company: "SRMB",
            logoUrl: srmbLogo,
            bgImage: srmbShiftBg,
            type: "Innovation Challenge",
            category: "Design",
            duration: "5 Weeks",
            points: "₹75,000 Pool",
            description: "Reimagine Advanced Materials and Smart Concrete. Pitch a revolutionary approach to building materials that adapt to environmental stress and increase longevity.",
            deadline: "Oct 25, 2026",
            tags: ["#Design", "Smart Materials"]
          },
          {
            id: "dummy-srmb-2",
            title: "Sustainable Green Pro",
            company: "SRMB",
            logoUrl: srmbLogo,
            bgImage: srmbGreenProBg,
            type: "Sustainability Project",
            category: "Sustainability",
            duration: "3 Weeks",
            points: "PPO + ₹25,000",
            description: "Building a Greener Tomorrow. Stronger Together. Propose actionable, closed-loop recycling processes for steel manufacturing to eliminate industrial waste.",
            deadline: "Oct 12, 2026",
            tags: ["#Sustainability", "Recycling"]
          },
          {
            id: "dummy-srmb-3",
            title: "Ironclad Challenge",
            company: "SRMB",
            logoUrl: srmbLogo,
            bgImage: srmbIroncladBg,
            type: "Marketing Campaign",
            category: "Marketing",
            duration: "4 Weeks",
            points: "Internship + ₹40,000",
            description: "Design a robust go-to-market and brand positioning strategy to solidify SRMB as the undeniable leader in resilient construction materials for Gen-Z homeowners.",
            deadline: "Oct 22, 2026",
            tags: ["#Marketing", "Brand Strategy"]
          },
          {
            id: "dummy-illustrative-123",
            title: "Next-Gen Smile Challenge",
            company: "NovaCare (Illustrative)",
            logoUrl: null, 
            bgImage: colgateBg, 
            type: "Marketing Campaign",
            category: "Marketing",
            duration: "4 Weeks",
            points: "PPO + ₹50,000",
            description: "Oral care is seen as a chore. NovaCare wants to make it a lifestyle. Gen-Z is getting swayed by aesthetic DTC brands—your job is to make the OG brand iconic again.",
            deadline: "Oct 15, 2026",
            tags: ["#Marketing", "Marketing Campaign"]
          }
        ];
        
        setOpportunities([...DUMMY_CHALLENGES, ...fetchedOpps]);

        const wallResponse = await axios.get(`${API_URL}/api/wall-lores?sort=createdAt:desc`);
        const fetchedLores = wallResponse.data.data.map(item => ({
          id: item.documentId || item.id,
          text: item.text || item.attributes?.text,
          reactions: { '💀 too real': 0, 'felt.': 0, 'same bro': 0, 'bro cooked': 0 }
        }));
        
        if (fetchedLores.length > 0) {
          setWallSubmissions(fetchedLores);
        } else {
          setWallSubmissions([
            { text: "Never challenged for real-world skills.", reactions: { '💀 too real': 23, 'felt.': 18, 'same bro': 31 } },
            { text: "My internship was mostly Canva & random calls.", reactions: { '💀 too real': 45, 'felt.': 29, 'bro cooked': 12 } }
          ]);
        }
      } catch (error) {
        console.error("Error fetching platform data:", error);
      } finally {
        setIsLoadingOpps(false);
      }
    };

    fetchPlatformData();
  }, []);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('session_start');
    
    setIsLoggedIn(false);
    setUserName('');
    setShowLogoutModal(false);
    window.location.reload(); 
  };

  const heroSlides = [
    { title: 'Your "I made it" era starts here.', subtitle: "Let's kickstart your best career decision moments…", image: heroImage2 },
    { title: 'What if your next assignment... was for your favourite brand?', subtitle: 'They are looking for their next superstars, ready to get noticed by them?', image: heroImage3 },
    { isCustom: true, image: billboardImage },
    { title: 'Picture abhi baaki hai, mere dost.', subtitle: 'Aur tumhara breakthrough bhi.', microcopy: 'Main character arc loading... 🎬', image: heroImage2 }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval); 
  }, [heroSlides.length]);

  const didYouKnows = [
    { text: "The average resume gets 6-7 seconds of HR attention in the first pass. Six. Seconds. The real screening happens in the conversation after — which means how you talk about your work matters infinitely more than bullet points.", tag: "READ THAT AGAIN" },
    { text: "73% of hiring managers say they can't find candidates with \"real-world problem-solving skills\" — despite millions of graduates every year. The gap isn't your degree. It's your exposure.", source: "LinkedIn Global Talent Trends" },
    { text: "In most big companies, the idea that gets implemented is rarely the smartest one. It's the one that had the best internal sponsor. Learning to \"sell\" your idea is a skill.", tag: "THE CORPORATE GAME IS REAL" },
    { text: "Many companies hire fresh graduates specifically for brand challenges because they want unconditioned thinking — perspectives that haven't been filtered by 10 years of corporate norms.", tag: "TIMESTAMP THIS" }
  ];

  const handleCloseFact = () => {
    setShowHeroFact(false);
    if (popupShownCount === 1) {
      setTimeout(() => {
        setHeroFactIndex((prev) => (prev + 1) % didYouKnows.length);
        setShowHeroFact(true);
        setPopupShownCount(2); 
      }, 120000); 
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      
      // 85% Scroll Threshold for Registration Popup
      if (scrollPercent >= 85 && !showScrollPopup && !hasDismissedPopup && !isLoggedIn) {
        setShowScrollPopup(true);
      }
      
      // 25% Scroll Threshold for Did You Know Popup
      if (scrollPercent >= 25 && popupShownCount === 0) {
        setShowHeroFact(true);
        setPopupShownCount(1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollPopup, hasDismissedPopup, isLoggedIn, popupShownCount]);

  const handleWallSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (newSubmission.trim()) {
      const jwt = localStorage.getItem('jwt');
      try {
        await axios.post(`${API_URL}/api/wall-lores`, {
          data: { text: newSubmission, publishedAt: null }
        }, { headers: { Authorization: `Bearer ${jwt}` } });

        setNewSubmission('');
        setShowSubmitMessage(true);
        setTimeout(() => setShowSubmitMessage(false), 4000);
      } catch (err) {
        console.error("Error submitting to wall:", err);
      }
    }
  };

  const handleReaction = (submissionIndex, reactionType) => {
    const updated = [...wallSubmissions];
    if (!updated[submissionIndex].reactions[reactionType]) updated[submissionIndex].reactions[reactionType] = 0;
    updated[submissionIndex].reactions[reactionType]++;
    setWallSubmissions(updated);
  };

  const categories = [
    { title: 'Marketing & Business', quote: '"Pooja… what is this (consumer) behaviour?"', tagline: 'Brand strategy, GTM, consumer research, corporate yapping — the real ones know.', route: '/marketing-business', colors: 'bg-[#2E73E6] text-white', quoteColor: 'text-white/90', taglineColor: 'text-white/90' },
    {  title: 'Innovation Challenges', quote: '"For that one bro who thinks he can be the next Elon Musk after one cool idea."', tagline: "Okay but what if your idea is actually good? Here's your structured shot at proving it.", route: '/innovation', colors: 'bg-[#E92A39] text-white', quoteColor: 'text-white/90', taglineColor: 'text-white/90' },
    { title: 'Tech & Hackathons', quote: '"Placement ke pehle thoda iconic bhi ban jao."', tagline: 'Build something that actually works, in 24-48 hours, on 3 hours of sleep and 2 cups of chai. The classic origin story.', route: '/tech-hackathons', colors: 'bg-[#FDE25D] text-[#111]', quoteColor: 'text-[#111]/90', taglineColor: 'text-[#111]/90' },
    {  title: 'Sustainability', quote: '"Basically Earth\'s unpaid PR team."', tagline: 'Someone has to care. Might as well be the person who will eventually manage a brand that affects millions of people. Start now.', route: '/sustainability', colors: 'bg-[#3BA8E7] text-white', quoteColor: 'text-white/90', taglineColor: 'text-white/90' },
    {  title: 'Creativity', quote: '"For our \'Can we make it pop more?\' trauma survivors."', tagline: "If you've ever redesigned a deck at 2AM and felt nothing — this is your therapy. Except it pays (or gets you hired).", route: '/creativity', colors: 'bg-[#FB607E] text-white', quoteColor: 'text-white/90', taglineColor: 'text-white/90' }
  ];
  
  const steps = [
    { number: 1, title: 'REGISTER', quote: '"It all started with one harmless click."', description: 'Welcome to the first best decision of your career.', image: campusRegistration },
    { number: 2, title: 'PICK YOUR CHALLENGES', quote: 'See a brand brief.\nGet unnecessarily excited.\nPick the one that makes your brain go: "wait… this is actually cool."', didYouKnow: "💡 Most Fortune 500 companies hire more from campus challenges and competitions than from traditional campus recruitment.", image: registeredImage },
    { number: 3, title: 'WORK WORK WORK WORK ', quote: '"Rihanna warned us."', description: 'Start working on the brief…the real challenge begins from this step onwards', didYouKnow: '💡 McKinsey found that students who work on real business problems — not simulations — are 3x more likely to land their target roles.', image: null },
    { number: 4, title: 'SUBMISSIONS', quote: '"Submit the Final_FINAL_v27_REAL.pdf"', description: "The file is ready. It has been ready for 3 hours. You've opened it 11 times since then just to check. It's fine. Submit it. Let go. You did that.", image: null },
    { number: 5, title: 'WAITING FOR SHORTLISTS', quote: '"Aaj results aayenge. Refresh. Refresh. Refresh."', didYouKnow: '💡 Companies typically receive 200–500 submissions per challenge. Making it to shortlists puts you in the top 5–10% of applicants.', image: null },
    { number: 6, title: 'FINAL ROUND PREP ', quote: '"Good morning respected jury…" final boss arc.', description: "You made it past the first filter. Now the actual game begins. Tighten your deck. Sharpen your narrative.", image: groupDiscussion },
    { number: 7, title: 'GRAND FINALE PRESENTATIONS', quote: '"Absolute cinema."', description: 'Present in front of real company executives.', didYouKnow: '💡 Most students who present at brand-level competitions report it as the most confidence-defining experience of their college life.', image: stagePresentation },
    { number: 8, title: 'WINNING CEREMONY + MAGAZINE FEATURE', quote: '"Be the campus celebrity overnight."', description: "Your name. In print. Literally. InGenuityX features winners in their editorial.", image: winningMoment },
    { number: 9, title: 'CAREER OPPORTUNITY ARC', quote: '"The real ROI of participating."', description: 'Shortlists, interviews, PPO conversations, internships, and portfolio proof — depending on the challenge outcome.', image: certificateImage }
  ];

  const stepColors = [
    'bg-[#2E73E6]/5 border-[#2E73E6]/20', 
    'bg-[#FB607E]/5 border-[#FB607E]/20', 
    'bg-[#FDE25D]/10 border-[#FDE25D]/40', 
    'bg-[#3BA8E7]/5 border-[#3BA8E7]/20', 
    'bg-[#FB9AB5]/10 border-[#FB9AB5]/40', 
    'bg-[#E92A39]/5 border-[#E92A39]/20'
  ];

  const hrMistakes = [
    { percent: '97%', title: 'Indian introductions have had the same software update since 2009.', quote: '"Myself Rahul. I am passionate, hardworking and a quick learner…"', punchline: 'Bro this intro has more sequels than Fast & Furious.' },
    { percent: '84%', title: 'Indian resumes still running on Windows XP energy.', details: '"Microsoft Word ⭐⭐⭐⭐⭐"\n"PowerPoint ⭐⭐⭐⭐"\n"Canva ⭐⭐⭐⭐⭐"', punchline: 'Bhai Canva toh ab breathing skill category mein aata hai 😭' },
    { percent: '73%', title: "Mass applying everywhere like it's Big Billion Day sale.", details: 'LinkedIn. Naukri. Internshala. Cold mails. Carrier pigeons.\nJD says: "Looking for a backend developer."\nBro applying with Canva + "good communication skills"', punchline: '' },
    { percent: '91%', title: '"I\'m deeply passionate about your company."', details: 'Interviewer: "So what do we actually do?"\nCandidate:\n"Aree… innovation… technology… growth… ecosystem…"', punchline: 'Basically saying absolutely nothing with full confidence like a Bollywood politician speech. 💀' },
    { percent: '67%', title: "Students still using 'quick learner' like it's an Infinity Stone.", details: 'Bro the market moved to AI agents and automation.\nMeanwhile candidates:\n"Sir I can learn quickly if trained 🥺"\nChatGPT and Claude: "yeh toh hum ek prompt mein kar lenge"', punchline: '' },
    { percent: '88%', title: "In the resume the 'Wolf of the Wall Street' mode gets on.", details: '"I can do 120 sales calls/day."\n"Can generate 50 reel ideas daily."\n"Can onboard 40 clients monthly."\nReal interview:\nOne unexpected client call comes in and bro stares at the ringing phone thinking\n"Yeh mere saath prank ho raha hai kya?" 💀', punchline: '' }
  ];

  const confessions = [
    { text: '"Never challenged for real-world skills."', tags: ['ACADEMIC BUBBLE', 'CAMPUS REALITY CHECK'] },
    { text: '"My internship was mostly Canva & random calls."', tags: ['INTERNSHIP ERA', 'CORPORATE NPC ARC'] },
    { text: '"We have certificates. Not clarity."', tags: ['PLACEMENT PANIC', 'CREDENTIAL COLLECTOR'] },
    { text: '"Everyone says upskill. Nobody explains how."', tags: ['AI FEAR', 'LOST IN THE NOISE'] },
    { text: '"Our exposure feels outdated."', tags: ['SYLLABUS GAP', 'REAL WORLD VS COLLEGE'] },
    { text: '"Too qualified for internships. Too inexperienced for jobs."', tags: ['PLACEMENT PANIC', 'THE CRUEL PARADOX'] }
  ];

  const confessionStyles = [
    { bg: 'bg-[#2E73E6]', text: 'text-white', tagBg: 'bg-white/20 text-white' },
    { bg: 'bg-[#FDE25D]', text: 'text-[#111]', tagBg: 'bg-black/10 text-[#111]' },
    { bg: 'bg-[#FB607E]', text: 'text-white', tagBg: 'bg-white/20 text-white' },
    { bg: 'bg-[#3BA8E7]', text: 'text-white', tagBg: 'bg-white/20 text-white' },
    { bg: 'bg-[#126769]', text: 'text-white', tagBg: 'bg-white/20 text-white' }, 
    { bg: 'bg-[#E92A39]', text: 'text-white', tagBg: 'bg-white/20 text-white' },
  ];

  const filters = ['All', 'Internships', 'Competitions', 'Projects', 'PPO', 'Remote', 'Paid', 'Tech', 'Marketing', 'Design', 'Business', 'Content'];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesFilter = activeFilter === 'All' || opp.type === activeFilter || opp.category === activeFilter || (activeFilter === 'PPO' && opp.points?.includes('PPO'));
    const matchesSearch = searchQuery === '' ||
      opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Split out the first 4 for the slider if not showing all
  const displayedOpportunities = showAllVault ? filteredOpportunities : filteredOpportunities.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] font-sans overflow-x-hidden animate-fade-in-global relative selection:bg-[#E92A39] selection:text-white" data-testid="home-page">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }
        
        [id*="emergent"], [class*="emergent"], a[href*="emergent"] {
          display: none !important; opacity: 0 !important; pointer-events: none !important;
        }

        @keyframes fadeInGlobal { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-global { animation: fadeInGlobal 0.5s ease-out forwards; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* NAVBAR (Dynamic Transparency) */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 md:px-12 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
        <div className="flex items-center group" data-testid="hero-logo">
          <div className={`transition-all duration-500 flex items-center justify-center ${!isScrolled ? 'bg-white px-6 py-3 rounded-[1.5rem] shadow-2xl -ml-2 md:ml-0' : ''}`}>
            <img 
              src={logoImage} 
              alt="InGenuityX" 
              className={`w-auto object-contain cursor-pointer transition-all duration-500 hover:scale-110 ${!isScrolled ? 'h-10 md:h-12 scale-[1.5] md:scale-[1.8]' : 'h-6 md:h-8 scale-[1.3] md:scale-[1.5]'}`} 
            />
          </div>
        </div>

        <div className={`hidden md:flex items-center gap-10 text-sm font-bold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
          <a href="#opportunities" className={`transition-colors ${isScrolled ? 'hover:text-[#E92A39]' : 'hover:text-white'}`}>Opportunities</a>
          <Link to="/about" className={`transition-colors ${isScrolled ? 'hover:text-[#E92A39]' : 'hover:text-white'}`}>About Us</Link>
          <Link to="/contact" className={`transition-colors ${isScrolled ? 'hover:text-[#E92A39]' : 'hover:text-white'}`}>Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className={`font-bold hidden md:block text-sm transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>Hey, {userName}</span>
              <button 
                onClick={handleLogoutClick}
                className={`px-5 py-2.5 rounded-full font-bold transition-colors text-sm shadow-sm ${isScrolled ? 'bg-gray-100 hover:bg-gray-200 text-black' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20'}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`font-bold transition-colors text-sm ${isScrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white'}`}>
                Log In
              </Link>
              <button 
                disabled
                className={`bg-gray-400 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm cursor-not-allowed`}
              >
                Registration opens 27th July
              </button>
            </>
          )}
        </div>
      </nav>

      {/* FULL SCREEN HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black" data-testid="hero-section">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0">
              <ImageWithFallback src={slide.image} alt={slide.title || "Hero Image"} className="w-full h-full object-cover opacity-80 object-right md:object-center" />
              {/* Dark overlay ensuring text and nav readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
            </div>
            
            {/* Content Container */}
            <div className="relative z-20 h-full max-w-[1600px] mx-auto flex flex-col justify-center px-6 md:px-12 lg:px-20 w-full pt-16">
              <div className="w-full lg:w-4/5 xl:w-3/5">
                
                {/* CONDITIONAL RENDER: Custom Marketing Slide vs Default Slides */}
                {slide.isCustom ? (
                  <>
                    <span className="text-[#E92A39] text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4 block drop-shadow-sm">
                      Marketing & Business
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight mb-6 leading-[1.05] text-white drop-shadow-md">
                      Duniya ke sabse bade brands <br/>
                      ke <br/>
                      <span className="text-[#E92A39]">sabse bade problems.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/70 italic mb-10 font-bold drop-shadow-sm">
                      Yours to crack.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight mb-6 leading-[1.05] text-white drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-xl leading-relaxed font-bold drop-shadow-sm">
                      {slide.subtitle}
                    </p>
                  </>
                )}

                <button onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#E92A39] text-white px-10 py-5 rounded-full text-base font-bold w-fit hover:scale-105 hover:bg-[#ff3b4b] transition-all duration-300 shadow-xl border border-[#E92A39]">
                  Explore Live Challenges
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-2">
          <button onClick={prevSlide} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#2E73E6] text-white w-12 h-12 flex items-center justify-center rounded-full transition-colors font-bold shadow-sm">←</button>
          <button onClick={nextSlide} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#2E73E6] text-white w-12 h-12 flex items-center justify-center rounded-full transition-colors font-bold shadow-sm">→</button>
        </div>
      </section>

      {/* CREDIBILITY PROOF STRIP */}
      <ScrollReveal direction="up">
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mt-12 mb-16 relative z-20">
          <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {[
              { value: '130+', label: 'Students surveyed' },
              { value: '5', label: 'Challenge themes' },
              { value: 'Live', label: 'Brand briefs' },
              { value: 'PPO', label: 'Career-linked opportunities' },
            ].map((stat, index) => (
              <div key={index} className="py-4 px-6 md:py-5 md:px-8 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-black text-[#111] leading-none">{stat.value}</h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* WHY INGENUITYX SECTION */}
      <section className="py-24 px-4 md:px-8 bg-white relative z-10">
        <ScrollReveal direction="up">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                Not just listings. Real career signals.
              </h2>
              <p className="text-lg text-gray-600 font-bold">
                InGenuityX helps students move from passive applications to real brand-backed proof of work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ['Real Brand Briefs', 'Work on problems connected to actual companies, campaigns, and markets.'],
                ['Proof-of-Work Portfolio', 'Every submission becomes evidence of your thinking, creativity, and execution.'],
                ['Shortlist Visibility', 'Stand out through ideas, not just resume keywords.'],
                ['Career Pathways', 'Unlock internships, interviews, PPO conversations, and winner features.'],
              ].map(([title, desc], index) => (
                <div key={index} className="p-8 rounded-[2rem] bg-[#FAFCFC] border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[#E92A39] text-sm font-black">0{index + 1}</span>
                  <h3 className="text-2xl font-black mt-4 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm font-semibold leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 THEMES SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden relative z-10 mb-8">
        <ScrollReveal direction="up">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-black px-2">5 Themes. Pick your arena.</h3>
        </ScrollReveal>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 md:grid md:grid-cols-5 md:gap-6 md:pb-0 items-stretch">
          {categories.map((category, index) => (
            <div key={index} className="min-w-[280px] md:min-w-0 shrink-0 flex flex-col">
              <ScrollReveal direction="up" delay={index * 100} width="100%" className="flex-1 flex flex-col">
                <Link to={category.route} className={`flex-1 flex flex-col p-8 rounded-[2.5rem] transition-transform duration-300 hover:scale-[1.02] relative shadow-sm ${category.colors}`}>
                  <h4 className="text-2xl font-bold tracking-tight mb-4">{category.title}</h4>
                  <p className={`text-[15px] italic mb-6 font-medium ${category.quoteColor}`}>"{category.quote.replace(/"/g, '')}"</p>
                  <p className={`text-[14px] leading-relaxed font-medium ${category.taglineColor}`}>{category.tagline}</p>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* THE CHALLENGE VAULT */}
      <section id="opportunities" className="py-24 relative overflow-hidden z-10 bg-[#FFF8E7] rounded-[3rem] mx-2 md:mx-4 mb-16 shadow-inner">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-black">The Challenge Vault</h2>
                <p className="text-lg md:text-xl text-gray-800 max-w-2xl font-bold">Live brand briefs, competitions, projects, and PPO-linked opportunities. Pick a live brief. Build your proof. Get noticed.</p>
              </div>
              
              <div className="flex items-center bg-white border border-gray-200 shadow-sm rounded-full px-5 py-3 w-full md:w-[400px]">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input type="text" placeholder="Search challenges, brands..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-sm text-black font-bold focus:outline-none w-full placeholder:text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 px-1 w-full md:w-auto">
                {filters.map(filter => (
                  <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-all ${activeFilter === filter ? 'bg-[#E92A39] text-white shadow-md scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#3BA8E7] hover:text-[#3BA8E7] hover:bg-[#3BA8E7]/5'}`}>
                    {filter}
                  </button>
                ))}
              </div>

              {/* SCROLL BUTTONS FOR VAULT */}
              {!showAllVault && filteredOpportunities.length > 4 && (
                <div className="hidden md:flex items-center gap-2 shrink-0 pr-2">
                  <button onClick={() => scrollTrack(vaultScrollRef, 'left')} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center font-black text-gray-600 hover:text-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">←</button>
                  <button onClick={() => scrollTrack(vaultScrollRef, 'right')} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center font-black text-gray-600 hover:text-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">→</button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {isLoadingOpps ? (
             <div className="flex flex-col items-center justify-center py-32">
               <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2E73E6] rounded-full animate-spin mb-6"></div>
               <p className="text-sm font-bold tracking-widest uppercase text-gray-800">Loading live challenges...</p>
             </div>
          ) : filteredOpportunities.length === 0 ? (
            <ScrollReveal direction="up">
              <div className="text-center py-32 bg-white border border-gray-200 rounded-[2rem] shadow-sm">
                <p className="text-gray-800 text-sm font-bold">No matches yet. Try another theme or check back for new challenge drops.</p>
              </div>
            </ScrollReveal>
          ) : null}

          {/* Dynamic Container: Horizontal Slider (default) OR Grid View (if toggled) */}
          <div 
            ref={vaultScrollRef}
            className={showAllVault ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch" : "flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-8 snap-x snap-mandatory items-stretch"}
          >
            {displayedOpportunities.map((opp, i) => {
              // Check if it has a custom background image uploaded, otherwise use universal abstract background
              const cardBg = opp.bgImage || PLACEHOLDER_BG;

              return (
                <div 
                  key={opp.id} 
                  className={!showAllVault ? "w-[85vw] sm:w-[320px] md:w-[340px] shrink-0 snap-center flex flex-col" : "w-full flex flex-col"}
                >
                  <ScrollReveal direction="up" delay={(i % 4) * 100} width="100%" className="flex-1 flex flex-col">
                    <div 
                      onClick={() => navigate(`/opportunity/${opp.id}`)}
                      className="relative rounded-[2.5rem] shadow-sm transition-all duration-300 cursor-pointer flex flex-col flex-1 min-h-[560px] group hover:shadow-2xl overflow-hidden bg-black"
                    >
                      {/* UNIVERSAL BACKGROUND IMAGE (with Blur Fallback to prevent cropping) */}
                      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                        {/* Blurred backing to fill ratio gaps */}
                        <img src={cardBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 blur-xl scale-110" />
                        {/* Contained foreground image so logos never crop */}
                        <img src={cardBg} alt="Background" className="absolute inset-0 w-full h-full object-contain object-top" />
                      </div>
                      
                      {/* Default Bottom Gradient (for the default Explore button visibility) */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent z-0 transition-opacity duration-300 group-hover:opacity-0 hidden md:block"></div>

                      {/* HOVER OVERLAY (Dark Frosted Glass) */}
                      <div className="absolute inset-0 bg-black/70 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hidden md:block"></div>

                      {/* --- CONTENT (Desktop: Hover Reveal / Mobile: Always Visible) --- */}
                      
                      {/* 1. DESKTOP ONLY HOVER REVEAL */}
                      <div className="hidden md:flex relative z-10 flex-col h-full p-6 justify-end transition-all duration-500 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0">
                        {/* Top Badges */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex gap-2 flex-wrap">
                            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-sm">
                              {opp.type}
                            </span>
                            {opp.points?.includes('PPO') && (
                              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-sm">
                                PPO Pathway
                              </span>
                            )}
                            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#10b981]/80 text-white backdrop-blur-md shadow-sm">
                              Applications Open
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors shrink-0 ml-2 bg-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md shadow-sm">↗</div>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-black tracking-tight mb-4 leading-tight text-white drop-shadow-md">{opp.title}</h3>
                        
                        {/* COMPANY LOGO & NAME */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white shadow-md flex items-center justify-center border border-white/20">
                            {opp.logoUrl ? (
                              <img src={opp.logoUrl} alt={opp.company} className="w-full h-full object-contain scale-[1.15]" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#111] bg-gray-50">
                                {opp.company ? opp.company.charAt(0).toUpperCase() : 'X'}
                              </div>
                            )}
                          </div>
                          <p className="text-base font-bold m-0 leading-none text-white drop-shadow-sm">
                            {opp.company}
                            <span className="ml-2 text-xs inline-flex items-center text-[#3BA8E7]">
                              ✓ <span className="uppercase tracking-wider ml-1 text-[10px] text-white/80">Verified</span>
                            </span>
                          </p>
                        </div>

                        {/* Team Size & Level */}
                        <div className="flex gap-2 mb-4">
                          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full border bg-white/10 text-white/90 border-white/20 backdrop-blur-sm shadow-sm">Team 1-4</span>
                          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full border bg-white/10 text-white/90 border-white/20 backdrop-blur-sm shadow-sm">Beginner Friendly</span>
                        </div>

                        {/* Reward & Meta box */}
                        <div className="flex flex-col gap-1 mb-6 p-5 rounded-2xl border bg-white/10 border-white/20 backdrop-blur-md shadow-inner">
                          <span className="text-lg font-black text-white drop-shadow-sm">{opp.points}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-white/70">{opp.duration} • {opp.deadline}</span>
                        </div>
                        
                        {/* CTA Button */}
                        <button disabled className="w-full text-xs font-extrabold flex items-center justify-center gap-2 px-5 py-4 rounded-xl shadow-lg transition-all duration-300 bg-gray-300 text-gray-700 mt-auto cursor-not-allowed">
                          ⏳ Registrations Open 27th July
                        </button>

                        {/* Description Preview */}
                        <p className="text-xs line-clamp-2 leading-relaxed mt-4 font-medium text-white/70">{opp.description}</p>
                      </div>

                      {/* 2. MOBILE ONLY PERSISTENT CONTENT */}
                      <div className="absolute inset-x-0 bottom-0 p-6 z-10 md:hidden flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-32">
                        <h3 className="text-2xl font-black text-white mb-1 leading-tight drop-shadow-sm">{opp.title}</h3>
                        <p className="text-white/80 text-sm font-bold mb-5 drop-shadow-sm">{opp.company}</p>
                        <button disabled className="w-full bg-gray-300 text-gray-700 py-4 rounded-xl font-extrabold text-xs shadow-lg cursor-not-allowed">
                          ⏳ Registrations Open 27th July
                        </button>
                      </div>

                      {/* --- DEFAULT VISIBLE STATE (Desktop Idle Button) --- */}
                      <div className="absolute inset-x-6 bottom-6 z-10 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:translate-y-8 pointer-events-none hidden md:block">
                        <button disabled className="w-full text-sm font-extrabold flex items-center justify-center gap-2 px-4 py-4 rounded-xl shadow-2xl transition-all duration-300 bg-gray-300 text-gray-700 border border-gray-400 cursor-not-allowed">
                          ⏳ Registrations Open 27th July
                        </button>
                      </div>

                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC VIEW ALL / HIDE BUTTONS */}
          {filteredOpportunities.length > 4 && (
            <ScrollReveal direction="up" delay={200}>
              <div className="flex justify-center mt-10">
                {!showAllVault ? (
                  <button 
                    onClick={() => setShowAllVault(true)} 
                    className="bg-[#111] hover:bg-black text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-md flex items-center gap-2"
                  >
                    View All {filteredOpportunities.length} Opportunities →
                  </button>
                ) : (
                  <button 
                    onClick={() => { 
                      setShowAllVault(false);
                      document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="bg-white border border-gray-200 text-[#111] hover:bg-gray-50 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-sm flex items-center gap-2"
                  >
                    ← Collapse Vault
                  </button>
                )}
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      {/* CAMPUS TO BOARDROOM - MINIATURIZED HORIZONTAL TIMELINE */}
      <section className="py-24 px-4 md:px-8 relative border-t border-gray-200 overflow-hidden z-10 bg-white" data-testid="campus-section">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 max-w-3xl mx-auto relative">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-black">Campus Se Boardroom Tak</h2>
              <p className="text-xl text-gray-600 font-bold leading-relaxed">From your first challenge submission to real brand visibility, finalist moments, and career opportunities.</p>
              
              {/* SCROLL BUTTONS FOR TIMELINE */}
              <div className="hidden md:flex justify-center gap-4 mt-8">
                <button onClick={() => scrollTrack(timelineScrollRef, 'left')} className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center font-black text-gray-600 hover:text-black hover:bg-gray-50 transition-all shadow-sm active:scale-95 text-lg">←</button>
                <button onClick={() => scrollTrack(timelineScrollRef, 'right')} className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center font-black text-gray-600 hover:text-black hover:bg-gray-50 transition-all shadow-sm active:scale-95 text-lg">→</button>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative w-full overflow-hidden">
            {/* The Horizontal Line for Desktop */}
            <div className="absolute top-[26px] left-0 w-[200%] h-1 bg-gradient-to-r from-[#2E73E6] via-[#FB607E] to-[#FDE25D] hidden md:block z-0"></div>

            {/* The Scrollable Container */}
            <div 
              ref={timelineScrollRef}
              className="flex flex-col md:flex-row overflow-x-auto hide-scrollbar gap-4 pb-12 snap-x px-2 relative z-10 items-stretch"
            >
              
              {/* Fallback vertical line for mobile */}
              <div className="absolute top-0 bottom-0 left-[26px] w-1 bg-gradient-to-b from-[#2E73E6] via-[#FB607E] to-[#FDE25D] md:hidden z-0"></div>

              {steps.map((step, index) => {
                const currentStyle = stepColors[index % stepColors.length];
                
                return (
                  <div key={index} className="relative flex flex-col min-w-full sm:min-w-[200px] md:min-w-[160px] lg:min-w-[190px] shrink-0 snap-center group pl-12 md:pl-0 pt-0 md:pt-4 mb-6 md:mb-0">
                    
                    {/* The Dot Node (Shrunk) */}
                    <div className="absolute left-[16px] md:left-1/2 top-4 md:top-[0px] w-5 h-5 rounded-full border-4 border-[#FAFCFC] bg-[#111] -translate-x-1/2 md:translate-y-0 z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>

                    <ScrollReveal direction="up" delay={index * 50} className="flex-1 flex flex-col mt-2 md:mt-6 h-full">
                      <div className={`${currentStyle} border p-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex-1 flex flex-col bg-white/60 backdrop-blur-md`}>
                        <span className="text-[#111] font-black text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-50">Step 0{step.number}</span>
                        <h3 className="text-base font-black tracking-tight mb-2 text-black leading-tight">{step.title}</h3>
                        <p className="text-gray-800 mb-3 italic text-xs font-semibold">"{step.quote.replace(/"/g, '')}"</p>
                        {step.description && <p className="text-gray-700 text-[10px] leading-relaxed mb-4 font-medium">{step.description}</p>}
                        
                        {step.didYouKnow && (
                          <div className="bg-white/80 border border-white/40 p-3 rounded-xl mt-auto shadow-sm">
                            <p className="text-[10px] text-gray-800 leading-relaxed font-bold">💡 {step.didYouKnow}</p>
                          </div>
                        )}
                        
                        {step.image && (
                          <div className="mt-4 overflow-hidden rounded-xl shadow-sm border border-white/50 mt-auto">
                            <ImageWithFallback src={step.image} alt={step.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ aspectRatio: '16/9' }} />
                          </div>
                        )}
                      </div>
                    </ScrollReveal>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WINNER SPOTLIGHT BLOCK */}
      <ScrollReveal direction="up">
        <section className="py-24 px-4 md:px-8 bg-[#111] text-white rounded-[3rem] mx-4 md:mx-8 mb-24 shadow-2xl relative overflow-hidden z-10">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#FDE25D] text-xs font-black uppercase tracking-widest">
                Winner Spotlight
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-4 mb-6">
                From campus idea to brand-room conversation.
              </h2>
              <p className="text-white/70 text-lg font-semibold leading-relaxed">
                Students who make it to finales do not just win certificates. They build stories, portfolios, confidence, and career signals.
              </p>
            </div>

            <div className="bg-white text-[#111] rounded-[3rem] p-8 md:p-10 shadow-xl">
              <p className="text-2xl font-black mb-8 leading-tight">
                “This was the first time my work felt bigger than an assignment.”
              </p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div>
                  <p className="font-black text-lg">Student Finalist</p>
                  <p className="text-sm text-gray-500 font-bold mt-1">Innovation Challenge 2026</p>
                </div>
                <span className="bg-[#E92A39]/10 text-[#E92A39] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider">
                  Finalist
                </span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* STUDENT CONFESSIONS (VIBRANT WIDGETS) */}
      <section className="py-24 px-4 md:px-8 border-t border-gray-200 overflow-hidden relative z-10" data-testid="confessions-section">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <ScrollReveal direction="left">
            <div className="mb-16 max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 uppercase leading-tight text-black">We asked 130+ Gen-Z students what's actually going on.</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confessions.map((confession, index) => {
              const currentStyle = confessionStyles[index % confessionStyles.length];
              
              return (
                <ScrollReveal key={index} direction="scale" delay={index * 100}>
                  <div className={`${currentStyle.bg} relative p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col group`}>
                    <span className={`text-4xl font-serif leading-none absolute top-6 left-6 opacity-30 ${currentStyle.text}`}>"</span>
                    <p className={`text-lg font-bold tracking-tight mb-8 relative z-10 pt-8 flex-grow ${currentStyle.text}`}>{confession.text.replace(/"/g, '')}</p>
                    <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                      {confession.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${currentStyle.tagBg}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HR INTERVIEW AURA GUIDE */}
      <section className="py-32 px-4 md:px-8 overflow-hidden relative z-10 bg-[#FFF8E5]" data-testid="hr-section">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#111]">HR Interview Aura Guide.</h2>
              <p className="text-xl text-[#111]/70 font-bold">Mistakes to avoid. Crimes against your own career. A PSA.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hrMistakes.map((mistake, index) => (
              <ScrollReveal key={index} direction="up" delay={(index % 3) * 100}>
                <div className="h-full bg-[#FBFCF4] shadow-sm p-8 rounded-[2.5rem] hover:shadow-lg transition-all duration-300 group flex flex-col hover:-translate-y-1">
                  <div className="text-5xl font-black tracking-tighter text-[#E92A39] mb-6 w-fit">{mistake.percent}</div>
                  <h4 className="text-xl font-extrabold tracking-tight mb-4 text-[#111]">{mistake.title}</h4>
                  {mistake.quote && <p className="text-[#111]/70 italic text-sm mb-6 pb-6 border-b border-[#111]/10 font-semibold">"{mistake.quote.replace(/"/g, '')}"</p>}
                  {mistake.details && <div className="text-[11px] text-[#111]/80 mb-6 whitespace-pre-line font-bold bg-white/40 p-4 rounded-2xl flex-grow border border-white/50">{mistake.details}</div>}
                  <div className="mt-auto pt-4">
                    {mistake.punchline && <p className="text-sm font-bold text-[#E92A39] flex items-start gap-2"><span>⚠️</span> {mistake.punchline}</p>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW CORPORATE ARCADE SECTION --- */}
      <section className="py-24 px-4 md:px-8 relative border-t border-gray-200 overflow-hidden z-10 bg-[#FAFCFC]">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-4">The Corporate Arcade</h2>
              <p className="text-xl text-gray-600 font-bold leading-relaxed">Take a break. Play the game.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={0}>
              <AuraCalculator />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150}>
              <FlagGame />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <WhackAYapper />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* THE WALL */}
      <section className="py-32 px-4 md:px-8 border-t border-gray-200 relative overflow-hidden z-10" data-testid="wall-section">
        <div className="max-w-3xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black">The Wall.</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-bold">Fake internships? AI fear? Toxic hustle culture? Spill everything. This is a judgment-free zone.</p>
            </div>

            <form onSubmit={handleWallSubmit} className="mb-16 relative">
              <div className="relative bg-white border border-gray-200 shadow-sm p-2 rounded-[2rem] flex flex-col md:flex-row gap-2 focus-within:border-[#3BA8E7] transition-colors">
                <textarea 
                  value={newSubmission} 
                  onChange={(e) => setNewSubmission(e.target.value)} 
                  placeholder="Type anonymously…" 
                  className="w-full bg-transparent text-black font-bold p-5 focus:outline-none min-h-[60px] md:min-h-0 text-sm resize-none placeholder:text-gray-400" 
                />
                <button type="submit" className="w-full md:w-auto bg-[#3BA8E7] hover:bg-[#2E73E6] text-white px-8 py-4 rounded-[1.5rem] text-sm font-bold transition-colors whitespace-nowrap shadow-sm">Post Anonymously</button>
              </div>
            </form>

            {showSubmitMessage && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-12 text-center animate-slide-in shadow-sm">
                <p className="text-[#3BA8E7] font-bold text-lg">Lore Received.</p>
                <p className="text-gray-600 text-sm mt-1 font-medium">Sent to the vault for approval. It will appear once verified.</p>
              </div>
            )}

            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E92A39] animate-pulse"></span> Live Feed</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{wallSubmissions.length} Entries</span>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {wallSubmissions.map((submission, index) => (
              <ScrollReveal key={index} direction="up" delay={index > 3 ? 0 : index * 100}>
                <div className="bg-white border border-gray-200 shadow-sm p-6 md:p-8 rounded-[2.5rem]">
                  <p className="text-black text-lg leading-relaxed tracking-tight mb-6 font-bold">"{submission.text}"</p>
                  <div className="flex gap-2 flex-wrap">
                    {['💀 too real', 'felt.', 'same bro', 'bro cooked'].map((reaction) => (
                      <button key={reaction} onClick={() => handleReaction(index, reaction)} className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 bg-gray-100 hover:bg-[#2E73E6] hover:text-white text-gray-700 rounded-full transition-colors">
                        {reaction} {submission.reactions[reaction] ? <span className="ml-1 font-extrabold">{submission.reactions[reaction]}</span> : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MINIMAL EDITORIAL FOOTER */}
      <footer className="py-16 px-6 md:px-12 border-t border-gray-200 bg-white relative z-10">
        <ScrollReveal direction="up">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            
            <div className="md:col-span-2 flex flex-col items-start gap-8">
              <ImageWithFallback 
                src={logoImage} 
                alt="InGenuityX Logo" 
                className="h-10 md:h-14 w-auto object-contain opacity-90 scale-[1.5] md:scale-[1.8] origin-left" 
              />
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-bold">Bridging the gap between Gen Z talent and brand briefs. Stop simulating. Start building.</p>
            </div>

            <div className="flex flex-col">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Platform</h4>
              <div className="flex flex-col space-y-4 text-black text-sm font-bold">
                <Link to="/" className="hover:text-[#E92A39] transition-colors w-fit">Home</Link>
                <Link to="/about" className="hover:text-[#E92A39] transition-colors w-fit">About Us</Link>
                <Link to="/contact" className="hover:text-[#E92A39] transition-colors w-fit">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex flex-col space-y-4 text-sm font-bold text-black">
                <a href="mailto:storm@minervainnov.com" className="hover:text-[#E92A39] transition-colors w-fit">storm@minervainnov.com</a>
                <a href="tel:+918320262013" className="hover:text-[#E92A39] transition-colors w-fit">+91 8320 262 013</a>
              </div>
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">© 2026 InGenuityX. All rights reserved.</p>
          </div>
        </ScrollReveal>
      </footer>

      {/* DID YOU KNOW POPUP */}
      {showHeroFact && didYouKnows[heroFactIndex] && (
        <div className="fact-in fixed right-6 bottom-6 md:right-8 md:bottom-8 z-[100] max-w-xs w-[90%] bg-[#E92A39] rounded-[2rem] p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl drop-shadow-sm">💡</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Did you know?</p>
            </div>
            <button onClick={handleCloseFact} className="text-white/50 hover:text-white transition-colors">✕</button>
          </div>
          <p className="text-sm text-white leading-relaxed font-medium mb-4">{didYouKnows[heroFactIndex].text}</p>
          {didYouKnows[heroFactIndex].tag && (
            <span className="bg-white text-[#E92A39] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
              {didYouKnows[heroFactIndex].tag}
            </span>
          )}
        </div>
      )}

      {/* 85% SCROLL REGISTRATION POPUP */}
      {showScrollPopup && !hasDismissedPopup && !isLoggedIn && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FAFCFC]/90 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-200 p-10 md:p-12 rounded-[3rem] max-w-lg w-full text-center shadow-2xl">
            <h3 className="text-3xl font-extrabold mb-4 tracking-tight text-black">Still scrolling?</h3>
            <p className="text-gray-600 mb-10 text-sm leading-relaxed font-medium">Create a free profile to apply for live challenges, save opportunities, and track your submissions.</p>
            <div className="flex flex-col gap-3">
              <Link to="/register" className="w-full bg-[#E92A39] hover:bg-[#ff3b4b] text-white py-4 rounded-full font-bold text-sm transition-colors block shadow-md">
                Create Free Profile
              </Link>
              <button onClick={handleDismissPopup} className="w-full text-gray-500 hover:text-black py-3 rounded-full text-sm font-bold transition-colors">
                Keep exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN REQUIRED MODAL (FOR THE WALL) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FAFCFC]/90 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-200 p-8 rounded-[3rem] max-w-sm w-full text-center animate-slide-in shadow-2xl">
            <span className="text-5xl mb-4 block drop-shadow-sm">🔒</span>
            <h3 className="text-2xl font-extrabold mb-2 text-black">Hold up.</h3>
            <p className="text-gray-600 mb-8 text-sm font-medium">You need to log in to post on the wall.</p>
            <div className="flex flex-col gap-3 justify-center">
              <button onClick={() => navigate('/login')} className="w-full bg-[#E92A39] hover:bg-[#ff3b4b] text-white px-4 py-3 rounded-full font-bold transition-colors shadow-sm">
                Go to Login
              </button>
              <button onClick={() => setShowLoginModal(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 rounded-full font-bold transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FAFCFC]/90 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-200 p-8 rounded-[3rem] max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-xl font-extrabold mb-2 tracking-tight text-black">Sign out?</h3>
            <p className="text-gray-600 mb-8 text-sm font-medium">Are you sure you want to lock your vault?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-full text-sm font-bold transition-colors">
                Cancel
              </button>
              <button onClick={confirmLogout} className="flex-1 bg-[#E92A39] hover:bg-[#ff3b4b] text-white py-3 rounded-full text-sm font-bold transition-colors shadow-sm">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}