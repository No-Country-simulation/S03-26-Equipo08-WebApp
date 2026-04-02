"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Users, 
  Send, 
  Copy, 
  Smartphone,
  History,
  CheckCircle2,
  ChevronRight,
  Clock,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessData {
  email?: string;
  inviteLink?: string;
  loginLink?: string;
  tempPassword?: string;
  type: "editor" | "visitor";
}

export default function InvitacionesPage() {
  const { data: activeOrg, isPending: isOrgPending } = authClient.useActiveOrganization();
  const { data: activeMember, isPending: isMemberPending } = authClient.useActiveMember();
  
  // Role Detection usando el hook oficial para máxima precisión
  const userRole = activeMember?.role || "ROL";
  const isOwner = userRole === "owner";

  const [activeTab, setActiveTab] = useState<"editor" | "visitor">(isOwner ? "editor" : "visitor");
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  // Mock History
  const history = [
     { id: 1, name: "Maria Garcia", email: "maria@example.com", type: "visitor", status: "sent", date: "15 de marzo, 2026" },
     { id: 2, name: "Carlos Ruiz", email: "carlos@tech.com", type: "editor", status: "pending", date: "10 de marzo, 2026" },
  ].filter(item => isOwner || item.type === "visitor");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrg) return;

    setIsLoading(true);
    setSuccessData(null);

    try {
      if (activeTab === "editor") {
        const response = await fetch("/api/invite-editor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            organizationId: activeOrg.id,
            organizationName: activeOrg.name,
          }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Error al invitar editor");
        
        setSuccessData({ ...result, type: "editor" });
        toast.success("¡Invitación enviada!");
      } else {
        const response = await fetch("/api/invitations/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorName: name,
            visitorEmail: email || null,
            organizationId: activeOrg.id,
            sendEmail, 
          }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Error al generar invitación");

        setSuccessData({ ...result.data, type: "visitor" });
        toast.success("¡Link generado!");
      }
      
      setName("");
      setEmail("");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Error al procesar la invitación");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  if (isOrgPending || isMemberPending) return <div className="flex items-center justify-center h-[60vh]"><div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* Header - Siguiendo el estilo de Moderación */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invitaciones</h1>
          <p className="text-gray-500 font-medium">Gestiona el acceso de colaboradores y clientes</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar en historial..." 
            className="pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none w-full md:w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Selector de Pestañas Estilo Moderación */}
      <div className="flex items-center gap-1 p-1 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm overflow-hidden">
        {isOwner && (
          <button 
            onClick={() => { setActiveTab("editor"); setSuccessData(null); }}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all",
              activeTab === "editor" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-gray-400 hover:text-gray-900"
            )}
          >
            Invitar Editor
          </button>
        )}
        <button 
          onClick={() => { setActiveTab("visitor"); setSuccessData(null); }}
          className={cn(
            "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all",
            activeTab === "visitor" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-gray-400 hover:text-gray-900"
          )}
        >
          Invitar Visitante
        </button>
      </div>

      {/* Card de Formulario */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden border border-gray-50">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {!successData ? (
               <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleInvite} 
                  className="max-w-3xl space-y-8"
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter ml-1">
                           {activeTab === "editor" ? "Nombre Completo" : "Nombre del Cliente / Marca"}
                        </label>
                        <Input 
                           placeholder={activeTab === "editor" ? "Ej. Carlos García" : "Ej. Boutique Las Mercedes"} 
                           value={name} 
                           onChange={(e) => setName(e.target.value)} 
                           className="py-6 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all font-medium text-sm" 
                           required 
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter ml-1">Correo Electrónico</label>
                        <Input 
                           type="email" 
                           placeholder="correo@empresa.com" 
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)} 
                           className="py-6 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all font-medium text-sm" 
                           required={activeTab === "editor" || sendEmail} 
                        />
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-blue-50/30 rounded-2xl border border-blue-50">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                           <Send className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-bold text-blue-900">Enviar invitación automática por email</p>
                     </div>
                     <button 
                        type="button"
                        onClick={() => setSendEmail(!sendEmail)}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border",
                          sendEmail ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-blue-200 text-blue-400"
                        )}
                     >
                        {sendEmail ? "Habilitado" : "Deshabilitado"}
                     </button>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full md:w-fit px-12 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-sm shadow-md shadow-blue-100 h-auto"
                  >
                     {isLoading ? "Procesando..." : activeTab === "editor" ? "Invitar Colaborador" : "Generar Acceso Cliente"}
                  </Button>
               </motion.form>
            ) : (
               <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
               >
                  <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                     <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-emerald-900 leading-tight">¡Invitación Creada!</h3>
                        <p className="text-sm text-emerald-700 font-medium">El acceso para {successData.email || "tu cliente"} está listo.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enlace Directo</p>
                        <div className="flex items-center justify-between gap-3">
                           <code className="text-xs font-mono text-blue-600 truncate flex-1">{successData.inviteLink || successData.loginLink}</code>
                           <Button variant="ghost" size="icon" onClick={() => copyToClipboard((successData.inviteLink || successData.loginLink) || "")} className="h-8 w-8 rounded-lg bg-white shadow-sm border border-gray-100"><Copy className="w-3.5 h-3.5" /></Button>
                        </div>
                     </div>
                     
                     {successData.tempPassword && (
                        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                           <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Contraseña Temporal</p>
                           <div className="flex items-center justify-between">
                              <p className="text-xl font-bold text-amber-900 font-mono tracking-tighter">{successData.tempPassword}</p>
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(successData.tempPassword || "")} className="h-8 w-8 rounded-lg bg-white shadow-sm border border-amber-200"><Copy className="w-3.5 h-3.5" /></Button>
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                     <Button asChild className="bg-[#25D366] hover:bg-[#1DA851] px-8 py-6 rounded-xl font-bold h-auto shadow-sm">
                        <a href={`https://wa.me/?text=${encodeURIComponent(`Tu acceso: ${successData.inviteLink || successData.loginLink}`)}`} target="_blank">
                           <Smartphone className="w-4 h-4 mr-2" /> WhatsApp
                        </a>
                     </Button>
                     <Button onClick={() => setSuccessData(null)} variant="outline" className="px-8 py-6 rounded-xl font-bold h-auto border-gray-200 bg-white">
                        Crear Otra
                     </Button>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Historial - Grid similar a Moderación */}
      <div className="space-y-6 pt-4">
         <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <History className="w-5 h-5 text-gray-400" />
            Registro Reciente
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {history.map((item) => (
               <div key={item.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                           item.type === "editor" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                        )}>
                           {item.type === "editor" ? <Users className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                        </div>
                        <div>
                           <p className="font-bold text-gray-900 leading-none">{item.name}</p>
                           <p className="text-xs font-medium text-gray-400 mt-1">{item.email}</p>
                        </div>
                     </div>
                     <Badge className={cn(
                        "px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase",
                        item.status === 'sent' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                     )}>
                        {item.status}
                     </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic opacity-70">
                        <Clock className="w-3 h-3" />
                        {item.date}
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
