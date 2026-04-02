"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ChevronLeft,
  MessageSquareQuote,
  Code2,
  Globe,
  Layers,
  Users,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import UserButton from "./UserButton";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Testimonios", href: "/dashboard/ver-testimonios", icon: MessageSquareQuote },
  { name: "Invitaciones", href: "/dashboard/invitaciones", icon: UserPlus },
  { name: "Moderación", href: "/dashboard/moderacion", icon: ShieldCheck },
  { name: "Categorías", href: "/dashboard/categorias", icon: Layers },
  { name: "Equipo", href: "/dashboard/equipo", icon: Users, ownerOnly: true },
  { name: "Embeds", href: "/dashboard/integracion", icon: Globe },
  { name: "API Docs", href: "/dashboard/api-docs", icon: Code2 },
];

interface SidebarProps {
  setIsOpen: (val: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function Sidebar({ setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const { data: userOrgs } = authClient.useListOrganizations();
  const { data: activeOrg, isPending: isOrgPending } = authClient.useActiveOrganization();
  const { data: activeMember } = authClient.useActiveMember();
  
  const hasActivated = useRef(false);

  // Lógica de Rol detectada por Better Auth
  const manualMemberRole = activeOrg?.members?.find(m => m.userId === user?.id)?.role;
  const userRole = activeMember?.role || manualMemberRole || "ROL";

  // Auto-activación silenciosa del primer espacio (solo una vez)
  useEffect(() => {
    if (userOrgs && userOrgs.length > 0 && !activeOrg && !isOrgPending && !hasActivated.current) {
       hasActivated.current = true;
       authClient.organization.setActive({
         organizationId: userOrgs[0].id
       });
    }
  }, [userOrgs, activeOrg, isOrgPending]);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 relative z-30 shadow-sm transition-all duration-150">
      {/* Header / Brand */}
      <div className={cn(
        "h-20 flex items-center border-b border-gray-50 transition-all duration-150",
        isCollapsed ? "justify-center px-0" : "justify-between px-6"
      )}>
        <Link href="/" className="flex items-center group">
          <motion.div 
            whileHover={{ rotateY: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="[perspective:1000px] shrink-0"
          >
            <Image
              src="/logo-removebg-cuadrado.png"
              alt="Logo"
              width={36}
              height={36}
              priority
              className="object-contain shrink-0"
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <Image
                  src="/logo-removebg-texto.png"
                  alt="TestimonialHub"
                  width={130}
                  height={32}
                  priority
                  style={{ width: "130px", height: "auto" }}
                  className="object-contain shrink-0"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        
        {/* Toggle Button Desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 self-center absolute -right-3 top-7 bg-white border border-gray-100 shadow-sm z-50"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Close Button Mobile */}
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 lg:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className={cn(
        "flex-1 overflow-visible py-6 space-y-1 transition-all duration-150",
        isCollapsed ? "px-2" : "px-4"
      )}>
        {navigation.map((item) => {
          if (item.ownerOnly && userRole !== "owner") return null;
          
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl transition-all font-medium text-sm relative",
                isCollapsed ? "justify-center p-2.5" : "gap-3 px-4 py-2.5",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
              )} />
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="whitespace-nowrap overflow-hidden font-medium text-sm"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {isCollapsed && (
                <div className="absolute left-[calc(100%+8px)] px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 translate-x-1 group-hover:translate-x-3 z-[100] whitespace-nowrap shadow-xl">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  {item.name}
                </div>
              )}

              {isActive && (
                <motion.div 
                  layoutId="active-nav-bg"
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-1 h-3/5 bg-blue-600 rounded-l-full",
                    isCollapsed ? "right-[-8px]" : "right-0"
                  )}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Button Footer */}
      <UserButton isCollapsed={isCollapsed} />
    </div>
  );
}
