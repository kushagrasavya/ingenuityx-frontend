import React from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/ImageWithFallback';

import registeredImage from '../imports/image-1.png';
import groupDiscussion from '../imports/image-3.png';

const PLACEHOLDER_BG = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] font-sans selection:bg-[#E92A39] selection:text-white pb-24">
      
      <nav className="w-full px-6 py-8 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-sm font-extrabold tracking-widest uppercase hover:text-[#E92A39] transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
        <div className="font-black text-xl tracking-tight">InGenuity<span className="text-[#E92A39]">X</span></div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 mt-8 animate-fade-in-global">
        
        {/* HERO */}
        <section className="mb-12 grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <span className="text-[#2E73E6] text-xs font-black uppercase tracking-[0.25em] mb-6 block">Our Manifesto</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
              Degrees are everywhere. <br/>
              <span className="text-gray-400">Proof of work is rare.</span>
            </h1>
          </div>
          <div className="lg:col-span-2 rounded-[2.5rem] overflow-hidden shadow-sm h-[280px] lg:h-[380px] border border-gray-200">
            <ImageWithFallback src={registeredImage} alt="Students building proof of work" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* STAT STRIP */}
        <section className="mb-24 md:mb-32">
          <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {[
              { value: '130+', label: 'Students Surveyed' },
              { value: '6', label: 'Brand Partners' },
              { value: '5', label: 'Themes' },
              { value: '2026', label: 'Founding Cohort' },
            ].map((stat, index) => (
              <div key={index} className="py-4 px-6 md:py-5 md:px-8 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-black text-[#111] leading-none">{stat.value}</h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE PROBLEM VS THE SOLUTION — trimmed to short tags, not sentences */}
        <section className="grid md:grid-cols-2 gap-6 mb-32">
          <div className="bg-[#111] text-white p-10 md:p-12 rounded-[2.5rem] shadow-xl">
            <h3 className="text-2xl font-black tracking-tight mb-6 text-[#FB607E]">The Status Quo 🥱</h3>
            <div className="flex flex-col gap-3">
              {['6-second resume glance', 'Ghosted by the ATS', 'Internships = Canva + spreadsheets'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-xl">
                  <span className="text-[#FB607E] font-black">✖</span>
                  <span className="font-bold text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:border-[#3BA8E7] transition-colors">
            <h3 className="text-2xl font-black tracking-tight mb-6 text-[#3BA8E7]">The InGenuityX Way 🚀</h3>
            <div className="flex flex-col gap-3">
              {['Real briefs, real brands', 'Portfolio > resume', 'Straight to PPOs & boardrooms'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#3BA8E7]/5 px-5 py-3 rounded-xl">
                  <span className="text-[#3BA8E7] font-black">✔</span>
                  <span className="font-bold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE + WHY — cut to one line, not a paragraph */}
        <section className="mb-24 grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-[2.5rem] overflow-hidden shadow-sm min-h-[240px] border border-gray-200">
            <ImageWithFallback src={groupDiscussion} alt="Live boardroom finale" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-3 bg-[#FDE25D] p-10 md:p-14 rounded-[3rem] text-[#111] relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Stop simulating. Start building.</h2>
              <Link to="/#opportunities" className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300 inline-block shadow-lg">
                View Challenges
              </Link>
            </div>
            <div className="absolute -bottom-20 -right-20 text-[15rem] opacity-20 pointer-events-none select-none">
              🎯
            </div>
          </div>
        </section>

        {/* DUAL CTA — subtitle cut down to a few words */}
        <section>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2E73E6] rounded-[2.5rem] p-10 md:p-14 text-white flex flex-col justify-center items-start shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Ready to prove yourself?</h3>
              <Link to="/#opportunities" className="bg-white text-[#2E73E6] px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-md">
                Explore Challenges
              </Link>
            </div>

            <div
              className="rounded-[2.5rem] p-10 md:p-14 text-white flex flex-col justify-center items-start shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${PLACEHOLDER_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Want to partner with us?</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:storm@minervainnov.com" className="bg-white/90 text-[#111] px-6 py-3 rounded-full text-sm font-bold hover:bg-white transition-colors">
                    storm@minervainnov.com
                  </a>
                  <Link to="/contact" className="bg-[#111] text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                    Hit Us Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}