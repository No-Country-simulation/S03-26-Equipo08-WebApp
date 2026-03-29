"use client";

import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Star,
  User,
  Video,
  Check,
  X,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const testimonialsData = [
  { 
    id: 1, 
    user: "Ana Rodríguez", 
    role: "Marketing Manager", 
    company: "Creative Agency Plus",
    date: "15 de marzo, 2026",
    content: "Llevamos usando la plataforma por 6 meses y los resultados hablan por sí solos. Nuestras campañas tienen mejor ROI y el proceso de integración fue sorprendentemente sencillo.", 
    rating: 4, 
    status: "pending", 
    category: "Análisis",
    hasVideo: false
  },
  { 
    id: 2, 
    user: "Roberto Sánchez", 
    role: "Freelance Designer", 
    company: "Studio 8",
    date: "10 de marzo, 2026",
    content: "La simplicidad de la interfaz es lo que más me atrajo. Como freelance, necesito herramientas que no me quiten tiempo y TestimonialsCMS hace exactamente lo que promete.", 
    rating: 5, 
    status: "pending", 
    category: "Diseño",
    hasVideo: true
  },
  { 
    id: 5, 
    user: "Carlos Mendoza", 
    role: "Operador de Sistemas", 
    company: "Global Retail Corp",
    date: "12 de marzo, 2026",
    content: "Participar en el evento anual fue una experiencia increíble. Las conexiones que hice y el conocimiento que adquirí son invaluables.", 
    rating: 5, 
    status: "pending", 
    category: "Evento",
    hasVideo: false
  },
  { 
    id: 3, 
    user: "Alex Rivera", 
    role: "Senior Developer", 
    company: "TechFlow",
    date: "5 de marzo, 2026",
    content: "Una API robusta y una documentación impecable. Como dev, aprecio mucho la facilidad con la que pude integrar los testimonios en mis proyectos.", 
    rating: 5, 
    status: "approved", 
    category: "Software",
    hasVideo: false
  }
];

export default function ModerationPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  
  const filteredTestimonials = testimonialsData.filter(t => t.status === selectedTab);
  
  const counts = {
    pending: testimonialsData.filter(t => t.status === 'pending').length,
    approved: testimonialsData.filter(t => t.status === 'approved').length,
    rejected: testimonialsData.filter(t => t.status === 'rejected').length
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Moderación</h1>
          <p className="text-gray-500 font-medium">Revisión y filtrado de testimonios entrantes</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar testimonio..." 
            className="pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none w-full md:w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'pending', label: 'Pendientes', count: counts.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
          { id: 'approved', label: 'Aprobados', count: counts.approved, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { id: 'rejected', label: 'Rechazados', count: counts.rejected, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
        ].map((stat) => (
          <motion.div 
            key={stat.id}
            onClick={() => setSelectedTab(stat.id as 'pending' | 'approved' | 'rejected')}
            whileHover={{ y: -4 }}
            className={cn(
              "p-6 rounded-2xl border bg-white shadow-sm flex items-center justify-between cursor-pointer transition-all",
              selectedTab === stat.id ? cn(stat.border, "ring-2 ring-offset-2 ring-opacity-10", stat.bg === 'bg-orange-50' ? "ring-orange-500" : stat.bg === 'bg-emerald-50' ? "ring-emerald-500" : "ring-red-500") : "border-gray-50 hover:bg-gray-50/50"
            )}
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mb-1">{stat.label}</p>
              <p className={cn("text-3xl font-bold", stat.color)}>{stat.count}</p>
            </div>
            <div className={cn("p-4 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm overflow-hidden">
        {(['pending', 'approved', 'rejected'] as const).map((tab) => (
          <button 
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all",
              selectedTab === tab ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-gray-400 hover:text-gray-900"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredTestimonials.map((t) => (
            <motion.div 
              key={t.id}
              layout
              className="saas-card p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm font-bold text-gray-500 overflow-hidden">
                       <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-none">{t.user}</h3>
                      <p className="text-xs font-medium text-gray-400 mt-1">{t.role} en {t.company}</p>
                    </div>
                  </div>
                  {t.hasVideo && (
                    <div className="p-2 bg-red-50 rounded-xl">
                      <Video className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-100 fill-gray-100")} />
                        ))}
                      </div>
                      <Badge className="bg-gray-50 text-gray-500 border-none font-bold text-[10px] uppercase rounded-lg px-2 shadow-inner">{t.category}</Badge>
                   </div>
                   <p className="text-gray-600 text-base leading-relaxed italic font-medium">
                     &quot;{t.content}&quot;
                   </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic opacity-70">Enviado el {t.date}</span>
                   {t.status !== 'pending' && (
                     <Badge className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-bold uppercase border-none",
                        t.status === 'approved' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                     )}>
                        {t.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                     </Badge>
                   )}
                </div>

                {t.status === 'pending' && (
                  <div className="flex items-center gap-4">
                    <button className="flex-1 px-4 py-2.5 bg-white border border-gray-100 text-gray-900 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm flex items-center justify-center gap-2 group">
                      <X className="w-4 h-4 group-hover:scale-110" />
                      Rechazar
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 group">
                      <Check className="w-4 h-4 group-hover:scale-110" />
                      Aprobar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-50 flex flex-col items-center">
          <ShieldCheck className="w-16 h-16 text-gray-200 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Todo despejado</h3>
          <p className="text-gray-400 font-medium">No hay registros pendientes de moderación en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
