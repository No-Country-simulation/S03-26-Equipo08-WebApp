"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ChevronLeft, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/validation";
import { toast } from "sonner";

import { Suspense } from "react";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegisteredResult = searchParams.get("registered");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 1. Validación Zod
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const msg = validation.error.issues[0].message;
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    // 2. Auth con Better Auth
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => setIsLoading(true),
      onError: (ctx) => {
        setIsLoading(false);
        const msg = ctx.error.message || "Credenciales inválidas.";
        setError(msg);
        toast.error(msg);
      },
      onSuccess: () => {
        setIsLoading(false);
        toast.success("¡Bienvenido de nuevo!");
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-50/50 via-white to-transparent blur-[80px]" />
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
          Volver
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div 
          variants={formVariants}
          className="bg-white border border-gray-100 shadow-2xl shadow-indigo-900/[0.03] rounded-[2.5rem] p-10 md:p-14 mb-10 overflow-hidden relative"
        >
          {/* Brand & Welcome */}
          <div className="flex flex-col items-center text-center mb-10">
            <Link href="/" className="inline-block group mb-8 active:scale-95 transition-transform relative h-14 w-40">
              <Image 
                src="/logo-removebg.png" 
                alt="Testimonial Hub" 
                fill
                priority
                loading="eager"
                sizes="160px"
                className="object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all" 
              />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 tracking-tight mb-3">
              Bienvenido
            </h1>
            <p className="text-gray-400 font-medium text-lg">Gestiona tu prueba social con un clic.</p>
          </div>

          {isRegisteredResult && !error && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 text-xs font-bold rounded-2xl flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 shrink-0" />
               ¡Registro exitoso! Ya puedes entrar.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
              <div className="relative group">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#6366f1] transition-colors" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="ejemplo@hub.com" 
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 outline-none transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contraseña</label>
                 <Link href="#" className="text-[10px] font-black text-[#6366f1] uppercase tracking-tighter hover:text-indigo-700 transition-all">¿Olvidaste?</Link>
              </div>
              <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#6366f1] transition-colors" />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••" 
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 outline-none transition-all font-semibold text-sm text-gray-900 placeholder:text-gray-300"
                 />
              </div>
            </div>

            <button disabled={isLoading} className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-8 relative overflow-hidden disabled:opacity-70">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar al Panel"}
               {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-gray-50">
             <p className="text-sm font-medium text-gray-400">
               ¿No tienes cuenta?{" "}
               <Link href="/register" className="text-[#6366f1] font-black hover:underline transition-all">Regístrate</Link>
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

