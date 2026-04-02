"use client";

import { authClient } from "@/lib/auth-client";
import { 
  Mail, 
  Shield, 
  Building2, 
  BadgeCheck, 
  UserCircle2,
  Hash,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PerfilPage() {
  const { data: session } = authClient.useSession();
  const { data: userOrgs, isPending: isOrgsPending } = authClient.useListOrganizations();
  const { data: activeOrg } = authClient.useActiveOrganization();
  const { data: activeMember } = authClient.useActiveMember();

  const user = session?.user;

  if (!user) {
    return <div className="flex items-center justify-center h-[60vh] text-gray-400 font-medium italic">Iniciando sesión...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 pb-20 animate-in fade-in duration-500">
      
      {/* Perfil Header */}
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-blue-600 mb-1">
            <UserCircle2 className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest leading-none">Identidad de Usuario</span>
         </div>
         <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mi Perfil</h1>
         <p className="text-gray-500 font-medium">Gestiona tu información personal y visualiza tus accesos globales.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
         {/* Datos Personales Column */}
         <div className="md:col-span-1 space-y-6">
            <Card className="border-none shadow-xl shadow-blue-100/30 rounded-3xl overflow-hidden bg-white">
               <div className="h-24 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 flex justify-end">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-md h-fit">
                     SaaS User
                  </Badge>
               </div>
               <CardContent className="px-6 pb-8 pt-0 relative">
                  <div className="-mt-10 mb-6">
                     <div className="w-20 h-20 bg-white rounded-3xl p-1 shadow-2xl">
                        <div className="w-full h-full bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl">
                           {user.name.charAt(0)}
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{user.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                           <Hash className="w-3 h-3" />
                           <code className="text-[10px] font-mono select-all truncate uppercase">{user.id}</code>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white transition-all">
                        <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="text-xs font-bold text-gray-600 truncate">{user.email}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none bg-blue-50/50 p-6 rounded-3xl border border-blue-100 italic">
               <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                  Esta información es global y se utiliza para identificarte en todos los espacios de trabajo a los que perteneces.
               </p>
            </Card>
         </div>

         {/* Organizations & Roles Column */}
         <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                     <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Mis Organizaciones</h2>
               </div>
               <Badge className="bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-[10px]">
                  {userOrgs?.length || 0} Espacios
               </Badge>
            </div>

            <div className="grid gap-4">
               {/* Botón de Emergencia para Activación */}
                  {userOrgs && userOrgs.length > 0 && (
                     <div className="mt-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                        <div className="flex items-start gap-4">
                           <div className="p-2 bg-white rounded-xl shadow-sm text-orange-600">
                              <ShieldAlert className="w-5 h-5" />
                           </div>
                           <div className="space-y-4">
                              <div>
                                 <h4 className="text-sm font-bold text-orange-900">Ayuda: ¿No ves tu organización?</h4>
                                 <p className="text-xs text-orange-700 leading-relaxed mt-1">
                                    Si ya creaste una organización desde Drizzle o Prisma, pero aquí no aparece, pulsa el botón de &quot;Forzar Activación&quot;. Esto forzará a Better Auth a sincronizar tu sesión con la base de datos.
                                 </p>
                              </div>
                              <Button 
                                 size="sm"
                                 variant="outline"
                                 className="bg-white border-orange-200 text-orange-600 hover:bg-orange-100 font-bold"
                                 onClick={() => {
                                    const firstOrg = userOrgs[0];
                                    authClient.organization.setActive({ organizationId: firstOrg.id });
                                    toast.success("Organización Activada");
                                 }}
                              >
                                 Forzar Activación
                              </Button>
                           </div>
                        </div>
                     </div>
                  )}

               {isOrgsPending ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-3xl" />
                  ))
               ) : userOrgs && userOrgs.length > 0 ? (
                  userOrgs.map((org) => {
                     const isActive = org.id === activeOrg?.id;
                     const myRole = isActive ? (activeMember?.role || "ROL") : "Miembro";
                     
                     return (
                        <motion.div 
                          key={org.id}
                          whileHover={{ scale: 1.01 }}
                          className={cn(
                            "group p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-100/20 transition-all flex items-center justify-between relative overflow-hidden",
                            isActive && "ring-2 ring-blue-600 ring-offset-2 border-transparent"
                          )}
                        >
                           {isActive && (
                              <div className="absolute top-0 right-0 p-2">
                                 <Badge className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">
                                    Activo
                                 </Badge>
                              </div>
                           )}
                           
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center text-xl font-black transition-colors border border-gray-100">
                                 {org.name.charAt(0)}
                              </div>
                              <div className="space-y-1">
                                 <h4 className="font-black text-gray-900 tracking-tight group-hover:text-blue-700 transition-colors">{org.name}</h4>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-gray-400 italic">#{org.id.slice(0, 8)}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-4">
                              <div className={cn(
                                 "flex flex-col items-end",
                                 myRole === "owner" ? "text-emerald-600" : myRole === "ROL" ? "text-red-500" : "text-blue-600"
                              )}>
                                 <div className="flex items-center gap-1.5 mb-1">
                                    <Shield className={cn("w-3.5 h-3.5", myRole === "owner" ? "text-emerald-500" : myRole === "ROL" ? "text-red-400" : "text-blue-500")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                                       {myRole === "owner" ? "Owner" : myRole === "ROL" ? "FALLO" : "Editor"}
                                    </span>
                                 </div>
                                 <p className="text-[11px] font-bold text-gray-400">Nivel de Acceso</p>
                              </div>
                              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <BadgeCheck className="w-5 h-5 text-blue-600" />
                              </div>
                           </div>
                        </motion.div>
                     );
                  })
               ) : (
                  <div className="p-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-3xl">
                     <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                     <p className="text-gray-400 font-bold">No perteneces a ninguna organización todavía.</p>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Visor de Debug - JSON de Sesión */}
      <Card className="border-none bg-gray-900 text-gray-400 p-8 rounded-3xl shadow-2xl overflow-hidden mt-12">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Debug: RAW Session Data</h3>
           </div>
           <Badge variant="outline" className="text-[10px] border-white/10 text-white/40">
              Solo visible en Desarrollo
           </Badge>
        </div>
        <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
           <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto">
              {JSON.stringify(session, null, 2)}
           </pre>
        </div>
        <p className="text-[10px] mt-4 text-gray-500 italic">
          * Verifica que el &quot;userId&quot; de este JSON coincida exactamente con el de la tabla &quot;member&quot; en Prisma Studio.
        </p>
      </Card>
    </div>
  );
}
