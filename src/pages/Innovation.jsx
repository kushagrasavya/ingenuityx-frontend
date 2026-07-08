import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Innovation() {
  const navigate = useNavigate();

  const problems = [
    {
      emoji: '📦',
      title: 'Products reaching stores. Not customers.',
      body: 'Companies spend millions manufacturing and distributing products every day. Yet inventory still sits unsold in one market while demand goes unmet in another.',
      hook: 'Can supply chains become predictive instead of reactive?'
    },
    {
      emoji: '♻️',
      title: 'Consumers want sustainable products. Without paying more for them.',
      body: 'Businesses are under pressure to reduce waste, emissions, and packaging — without increasing costs or sacrificing growth.',
      hook: 'Can sustainability become a competitive advantage?'
    },
    {
      emoji: '🧠',
      title: 'Millions of customers. One-size-fits-all experiences.',
      body: 'Consumers expect brands to understand their needs, preferences, and behaviors in real time. Most customer journeys are still far from personal.',
      hook: 'Can every customer experience feel individually designed?'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] overflow-x-hidden font-sans selection:bg-[#E92A39] selection:text-white" data-testid="innovation-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(233, 42, 57, 0.3); }
          50% { box-shadow: 0 0 40px rgba(233, 42, 57, 0.6); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.6s ease-out both; }
      `}</style>

      <button
        data-testid="close-btn"
        onClick={() => navigate('/')}
        className="fixed top-8 right-8 z-50 bg-[#E92A39] hover:bg-[#ff3b4b] text-white p-3 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        data-testid="back-btn"
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 text-gray-500 hover:text-[#E92A39] transition-colors text-xs font-extrabold uppercase tracking-widest flex items-center gap-2"
      >
        <span>←</span> Go Back
      </button>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Light Mode Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E92A39]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FDE25D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E92A39] mb-6">Innovation Challenges</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-10 text-[#111]">
            Every company says they're <span className="text-[#E92A39]">innovating.</span>
          </h1>
          <div className="space-y-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            <p>Some are trying to predict demand before it happens.</p>
            <p>Some are trying to eliminate waste before customers notice it.</p>
            <p>Some are trying to understand customers before customers understand themselves.</p>
            <p className="text-[#E92A39] font-bold italic mt-6">And some are still scheduling meetings about it. (Ouch)</p>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* WHAT GLOBAL COMPANIES ARE SOLVING */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E92A39] mb-4">The Real Briefs</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What global companies are actually trying to solve</h2>
          </div>

          <div className="space-y-8">
            {problems.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 shadow-sm rounded-[2.5rem] p-8 md:p-12 hover:shadow-xl hover:border-[#E92A39]/30 hover:-translate-y-1 transition-all duration-300 fade-up group"
                style={{ animationDelay: `${i * 0.1}s` }}
                data-testid={`problem-card-${i}`}
              >
                <div className="text-5xl mb-6 drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{p.emoji}</div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-[#111]">{p.title}</h3>
                <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-medium">{p.body}</p>
                <p className="text-lg md:text-xl text-[#E92A39] font-bold italic">"{p.hook}"</p>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />
            <div className="text-center space-y-3 font-medium text-gray-500">
              <p className="text-lg md:text-xl">Not classroom problems.</p>
              <p className="text-lg md:text-xl">Not hypothetical case studies.</p>
              <p className="text-xl md:text-2xl font-black text-[#111] mt-4 tracking-tight">The kind of challenges companies are investing millions to solve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-[#FFF8E7] border-t border-gray-200 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <button
            data-testid="cta-primary"
            onClick={() => navigate('/')}
            className="bg-[#E92A39] hover:bg-[#ff3b4b] text-white text-xl md:text-2xl px-12 py-6 rounded-full transition-all hover:-translate-y-1 shadow-md pulse-glow font-black tracking-tight"
          >
            Let's hear your ideas →
          </button>
          <p className="text-gray-400 mt-8 font-extrabold uppercase text-xs tracking-widest">or</p>
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-[#E92A39] transition-colors mt-6 text-sm font-bold border-b-2 border-transparent hover:border-[#E92A39] pb-1">
            Return to opportunities
          </button>
        </div>
      </section>
    </div>
  );
}