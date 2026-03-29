"use client";

import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 font-sans transition-all duration-500 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group relative h-10 w-32">
          {/* Soft Brand Glow on hover */}
          <div className="absolute -inset-10 bg-indigo-50/40 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image 
            src="/logo-removebg.png" 
            alt="Testimonial Hub" 
            fill
            sizes="128px"
            className="object-contain relative z-10 transition-all duration-500 group-hover:scale-105" 
          />
        </Link>
 
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#docs" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors relative group">
            Documentación
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all rounded-full" />
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors px-4 py-2"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-100 active:scale-95 group"
          >
            Probar Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="md:hidden p-2 bg-gray-50 rounded-lg text-gray-600 border border-gray-100">
             <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
