"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Avatar, 
  AvatarFallback, 
} from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { 
  LogOut, 
  ChevronRight,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserButtonProps {
  isCollapsed: boolean;
}

export default function UserButton({ isCollapsed }: UserButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data: activeMember } = authClient.useActiveMember();
  const { data: activeOrg } = authClient.useActiveOrganization();
  
  const user = session?.user;
  
  // Detección de Rol para el Subtexto
  const manualMemberRole = activeOrg?.members?.find(m => m.userId === user?.id)?.role;
  const userRole = activeMember?.role || manualMemberRole || "ROL";
  const userRoleName = userRole === "owner" ? "Dueño" : userRole === "member" ? "Editor" : "ROL";

  // Iniciales dinámicas
  const getInitials = (name: string = "") => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err: unknown) {
      console.error("Logout error:", err);
    }
  };

  if (!user) return null;

  return (
    <div className={cn(
      "p-4 border-t border-gray-100 bg-white transition-all duration-150",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none">
          <button className={cn(
            "w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-gray-50 group relative outline-none",
            isCollapsed ? "justify-center" : "text-left"
          )}>
             <Avatar className="h-8 w-8 shrink-0 rounded-lg shadow-sm border border-gray-100">
               <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-bold">
                 {getInitials(user.name)}
               </AvatarFallback>
             </Avatar>
             
             <AnimatePresence mode="wait">
               {!isCollapsed && (
                 <motion.div 
                   initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                   animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                   exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                   transition={{ duration: 0.2, ease: "easeInOut" }}
                   className="flex-1 min-w-0 overflow-hidden"
                 >
                   <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{user.name}</p>
                   <p className="text-[11px] font-medium text-gray-400 truncate mt-0.5">{userRoleName}</p>
                 </motion.div>
               )}
             </AnimatePresence>

             <motion.div 
               animate={{ 
                 opacity: isCollapsed ? 0 : 0.4,
                 scale: isCollapsed ? 0 : 1,
               }}
               transition={{ duration: 0.2, ease: "easeOut" }}
               className="flex flex-col gap-0.5"
             >
               <ChevronRight className="w-3 h-3 rotate-[-90deg]" />
               <ChevronRight className="w-3 h-3 rotate-[90deg]" />
             </motion.div>

             {isCollapsed && (
               <div className="absolute left-[calc(100%+8px)] px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-3 z-[100] whitespace-nowrap shadow-xl">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  {user.name}
               </div>
             )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl border-gray-100" align={isCollapsed ? "center" : "end"} side="right" sideOffset={isCollapsed ? 12 : 8}>
           <DropdownMenuLabel className="p-3">
              <div className="flex items-center gap-3">
                 <Avatar className="h-10 w-10 border border-gray-100 rounded-xl">
                    <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold text-xs uppercase">
                       {getInitials(user.name)}
                    </AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col min-w-0">
                    <p className="text-sm font-black text-gray-900 truncate tracking-tight leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate font-medium">{user.email}</p>
                 </div>
              </div>
           </DropdownMenuLabel>
           <DropdownMenuSeparator className="mx-2" />
           
           <Link href="/dashboard/perfil">
              <DropdownMenuItem className="rounded-xl p-3 flex items-center gap-3 cursor-pointer focus:bg-indigo-50 group">
                 <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-focus:text-indigo-600 group-focus:bg-white transition-all">
                    <Settings className="w-4 h-4" />
                 </div>
                 <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-700">Mi Perfil</span>
                    <span className="text-[9px] text-gray-400 font-medium">Gestionar cuenta y seguridad</span>
                 </div>
              </DropdownMenuItem>
           </Link>

           <DropdownMenuSeparator className="mx-2" />
           
           <DropdownMenuItem 
             onClick={handleLogout}
             className="rounded-xl p-3 flex items-center gap-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 transition-all font-bold"
           >
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-400">
                 <LogOut className="w-4 h-4" />
              </div>
              Cerrar Sesión
           </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button 
        onClick={handleLogout}
        className={cn(
          "w-full mt-4 flex items-center text-xs font-semibold text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all relative group/logout",
          isCollapsed ? "justify-center p-2.5" : "gap-3 px-4 py-2.5"
        )}
      >
        <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/logout:-translate-x-0.5" />
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="whitespace-nowrap overflow-hidden"
            >
              Cerrar Sesión
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
