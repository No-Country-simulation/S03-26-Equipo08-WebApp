"use client";

import { 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// --- Animation Variants (Typed for Stability) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const spotlightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* --- Animate UI Style Background Elements --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none pt-64">
        {/* Top Spotlight Beam */}
        <motion.div 
          variants={spotlightVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 via-white to-transparent blur-[80px]"
        />

        {/* Subtle Background Grid Line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.4]" />
        
        {/* Subtle Magnetic Dots */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
           <svg width="100%" height="100%" className="absolute inset-0">
             <defs>
               <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1" fill="#6366f1" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#dotPattern)" />
           </svg>
        </div>
      </div>

      {/* --- Main Landing Body --- */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 md:pt-48 flex flex-col items-center text-center"
      >
        
        {/* 1. Official Logo Animation */}
        <motion.div variants={itemVariants} className="mb-2">
          <Link href="/" className="inline-block group mb-8 relative h-12 w-40">
            <Image 
              src="/logo-removebg.png" 
              alt="Testimonial Hub" 
              fill
              priority
              sizes="160px"
              className="object-contain drop-shadow-xl hover:scale-105 transition-transform" 
            />
          </Link>
        </motion.div>

        {/* 2. Headline with Blur Reveal */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]"
        >
          Captura testimonios de tus clientes con <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient-x">
            facilidad asombrosa
          </span>
        </motion.h1>

        {/* 3. Sub-headline / Copy */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          Recopilar historias reales suele ser difícil. Por eso creamos <span className="text-gray-900 font-semibold">Testimonial Hub</span>: 
          en minutos podrás recoger testimonios inolvidables en texto y video, sin necesidad de programadores ni servidores.
          <span className="block mt-4 text-blue-600 font-medium">Simple, rápido e impactante.</span>
        </motion.p>

        {/* 3. High-Contrast Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 w-full"
        >
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-14 py-6 bg-gray-900 text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            Comenzar Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-14 py-6 bg-white border border-gray-100 text-gray-500 rounded-2xl font-bold text-xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all active:scale-95">
             Ver Documentación
          </button>
        </motion.div>

        {/* 4. Trust Badges / Social Proof */}
        <motion.div 
          variants={itemVariants}
          className="mt-32 pt-16 border-t border-gray-50 w-full flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-3 px-5 py-2 bg-indigo-50/50 border border-indigo-100/50 rounded-full">
             <Sparkles className="w-4 h-4 text-indigo-500" />
             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Elegido por marcas de élite</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 opacity-30 grayscale saturate-0 hover:grayscale-0 hover:saturate-100 transition-all duration-700">
             <div className="flex items-center gap-2 font-black italic text-2xl tracking-tighter text-gray-900 underline decoration-indigo-400">FINANCE</div>
             <div className="flex items-center gap-2 font-black italic text-2xl tracking-tighter text-gray-900 underline decoration-blue-400">LOGISTICS</div>
             <div className="flex items-center gap-2 font-black italic text-2xl tracking-tighter text-gray-900 underline decoration-purple-400">ECOMMERCE</div>
             <div className="flex items-center gap-2 font-black italic text-2xl tracking-tighter text-gray-900 underline decoration-pink-400">AGENCY</div>
          </div>
        </motion.div>
      </motion.main>

      {/* 5. Minimalist Interactive Footer */}
      <footer className="mt-32 pb-16 w-full text-center px-6 relative z-10 border-t border-gray-50">
        <div className="pt-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
           <div className="w-12 h-px bg-gray-100" />
           Testimonial Hub • Infrastructure for Social Proof
           <div className="w-12 h-px bg-gray-100" />
        </div>
      </footer>
    </div>
  );
}
