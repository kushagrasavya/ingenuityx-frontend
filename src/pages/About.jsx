import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] font-sans selection:bg-[#E92A39] selection:text-white pb-24">
      
      {/* NAVBAR BACK ARROW (Minimalist) */}
      <nav className="w-full px-6 py-8 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-sm font-extrabold tracking-widest uppercase hover:text-[#E92A39] transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
        <div className="font-black text-xl tracking-tight">InGenuity<span className="text-[#E92A39]">X</span></div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 mt-8 animate-fade-in-global">
        
        {/* HERO SECTION */}
        <section className="mb-24 md:mb-32 max-w-4xl">
          <span className="text-[#2E73E6] text-xs font-black uppercase tracking-[0.25em] mb-6 block">Our Manifesto</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8">
            Degrees are everywhere. <br/>
            <span className="text-gray-400">Proof of work is rare.</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-600 leading-relaxed max-w-3xl">
            We built InGenuityX because the traditional entry-level job market is broken. Mass applying is exhausting. Resumes are boring. And nobody actually cares that you are a "highly motivated team player."
          </p>
        </section>

        {/* THE PROBLEM VS THE SOLUTION */}
        <section className="grid md:grid-cols-2 gap-6 mb-32">
          {/* The Status Quo */}
          <div className="bg-[#111] text-white p-10 md:p-12 rounded-[2.5rem] shadow-xl">
            <h3 className="text-2xl font-black tracking-tight mb-4 text-[#FB607E]">The Status Quo 🥱</h3>
            <ul className="space-y-6 text-white/80 font-semibold text-lg">
              <li className="flex gap-4"><span className="text-[#FB607E]">✖</span> HR spends 6 seconds looking at a piece of paper you spent 4 years studying for.</li>
              <li className="flex gap-4"><span className="text-[#FB607E]">✖</span> Getting ghosted by the ATS black hole.</li>
              <li className="flex gap-4"><span className="text-[#FB607E]">✖</span> Doing internships that consist of making Canva posters and organizing spreadsheets.</li>
            </ul>
          </div>

          {/* The InGenuityX Way */}
          <div className="bg-white border-2 border-gray-100 p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:border-[#3BA8E7] transition-colors">
            <h3 className="text-2xl font-black tracking-tight mb-4 text-[#3BA8E7]">The InGenuityX Way 🚀</h3>
            <ul className="space-y-6 text-gray-700 font-semibold text-lg">
              <li className="flex gap-4"><span className="text-[#3BA8E7]">✔</span> Solving actual briefs from real, paying brands.</li>
              <li className="flex gap-4"><span className="text-[#3BA8E7]">✔</span> Building a portfolio of proof-of-work that makes your resume irrelevant.</li>
              <li className="flex gap-4"><span className="text-[#3BA8E7]">✔</span> Skipping the line directly to shortlists, PPOs, and boardroom presentations.</li>
            </ul>
          </div>
        </section>

        {/* THE WHY */}
        <section className="mb-32">
          <div className="bg-[#FDE25D] p-10 md:p-16 rounded-[3rem] text-[#111] relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Stop simulating. Start building.</h2>
              <p className="text-lg font-bold leading-relaxed mb-10 opacity-90">
                The world doesn't need another generic cover letter. It needs fresh perspectives that haven't been corrupted by 10 years of corporate conditioning. Your ideas actually have value. You just need the right arena to drop them in. 
              </p>
              <Link to="/register" className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300 inline-block shadow-lg">
                Enter The Arena
              </Link>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-20 -right-20 text-[15rem] opacity-20 pointer-events-none select-none">
              🎯
            </div>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight mb-4">Want to partner with us?</h2>
          <p className="text-gray-600 font-bold mb-8">
            Are you a brand looking to tap into unconditioned Gen-Z thinking? Let's talk.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:storm@minervainnov.com" className="bg-gray-100 text-[#111] px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              storm@minervainnov.com
            </a>
            <Link to="/contact" className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-bold hover:border-[#111] transition-colors">
              Hit Us Up
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}