"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Users, 
  Trash2, 
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Member {
  id: string;
  role: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
}

export default function EquipoPage() {
  const { data: session } = authClient.useSession();
  const { data: activeOrg, isPending: isOrgPending } = authClient.useActiveOrganization();
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Role Detection
  const userRole = activeOrg?.members?.find(m => m.userId === session?.user?.id)?.role || "member";
  const isOwner = userRole === "owner";

  const handleRemoveMember = async (memberId: string, memberEmail: string) => {
    if (!window.confirm(`¿Estás seguro de quitar el acceso a ${memberEmail}?`)) return;
    
    setIsLoading(true);
    try {
      await authClient.organization.removeMember({
        memberIdOrEmail: memberId
      });
      toast.success("Miembro eliminado correctamente");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Error al eliminar miembro");
    } finally {
      setIsLoading(false);
    }
  };

  if (isOrgPending) {
    return <div className="flex flex-col items-center justify-center h-[60vh]"><div className="h-10 w-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /></div>;
  }

  if (!activeOrg) {
    return <div className="p-20 text-center">No hay una organización activa seleccionada.</div>;
  }

  // If not owner, show restricted view or redirect
  if (!isOwner) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <Card className="max-w-md w-full border-none shadow-2xl rounded-[40px] p-10 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center rotate-3">
               <AlertCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">Acceso Restringido</h2>
               <p className="text-gray-500 font-medium italic">Esta sección es exclusiva para el Dueño de la agencia. Si necesitas ayuda, contacta con administración.</p>
            </div>
            <Button asChild className="w-full bg-gray-900 py-6 rounded-2xl font-black uppercase tracking-widest h-auto">
               <a href="/dashboard">Volver al Inicio</a>
            </Button>
         </Card>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
            Gestión de Equipo
          </h1>
          <p className="text-lg text-gray-500 font-medium">Control total sobre los accesos a <span className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4">{activeOrg.name}</span>.</p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
           </div>
           <p className="text-sm font-bold text-gray-900">{activeOrg.members.length} Miembros Activos</p>
        </div>
      </div>

      <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-xl rounded-[48px] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Colaborador</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Rol</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 font-bold"><div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Ingreso</div></th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeOrg.members.map((member: Member) => (
                  <tr key={member.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl border-2 border-white shadow-sm ring-1 ring-gray-100">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-xs font-black">
                            {member.user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <p className="text-base font-bold text-gray-900 truncate leading-none mb-1">{member.user.name}</p>
                          <p className="text-xs text-gray-400 font-medium truncate opacity-70 italic">{member.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="outline" className={cn(
                        "text-[10px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-lg border-2",
                        member.role === "owner" ? "border-amber-100 bg-amber-50 text-amber-600" : "border-blue-100 bg-blue-50 text-blue-600"
                      )}>
                        {member.role === "owner" ? "Dueño" : "Editor"}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-600 tabular-nums">
                        {new Date(member.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {member.role !== "owner" ? (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          disabled={isLoading}
                          onClick={() => handleRemoveMember(member.id, member.user.email)}
                          className="h-12 w-12 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 hover:shadow-sm hover:shadow-red-500/10 transition-all active:scale-95"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center opacity-20">
                           <Building2 className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="p-8 bg-blue-600/5 border border-blue-100/50 rounded-[40px] flex flex-col md:flex-row items-center gap-8 justify-between">
         <div className="space-y-1">
            <h4 className="text-lg font-black text-blue-900 tracking-tight">¿Necesitas agregar más personas?</h4>
            <p className="text-sm text-blue-700/70 font-bold italic">Envía invitaciones rápidas a nuevos colaboradores o visitantes.</p>
         </div>
         <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest px-10 py-7 rounded-2xl shadow-xl shadow-blue-500/20 h-auto">
            <a href="/dashboard/invitaciones">Ir a Invitaciones</a>
         </Button>
      </div>
    </div>
  );
}
