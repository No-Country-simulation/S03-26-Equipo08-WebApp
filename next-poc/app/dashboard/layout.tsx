"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-700">
      
      {/* MODERN LIGHT SIDEBAR WRAPPER */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              width: isCollapsed ? 80 : 288 // w-20 to w-72
            }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 md:relative z-50 bg-white border-r border-gray-100 shadow-sm transition-all duration-150"
          >
            <Sidebar 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen} 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed} 
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CLEAN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">
        {/* Responsive Navbar Toggle (Mobile or when sidebar is fully closed) */}
        {!isSidebarOpen && (
          <div className="h-20 flex items-center px-8 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95 group"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <span className="ml-4 text-sm font-semibold text-gray-500">Abrir Panel Lateral</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="max-w-[1400px] mx-auto px-6 py-8 md:px-10 md:py-10 transition-all duration-300">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
