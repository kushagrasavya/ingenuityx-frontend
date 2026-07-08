import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- ENVIRONMENT VARIABLE SETUP ---
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Student', // Default selected
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // FIXED: Uses API_URL variable instead of localhost
      await axios.post(`${API_URL}/api/contacts`, {
        data: {
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message
        }
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear the form
      setFormData({ name: '', email: '', type: 'Student', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Oops! Something went wrong sending your message. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFC] text-[#111] font-sans selection:bg-[#E92A39] selection:text-white pb-24 animate-fade-in-global">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        * { font-family: 'Outfit', sans-serif; }

        @keyframes fadeInGlobal { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-global { animation: fadeInGlobal 0.5s ease-out forwards; }
      `}</style>

      {/* NAVBAR BACK ARROW (Minimalist) */}
      <nav className="w-full px-6 py-8 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-sm font-extrabold tracking-widest uppercase hover:text-[#E92A39] transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
        <div className="font-black text-xl tracking-tight">InGenuity<span className="text-[#E92A39]">X</span></div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 mt-8">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: COPY & INFO */}
          <div className="space-y-12">
            <div>
              <span className="text-[#E92A39] text-xs font-black uppercase tracking-[0.25em] mb-6 block">Hit us up</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                Skip the formalities. <br/>
                <span className="text-gray-400">Let's talk.</span>
              </h1>
              <p className="text-lg md:text-xl font-bold text-gray-600 leading-relaxed max-w-md">
                No automated "we value your email" auto-replies. Whether you're a student with a question or a brand ready to drop a brief, a real human will read this.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm flex flex-col items-start hover:border-[#3BA8E7] transition-colors">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Direct Line</span>
                <a href="mailto:storm@minervainnov.com" className="text-2xl font-black text-[#111] hover:text-[#3BA8E7] transition-colors">
                  storm@minervainnov.com
                </a>
              </div>
              
              <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm flex flex-col items-start hover:border-[#FB607E] transition-colors">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Call Us Maybe</span>
                <a href="tel:+918320262013" className="text-2xl font-black text-[#111] hover:text-[#FB607E] transition-colors">
                  +91 8320 262 013
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FORM */}
          <div className="bg-white border border-gray-200 p-8 md:p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            
            {/* SUCCESS OVERLAY */}
            {isSuccess && (
              <div className="absolute inset-0 bg-[#FAFCFC] z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="text-6xl mb-6">✌️</div>
                <h3 className="text-3xl font-black tracking-tight mb-2">Message received.</h3>
                <p className="text-gray-600 font-bold">We'll get back to you faster than HR reads a resume.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#E92A39]">Who are you?</label>
                <div className="flex flex-wrap gap-2">
                  {['Student', 'Brand/Partner', 'Just Yapping'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                        formData.type === type 
                          ? 'bg-[#111] text-white border-[#111]' 
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#E92A39]">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Main character name" 
                  className="w-full bg-[#FAFCFC] border border-gray-200 text-[#111] focus:border-[#E92A39] rounded-2xl py-4 px-5 transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#E92A39]">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Where do we reply?" 
                  className="w-full bg-[#FAFCFC] border border-gray-200 text-[#111] focus:border-[#E92A39] rounded-2xl py-4 px-5 transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#E92A39]">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Spill." 
                  className="w-full bg-[#FAFCFC] border border-gray-200 text-[#111] focus:border-[#E92A39] rounded-2xl py-4 px-5 min-h-[140px] resize-none transition-all outline-none font-medium"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#E92A39] hover:bg-[#ff3b4b] text-white py-4 rounded-full font-black text-sm uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}