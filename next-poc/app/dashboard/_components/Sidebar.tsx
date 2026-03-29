"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Code2,
  Globe,
  Layers,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Avatar, 
  AvatarFallback, 
} from "@/components/ui/avatar";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Testimonios", href: "/dashboard/ver-testimonios", icon: MessageSquareQuote },
  { name: "Moderación", href: "/dashboard/moderacion", icon: ShieldCheck },
  { name: "Categorías", href: "/dashboard/categorias", icon: Layers },
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

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 relative z-30 shadow-sm transition-all duration-150">
      {/* Header / Brand */}
      <div className={cn(
        "h-20 flex items-center border-b border-gray-50 transition-all duration-150",
        isCollapsed ? "justify-center px-0" : "justify-between px-6"
      )}>
        <Link href="/" className="flex items-center group">
          {/* <div className="p-2 bg-blue-600 rounded-lg shadow-sm shrink-0">
             <Star className="text-white w-5 h-5 fill-white" />
          </div> */}
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
        
        {/* Toggle Button for Desktop */}
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

        {/* Close Button for Mobile */}
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
                /* TOOLTIP FOR COLLAPSED MODE */
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

      {/* Bottom Section - User Profile (Shadcn style) */}
      <div className={cn(
        "p-4 border-t border-gray-100 bg-white transition-all duration-150",
        isCollapsed ? "px-2" : "px-4"
      )}>
        <button className={cn(
          "w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-gray-50 group",
          isCollapsed ? "justify-center" : "text-left"
        )}>
           <Avatar className="h-8 w-8 shrink-0 rounded-lg shadow-sm border border-gray-100">
             {/* <AvatarImage src="/dashboard/avatar.jpg" /> */}
             <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-bold">HG</AvatarFallback>
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
                 <p className="text-sm font-bold text-gray-900 truncate">Hernán García</p>
                 <p className="text-[11px] font-medium text-gray-400 truncate">hernan@hub.com</p>
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
                Hernán García
             </div>
           )}
        </button>

        <button className={cn(
          "w-full mt-4 flex items-center text-xs font-semibold text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all relative group/logout",
          isCollapsed ? "justify-center p-2.5" : "gap-3 px-4 py-2.5"
        )}>
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
          
          {isCollapsed && (
             <div className="absolute left-[calc(100%+8px)] px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-3 z-[100] whitespace-nowrap shadow-xl">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
                Cerrar Sesión
             </div>
          )}
        </button>
      </div>
    </div>
  );
}
