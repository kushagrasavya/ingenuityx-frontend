import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import billboardImage from '../imports/Gemini_Generated_Image_1l2vfz1l2vfz1l2v.png';

export default function MarketingBusiness() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsDismissed, setNotificationsDismissed] = useState(false); // Added state to handle dismissal

  useEffect(() => {
    const handleScroll = () => {
      if (notificationsDismissed) return; // Don't show again if they closed it
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      if (progress > 30) setShowNotifications(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [notificationsDismissed]);

  const notifications = [
    { app: 'Zomato', text: 'Your order is out for delivery', time: '2m ago', color: 'red' },
    { app: 'Swiggy', text: 'Flash sale: 60% OFF', time: '5m ago', color: 'orange' },
    { app: 'Blinkit', text: 'Groceries in 10 minutes', time: '8m ago', color: 'yellow' },
  ];

  const problems = [
    { e: '🥤', t: '"Why is Gen Z buying our competitor\'s drink?"' },
    { e: '👟', t: '"How do we make this sneaker brand feel less… uncle?"' },
    { e: '📱', t: '"10M downloads. Zero loyalty."' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] overflow-x-hidden font-sans selection:bg-[#E92A39] selection:text-white" data-testid="marketing-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(233, 42, 57, 0.3); }
          50% { box-shadow: 0 0 40px rgba(233, 42, 57, 0.6); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideInUp 0.5s ease-out; }
      `}</style>

      {/* TOP NAVIGATION BUTTONS */}
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
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Image Container (Fixed visibility) */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src={billboardImage} 
            alt="Marketing campaign billboard" 
            className="w-full h-full object-cover opacity-[0.6]" 
          />
          {/* Subtle gradient to blend the bottom edge smoothly */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFCFC]/60 to-[#FAFCFC]" />
        </div>
        
        {/* Soft Accent Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2E73E6]/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E92A39]/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 text-center max-w-5xl mt-12">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#E92A39] mb-6 drop-shadow-sm">Marketing & Business</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] font-black tracking-tight text-[#111]">
            Duniya ke sabse bade brands ke<br />
            <span className="text-[#E92A39]">sabse bade problems.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 italic font-bold">Yours to crack.</p>
        </div>
      </section>

      {/* SCROLL MOMENT */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFCFC] via-[#E92A39]/5 to-[#FAFCFC]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111]">10M downloads.</h2>
          <h2 className="text-4xl md:text-6xl text-[#E92A39] font-black tracking-tight">Zero loyalty.</h2>
          <p className="text-sm text-gray-500 pt-6 font-bold uppercase tracking-widest">— fintech team, mildly panicking</p>
        </div>
      </section>

      {/* VOICE NOTE */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-[#111]">
            "Why is Gen Z buying our <span className="text-[#E92A39]">competitor's drink</span>?"
          </h2>
          
          <div className="bg-white border border-gray-200 shadow-lg p-6 md:p-8 rounded-[2rem] max-w-md relative hover:-translate-y-1 transition-transform duration-300">
            {/* Decorative arrow pointing to voice note */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-l border-b border-gray-200 rotate-45 hidden md:block"></div>
            
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-[#E92A39]/10 rounded-full flex items-center justify-center text-2xl drop-shadow-sm">
                🎙️
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest mb-1.5">Voice Note</p>
                <div className="bg-gray-100 h-10 rounded-full flex items-center px-4 shadow-inner">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#E92A39] w-1/3 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-base font-bold italic text-gray-600 pl-2">"Guys… the campaign isn't landing."</p>
          </div>
        </div>
      </section>

      {/* WHAT YOU'RE SOLVING */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E92A39] font-extrabold mb-4">The Briefs</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What you're actually solving</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((it, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#E92A39]/40 hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-5xl mb-6 block drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{it.e}</span>
                <p className="text-xl font-bold leading-tight text-[#111]">{it.t}</p>
              </div>
            ))}
          </div>
          
          <p className="text-xl md:text-2xl font-medium text-gray-500 mt-16 text-center">
            Three industries. Same chaos:{' '}
            <span className="text-[#111] font-black tracking-tight">attention is harder to earn now.</span>
          </p>
        </div>
      </section>

      {/* FLOATING NOTIFICATIONS WITH CLOSE BUTTON */}
      {showNotifications && !notificationsDismissed && (
        <div className="fixed bottom-8 right-8 z-40 animate-slide-in">
          
          <div className="flex justify-end mb-2">
            <button 
              onClick={() => setNotificationsDismissed(true)} 
              className="bg-white border border-gray-200 text-gray-400 hover:text-[#E92A39] hover:border-[#E92A39]/30 p-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              aria-label="Dismiss notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notif, index) => (
              <div key={index} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-2xl w-80 hover:scale-105 transition-transform duration-300 cursor-default">
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    notif.color === 'red' ? 'bg-[#E92A39]' :
                    notif.color === 'orange' ? 'bg-[#EC802B]' : 'bg-[#FDE25D]'
                  }`} />
                  <div className="flex-1">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-0.5">{notif.app}</p>
                    <p className="text-[#111] font-bold text-sm">{notif.text}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHAT THIS DOES TO YOU */}
      <section className="py-24 px-4 bg-[#FAFCFC]">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]">What this does to you</h3>
          <div className="space-y-10">
            <div className="border-l-4 border-[#E92A39] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">🧠</p>
              <p className="text-xl md:text-2xl font-black text-[#111] mb-2 tracking-tight">You stop seeing brands as logos.</p>
              <p className="text-base md:text-lg font-medium text-gray-600">You start seeing psychology, culture & behaviour everywhere.</p>
            </div>
            <div className="border-l-4 border-[#E92A39] pl-8 py-2">
              <p className="text-3xl mb-4 drop-shadow-sm">🌍</p>
              <p className="text-xl md:text-2xl font-black text-[#111] tracking-tight">You build a point of view people remember.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC QUOTE */}
      <section className="py-32 px-4 bg-white border-y border-gray-100">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-base font-bold text-gray-400 mb-4 uppercase tracking-widest">"I didn't get placed here."</p>
          <h2 className="text-5xl md:text-7xl text-[#E92A39] font-black tracking-tighter">I got obsessed.</h2>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFCFC] to-[#FFF8E7] relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <button
            data-testid="cta-primary"
            onClick={() => navigate('/')}
            className="bg-[#E92A39] hover:bg-[#ff3b4b] text-white text-xl md:text-2xl px-12 py-6 rounded-full transition-all hover:-translate-y-1 shadow-md pulse-glow font-black tracking-tight"
          >
            Take the brief. Break it open. →
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