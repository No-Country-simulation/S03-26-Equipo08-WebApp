"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  UserCircle,
  Eye,
  EyeOff,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

function InvitacionConfigurarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Validaciones básicas de fuerza de contraseña
  const isStrong = newPassword.length >= 8;
  const match = newPassword === confirmPassword && newPassword !== "";

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/setup-editor-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tempPassword,
          newPassword,
          name
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Error al actualizar contraseña");

      setIsSuccess(true);
      toast.success("¡Contraseña configurada con éxito!");
      
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Error al actualizar contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
           <Card className="max-w-md w-full border-none shadow-2xl rounded-3xl p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                 <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-bold">Link Inválido</h1>
              <p className="text-gray-500 text-sm">Este enlace de invitación no es válido o ha expirado. Por favor, solicita una nueva invitación.</p>
              <Button asChild className="w-full bg-blue-600 rounded-xl py-6 mt-4">
                 <a href="/login">Ir al Login</a>
              </Button>
           </Card>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full relative z-10"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-10">
           <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-xl shadow-blue-500/5 border border-gray-100">
              <Image src="/logo-removebg-cuadrado.png" alt="Logo" width={32} height={32} />
              <span className="font-black text-gray-900 tracking-tighter text-xl">TestimonialHub</span>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="setup-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl transition-all">
                 <CardHeader className="pt-10 px-10 text-center space-y-4">
                    <div className="mx-auto w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 rotate-3">
                       <KeyRound className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">¡Hola, {name || "bienvenido"}! 👋</CardTitle>
                      <CardDescription className="text-gray-500 font-medium">
                        Tu agencia te ha invitado. Vamos a configurar tu contraseña para que puedas empezar.
                      </CardDescription>
                    </div>
                 </CardHeader>

                 <CardContent className="p-10 pt-4">
                    <form onSubmit={handleSetup} className="space-y-6">
                       {/* EMAIL READ-ONLY */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Correo de acceso</label>
                          <div className="flex items-center gap-3 bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 text-gray-500 text-sm font-bold">
                             <UserCircle className="w-5 h-5 opacity-40" />
                             {email}
                          </div>
                       </div>

                       {/* TEMP PASSWORD */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Contraseña Temporal <span className="text-blue-500 ml-1">(de tu email)</span></label>
                          <div className="relative group">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <Input 
                                type={showPass ? "text" : "password"}
                                placeholder="Pega aquí la clave: Hub-..." 
                                value={tempPassword}
                                onChange={(e) => setTempPassword(e.target.value)}
                                className="pl-12 py-7 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-mono"
                                required
                             />
                             <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                             >
                                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                             </button>
                          </div>
                       </div>

                       <div className="h-px bg-gray-100 my-2 shadow-inner" />

                       {/* NEW PASSWORD */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Nueva Contraseña</label>
                          <div className="relative group">
                             <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <Input 
                                type="password" 
                                placeholder="Mínimo 8 caracteres" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-12 py-7 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm"
                                required
                             />
                          </div>
                       </div>

                       {/* CONFIRM PASSWORD */}
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Confirma Contraseña</label>
                          <div className="relative group">
                             <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <Input 
                                type="password" 
                                placeholder="Repite la contraseña" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-12 py-7 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm"
                                required
                             />
                          </div>
                       </div>

                       {/* STRENGTH INDICATOR */}
                       <div className="flex gap-2 px-2">
                          <div className={cn("h-1.5 flex-1 rounded-full transition-all", isStrong ? "bg-green-500" : "bg-gray-200")} />
                          <div className={cn("h-1.5 flex-1 rounded-full transition-all", isStrong && match ? "bg-green-500" : "bg-gray-200")} />
                          <div className={cn("h-1.5 flex-1 rounded-full transition-all", isStrong && match ? "bg-green-500" : "bg-gray-200")} />
                       </div>

                       <Button 
                        type="submit" 
                        disabled={isLoading || !isStrong || !match}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-8 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 h-auto"
                       >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                               <Activity className="w-5 h-5 animate-spin" />
                               Procesando...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                               Activar Cuenta <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                       </Button>
                    </form>
                 </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="border-none shadow-2xl rounded-[40px] p-12 bg-white flex flex-col items-center space-y-6">
                 <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                 </div>
                 <div className="space-y-2">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">¡Todo Listo, {name}!</h1>
                    <p className="text-gray-500 font-medium">Tu cuenta ha sido activada correctamente. Ahora puedes ingresar al dashboard con tu nueva contraseña.</p>
                 </div>
                 <Button 
                   onClick={() => router.push("/login")}
                   className="w-full bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest py-8 rounded-2xl shadow-xl transition-all h-auto"
                 >
                    Ir al Login de la Agencia
                 </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-gray-400 text-xs font-medium">
           © 2026 TestimonialHub. Área de Colaboradores.
        </p>
      </motion.div>
    </div>
  );
}

export default function InvitacionConfigurarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="h-10 w-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /></div>}>
      <InvitacionConfigurarContent />
    </Suspense>
  );
}
