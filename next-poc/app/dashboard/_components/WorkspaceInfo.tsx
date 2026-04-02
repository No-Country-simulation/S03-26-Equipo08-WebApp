"use client";

import { authClient } from "@/lib/auth-client";
import { 
  Building2, 
  ShieldCheck, 
  User as UserIcon, 
  Hash,
  Database,
  ArrowRightLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkspaceInfo() {
  const { data: session } = authClient.useSession();
  const { data: activeOrg, isPending: isOrgPending } = authClient.useActiveOrganization();
  const { data: activeMember, isPending: isMemberPending } = authClient.useActiveMember();
  
  if (!session) return null;

  return (
    <Card className="bg-white border-gray-100 shadow-sm rounded-2xl overflow-hidden mt-6">
      <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-6">
        <div className="flex items-center justify-between">
           <CardTitle className="text-sm font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 italic">
              <Database className="w-4 h-4" /> Centro de Datos del Espacio
           </CardTitle>
           <Badge variant="outline" className="bg-white text-blue-600 border-blue-100 font-bold">
              Better Auth v1.x Session
           </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Usuario Info */}
        <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <UserIcon className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Usuario Conectado</p>
              <p className="font-black text-gray-900 tracking-tight">{session.user.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                 <Hash className="w-3 h-3 text-gray-300" />
                 <code className="text-[10px] text-gray-400 font-mono italic">{session.user.id}</code>
              </div>
           </div>
        </div>

        {/* Organizacion Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Building2 className="w-4 h-4 text-blue-500" />
                 <h4 className="font-bold text-gray-900 text-sm">Organización Activa</h4>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[80px] flex flex-col justify-center">
                 {isOrgPending ? (
                    <div className="animate-pulse flex space-x-1"><div className="h-2 w-2 bg-gray-200 rounded-full"></div><div className="h-2 w-2 bg-gray-200 rounded-full"></div></div>
                 ) : activeOrg ? (
                    <>
                       <p className="font-black text-blue-700 tracking-tight">{activeOrg.name}</p>
                       <p className="text-[10px] text-gray-400 font-mono truncate mt-1">{activeOrg.id}</p>
                    </>
                 ) : (
                    <p className="text-xs text-gray-400 italic">Sin organización activa en sesión</p>
                 )}
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <h4 className="font-bold text-gray-900 text-sm">Rol en Member Table</h4>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[80px] flex flex-col justify-center">
                 {isMemberPending ? (
                    <div className="animate-pulse flex space-x-1"><div className="h-2 w-2 bg-gray-200 rounded-full"></div><div className="h-2 w-2 bg-gray-200 rounded-full"></div></div>
                 ) : activeMember ? (
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="font-black text-emerald-700 uppercase tracking-tighter">{activeMember.role === 'owner' ? 'DUEÑO' : 'EDITOR'}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">Nivel de Acceso: {activeMember.role}</p>
                       </div>
                       <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                       </div>
                    </div>
                 ) : (
                    <p className="text-xs text-gray-400 italic">Rol no detectado (400 Request)</p>
                 )}
              </div>
           </div>
        </div>

        {/* Accion rapida */}
        <div className="pt-4">
           <button className="text-[10px] font-bold text-blue-600 flex items-center gap-2 hover:translate-x-1 transition-transform group">
              <ArrowRightLeft className="w-3.5 h-3.5" /> RE-VERIFICAR CONEXIÓN CON TABLA MEMBER
           </button>
        </div>
      </CardContent>
    </Card>
  );
}
