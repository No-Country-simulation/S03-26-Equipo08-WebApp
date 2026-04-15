"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, ChevronLeft, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function RegisterPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});
    setGeneralError(null);

    // Basic Validation
    if (!formData.name || !formData.email || !formData.password || !formData.companyName) {
      toast.error("Por favor completa todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al crear la cuenta");
      }

      toast.success("¡Cuenta y organización creadas con éxito!");
      router.push("/login?registered=true");
    } catch (err: unknown) {
      const error = err as Error;
      setGeneralError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-100/30 via-white to-transparent blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8f8f8_1px,transparent_1px),linear-gradient(to_bottom,#f8f8f8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.3]" />
      </div>

      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50 lg:block hidden"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-gray-400 font-bold text-xs shadow-sm hover:text-gray-900 hover:border-gray-300 transition-all active:scale-95 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Regresar
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg relative z-10"
      >
        <motion.div 
          variants={formVariants}
          className="bg-white border border-gray-100 shadow-2xl shadow-indigo-900/[0.03] rounded-[3rem] p-10 md:p-14 overflow-hidden relative"
        >
          {/* Brand & Welcome */}
          <div className="flex flex-col items-center text-center mb-10">
            <Link href="/" className="inline-block group mb-8 active:scale-95 transition-transform relative h-14 w-40">
              <Image 
                src="/logo-removebg.png" 
                alt="Testimonial Hub" 
                fill
                priority
                sizes="160px"
                className="object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all" 
              />
            </Link>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 tracking-tight mb-3">
              Crea tu cuenta
            </h1>
            <p className="text-gray-400 font-medium">Únete a la infraestructura para historias de éxito.</p>
          </div>

          {generalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {generalError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            
            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
              <div className="relative group">
                 <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${formErrors.name ? 'text-red-400' : 'text-gray-300 group-focus-within:text-[#6366f1]'} transition-colors`} />
                 <input 
                   type="text" 
                   value={formData.name}
                   onChange={(e) => handleInputChange("name", e.target.value)}
                   placeholder="Hernán García" 
                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${formErrors.name ? 'border-red-200 focus:ring-red-50 focus:border-red-200' : 'border-transparent focus:ring-indigo-50 focus:border-indigo-100'} rounded-2xl outline-none focus:bg-white transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300 shadow-sm`}
                 />
              </div>
              {formErrors.name && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{formErrors.name}</p>}
            </div>

            {/* Input Company Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nombre de la Empresa</label>
              <div className="relative group">
                 <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${formErrors.companyName ? 'text-red-400' : 'text-gray-300 group-focus-within:text-[#6366f1]'} transition-colors`} />
                 <input 
                   type="text" 
                   value={formData.companyName}
                   onChange={(e) => handleInputChange("companyName", e.target.value)}
                   placeholder="Ej. Mi Agencia S.A." 
                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${formErrors.companyName ? 'border-red-200 focus:ring-red-50 focus:border-red-200' : 'border-transparent focus:ring-indigo-50 focus:border-indigo-100'} rounded-2xl outline-none focus:bg-white transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300 shadow-sm`}
                 />
              </div>
              {formErrors.companyName && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{formErrors.companyName}</p>}
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
              <div className="relative group">
                 <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${formErrors.email ? 'text-red-400' : 'text-gray-300 group-focus-within:text-[#6366f1]'} transition-colors`} />
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={(e) => handleInputChange("email", e.target.value)}
                   placeholder="tu@email.com" 
                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${formErrors.email ? 'border-red-200 focus:ring-red-50 focus:border-red-200' : 'border-transparent focus:ring-indigo-50 focus:border-indigo-100'} rounded-2xl outline-none focus:bg-white transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300 shadow-sm`}
                 />
              </div>
              {formErrors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{formErrors.email}</p>}
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Contraseña Segura</label>
              <div className="relative group">
                 <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${formErrors.password ? 'text-red-400' : 'text-gray-300 group-focus-within:text-[#6366f1]'} transition-colors`} />
                 <input 
                   type="password" 
                   value={formData.password}
                   onChange={(e) => handleInputChange("password", e.target.value)}
                   placeholder="••••••••" 
                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${formErrors.password ? 'border-red-200 focus:ring-red-50 focus:border-red-200' : 'border-transparent focus:ring-indigo-50 focus:border-indigo-100'} rounded-2xl outline-none focus:bg-white transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300 shadow-sm`}
                 />
              </div>
              {formErrors.password && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider leading-tight">{formErrors.password}</p>}
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-gray-900 text-white font-black py-6 rounded-[2rem] shadow-2xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Finalizar Registro"}
               {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-gray-50">
             <p className="text-sm font-medium text-gray-400">
               ¿Ya tienes cuenta?{" "}
               <Link href="/login" className="text-[#6366f1] font-black hover:underline transition-all">Iniciar Sesión</Link>
             </p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Footer Meta */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="mt-12 flex items-center gap-2 text-gray-400"
      >
         <ShieldCheck className="w-4 h-4" />
         <span className="text-[10px] font-bold uppercase tracking-[0.25em]">GDPR Compliance • CMS Edtech</span>
      </motion.div>
    </div>
  );
}
