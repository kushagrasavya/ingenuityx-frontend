import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import sustainImage from '../imports/image-17.png';

export default function Sustainability() {
  const navigate = useNavigate();

  const problems = [
    { e: '👗', t: '"What do we do with 2 lakh unsold kurtas?"' },
    { e: '🥫', t: '"Can sustainable packaging stop looking boring?"' },
    { e: '🏠', t: '"How do we make eco-housing aspirational?"' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] overflow-x-hidden font-sans selection:bg-[#059669] selection:text-white" data-testid="sustainability-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.2); }
          50% { box-shadow: 0 0 40px rgba(5, 150, 105, 0.4); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
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
          <ImageWithFallback src={sustainImage} alt="Sustainability" className="w-full h-full object-cover grayscale opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFCFC]/80 to-[#FAFCFC]" />
        </div>
        
        {/* Soft Accent Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#059669]/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FDE25D]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 text-center max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#059669] mb-6 drop-shadow-sm">Sustainability</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] font-black tracking-tight text-[#111]">
            The brands of <span className="bg-[#059669] text-white px-4 rounded-2xl inline-block shadow-sm">2035</span><br />
            are being designed{' '}
            <span className="text-[#059669]">right now.</span>
          </h1>
        </div>
      </section>

      {/* VISUAL CONTRADICTION */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFCFC] via-[#059669]/5 to-[#FAFCFC]" />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <p className="text-xl md:text-2xl text-gray-500 font-bold tracking-tight">Beautiful product shots slowly transition into:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base text-[#111]">
            {['landfills', 'waste', 'overheated cities', 'pollution', 'excess inventory', 'plastic', 'fast fashion', 'carbon'].map((w, i) => (
              <div key={i} className="bg-white border border-gray-200 font-bold uppercase tracking-widest p-5 rounded-2xl shadow-sm hover:border-[#059669]/40 hover:-translate-y-1 transition-all duration-300">
                {w}
              </div>
            ))}
          </div>
          <p className="text-base md:text-lg text-gray-400 font-bold italic pt-4">No narration needed.<br />Visual contradiction tells the story.</p>
        </div>
      </section>

      {/* SCROLL MOMENTS */}
      <section className="py-24 px-4 bg-[#FAFCFC]">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl text-[#111] font-black tracking-tight">2 lakh unsold kurtas.</h2>
            <h2 className="text-4xl md:text-6xl text-[#059669] font-black tracking-tight">Now what?</h2>
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl text-gray-600 font-bold tracking-tight">Can sustainability stop looking boring?</h2>
          </div>
        </div>
      </section>

      {/* WHAT YOU'RE SOLVING */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#059669] font-extrabold mb-4">The Briefs</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What you're actually solving</h3>
          </div>
          <div className="space-y-6">
            {problems.map((it, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#059669]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 group">
                <span className="text-5xl block drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{it.e}</span>
                <p className="text-xl md:text-2xl font-bold leading-tight text-[#111]">{it.t}</p>
              </div>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-medium text-gray-500 mt-16 text-center">
            Not awareness campaigns.{' '}
            <span className="text-[#111] font-black tracking-tight">Business survival questions.</span>
          </p>
        </div>
      </section>

      {/* WHAT THIS DOES TO YOU */}
      <section className="py-24 px-4 bg-[#FAFCFC]">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What this does to you</h3>
          <div className="space-y-10">
            <div className="border-l-4 border-[#059669] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">🌱</p>
              <p className="text-xl md:text-2xl font-black text-[#111] tracking-tight">You develop long-term thinking.</p>
            </div>
            <div className="border-l-4 border-[#059669] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">📊</p>
              <p className="text-xl md:text-2xl font-black text-[#111] tracking-tight">You learn the language shaping modern boardrooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-32 px-4 bg-white border-y border-gray-100 relative">
        <div className="text-center max-w-3xl mx-auto relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-[#059669]/5 rounded-full blur-3xl pointer-events-none" />
          </div>
          <h2 className="relative text-4xl md:text-6xl text-[#059669] leading-tight font-black tracking-tighter">"The future is a design problem."</h2>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <button
            data-testid="cta-primary"
            onClick={() => navigate('/')}
            className="bg-[#059669] hover:bg-[#047857] text-white text-xl md:text-2xl px-12 py-6 rounded-full transition-all hover:-translate-y-1 shadow-md pulse-glow font-black tracking-tight"
          >
            The problem is real. Are you? →
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