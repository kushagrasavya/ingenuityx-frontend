import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Creativity() {
  const navigate = useNavigate();

  const ideas = [
    {
      emoji: '💍',
      title: 'A jewellery brand people recognize before they read the logo.',
      hook: 'Recognition beats advertising every time.'
    },
    {
      emoji: '🎵',
      title: 'A music campaign that feels like culture, not marketing.',
      hook: 'The best campaigns become conversations.'
    },
    {
      emoji: '🍬',
      title: 'A heritage brand that feels relevant again.',
      hook: 'Nostalgia is powerful. Relevance is priceless.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] overflow-x-hidden relative font-sans selection:bg-[#FB607E] selection:text-white" data-testid="creativity-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        .film-grain {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.03"/></svg>');
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.6s ease-out both; }
        
        @keyframes pulse-glow-pink {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 96, 126, 0.2); }
          50% { box-shadow: 0 0 40px rgba(251, 96, 126, 0.4); }
        }
        .pulse-glow-pink { animation: pulse-glow-pink 2s ease-in-out infinite; }
      `}</style>

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none film-grain z-50 mix-blend-multiply opacity-50" />

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
        {/* Soft Accent Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FB607E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3BA8E7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FB607E] mb-6 drop-shadow-sm">Creativity</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-[#111]">
            Everyone remembers <span className="text-[#FB607E]">the ad.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-12 italic font-bold">Almost nobody remembers the media budget.</p>

          <div className="space-y-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            <p>Some campaigns become catchphrases.</p>
            <p>Some logos become shortcuts.</p>
            <p>Some packaging gets photographed more than the product itself.</p>
            <p className="text-[#FB607E] font-bold italic mt-6">And some ideas end up in a folder called <span className="font-mono font-black bg-[#FB607E]/10 px-2 py-1 rounded-lg">Final_Final_v27</span>.</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* WHAT BRANDS ARE TRYING TO CREATE */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFCFC] via-[#FB607E]/5 to-[#FAFCFC]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#FB607E] font-extrabold mb-4">The Mandate</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What brands are actually trying to create</h2>
          </div>

          <div className="space-y-8">
            {ideas.map((it, i) => (
              <div
                key={i}
                data-testid={`idea-card-${i}`}
                className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-[#FB607E]/40 hover:-translate-y-1 transition-all duration-300 fade-up group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-6 drop-shadow-sm group-hover:scale-110 transition-transform origin-left w-fit">{it.emoji}</div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-[#111]">{it.title}</h3>
                <p className="text-lg md:text-xl text-[#FB607E] font-bold italic">"{it.hook}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FB607E]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3BA8E7]/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <button
            data-testid="cta-primary"
            onClick={() => navigate('/')}
            className="bg-[#FB607E] hover:bg-[#e04a66] text-white text-xl md:text-2xl px-12 py-6 rounded-full transition-all hover:-translate-y-1 shadow-md pulse-glow-pink font-black tracking-tight"
          >
            Make it memorable →
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