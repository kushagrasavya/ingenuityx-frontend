import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import techImage from '../imports/ChatGPT_Image_May_29__2026__07_51_12_PM.png';

const terminalSequence = [
  '$ npm run build',
  '> building...',
  '✓ compiled successfully',
  '',
  '$ git push origin main',
  'Enumerating objects: 47, done.',
  'Counting objects: 100% (47/47), done.',
  'Delta compression using up to 8 threads',
  'Compressing objects: 100% (28/28), done.',
  'Writing objects: 100% (28/28), 3.42 KiB | 3.42 MiB/s, done.',
  'Total 28 (delta 19), reused 0 (delta 0)',
  '',
  '$ deploying to production...',
  '✓ Build successful',
  '✓ Assets optimized',
  '✓ Deployment complete',
  '',
  '[04:17 AM]',
  '✓ SUCCESS',
];

export default function TechHackathons() {
  const navigate = useNavigate();
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < terminalSequence.length) {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, terminalSequence[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 200 + 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] overflow-x-hidden font-sans selection:bg-[#FDE25D] selection:text-[#111]" data-testid="tech-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        @keyframes terminal-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .terminal-cursor { animation: terminal-blink 1s infinite; }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: slideInUp 0.6s ease-out both; }
      `}</style>

      {/* TOP NAVIGATION BUTTONS */}
      <button
        data-testid="close-btn"
        onClick={() => navigate('/')}
        className="fixed top-8 right-8 z-50 bg-[#111] hover:bg-black text-white p-3 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        data-testid="back-btn"
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 text-gray-500 hover:text-[#111] transition-colors text-xs font-extrabold uppercase tracking-widest flex items-center gap-2"
      >
        <span>←</span> Go Back
      </button>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <ImageWithFallback src={techImage} alt="Tech workspace" className="w-full h-full object-cover grayscale opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFCFC]/80 to-[#FAFCFC]" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E92A39] mb-6 drop-shadow-sm">Tech & Hackathons</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-none font-black tracking-tighter text-[#111]">
            <span className="bg-[#FDE25D] px-4 rounded-2xl inline-block shadow-sm">48 hours.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-bold italic mb-12">That's enough to build something real.</p>
          
          {/* Mini Static Terminal */}
          <div className="inline-block text-left bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden min-w-[280px]">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-[#E92A39]" />
              <div className="w-3 h-3 rounded-full bg-[#FDE25D]" />
              <div className="w-3 h-3 rounded-full bg-[#2E73E6]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 ml-2 font-sans">terminal</span>
            </div>
            <div className="p-5 text-sm font-mono font-medium text-gray-600">
              <p className="mb-1"><span className="text-[#2E73E6] font-bold">$</span> ready to build?</p>
              <p><span className="text-[#2E73E6] font-bold">$</span> <span className="terminal-cursor font-bold text-[#111]">_</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED TERMINAL SECTION */}
      <section className="py-24 px-4 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFCFC] via-[#FDE25D]/5 to-[#FAFCFC]" />
        
        <div className="w-full max-w-4xl relative z-10">
          <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-2 bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-[#E92A39]" />
              <div className="w-3 h-3 rounded-full bg-[#FDE25D]" />
              <div className="w-3 h-3 rounded-full bg-[#2E73E6]" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400 ml-3 font-sans">~/hackathon-project</span>
            </div>
            <div className="p-8 min-h-96 font-mono text-sm leading-relaxed bg-[#FAFCFC]">
              {terminalLines.map((line, index) => (
                <div key={index} className="mb-1.5">
                  {line.startsWith('✓') ? (
                    <span className="text-[#2E73E6] font-bold">{line}</span>
                  ) : line.startsWith('$') ? (
                    <span className="text-[#111] font-bold">{line}</span>
                  ) : line.includes('[04:17 AM]') ? (
                    <span className="text-gray-400 text-xs font-sans font-bold uppercase tracking-widest">{line}</span>
                  ) : line.includes('SUCCESS') ? (
                    <span className="text-[#E92A39] text-lg font-black tracking-tight">{line}</span>
                  ) : (
                    <span className="text-gray-500 font-medium">{line}</span>
                  )}
                </div>
              ))}
              {currentLine < terminalSequence.length && <span className="terminal-cursor text-[#2E73E6] font-bold">_</span>}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'RE BUILDING */}
      <section className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E92A39] mb-4">The Briefs</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What you're actually building</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { e: '🏗️', t: 'A manufacturing dashboard replacing a ₹40L workflow' },
              { e: '🧬', t: 'A rural health tool replacing paper tracking' },
              { e: '🎓', t: 'A personalised revision engine for students' }
            ].map((it, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 md:p-10 rounded-[2.5rem] hover:shadow-xl hover:border-[#FDE25D] transition-all duration-300 hover:-translate-y-1 group">
                <span className="text-5xl mb-6 block drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{it.e}</span>
                <p className="text-xl font-bold leading-tight text-[#111]">{it.t}</p>
              </div>
            ))}
          </div>
          <p className="text-xl font-medium text-gray-500 mt-16 text-center">
            Three industries. Same 48 hours. <span className="font-black text-[#111]">Same chai.</span>
          </p>
        </div>
      </section>

      {/* WHAT THIS DOES TO YOU */}
      <section className="py-24 px-4 bg-[#FAFCFC]">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What this does to you</h3>
          <div className="space-y-10">
            <div className="border-l-4 border-[#FDE25D] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">🛠️</p>
              <p className="text-xl md:text-2xl font-bold text-gray-600 mb-2">You stop being someone who codes.</p>
              <p className="text-xl md:text-2xl font-black text-[#111] tracking-tight">You become someone who ships.</p>
            </div>
            <div className="border-l-4 border-[#FDE25D] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">🔓</p>
              <p className="text-xl md:text-2xl font-black text-[#111] tracking-tight leading-tight">Your GitHub starts looking more valuable than your résumé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS BLOCK */}
      <section className="py-32 px-4 bg-white border-y border-gray-100 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="inline-block text-center bg-[#FAFCFC] border border-gray-200 p-10 md:p-12 rounded-[3rem] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-extrabold text-gray-400 mb-4 uppercase tracking-widest">[SUCCESS]</p>
            <p className="text-[#111] text-4xl md:text-6xl font-black tracking-tighter">Build complete.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <button
            data-testid="cta-primary"
            onClick={() => navigate('/')}
            className="bg-[#111] hover:bg-black text-[#FDE25D] text-xl md:text-2xl px-12 py-6 rounded-full transition-all hover:-translate-y-1 shadow-md font-black tracking-tight flex items-center gap-3 justify-center mx-auto"
          >
            Start the clock. <span>→</span>
          </button>
          <p className="text-gray-400 mt-8 font-extrabold uppercase text-xs tracking-widest">or</p>
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-[#111] transition-colors mt-6 text-sm font-bold border-b-2 border-transparent hover:border-[#111] pb-1">
            Return to opportunities
          </button>
        </div>
      </section>
    </div>
  );
}