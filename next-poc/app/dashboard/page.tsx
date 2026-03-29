"use client";

import { 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Globe,
  MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const stats = [
  { label: "Total Testimonios", value: "6", subtitle: "Todos los testimonios", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Aprobados", value: "3", subtitle: "Publicados en el sitio", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pendientes", value: "2", subtitle: "Esperando revisión", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Rechazados", value: "1", subtitle: "No aprobados", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
];

const categories = [
  { name: "Producto", count: 4, color: "bg-blue-500", total: 4 },
  { name: "Cliente", count: 3, color: "bg-emerald-500", total: 4 },
  { name: "Evento", count: 2, color: "bg-purple-500", total: 4 },
  { name: "Industria", count: 2, color: "bg-orange-500", total: 4 },
];

const recentTestimonials = [
  { id: 1, name: "Ana Rodríguez", company: "Creative Agency Plus", status: "pendiente", statusColor: "saas-badge-warning" },
  { id: 2, name: "Roberto Sánchez", company: "EcoSolutions Ltd", status: "pendiente", statusColor: "saas-badge-warning" },
  { id: 3, name: "Diego Torres", company: "DataDriven Co", status: "rechazado", statusColor: "saas-badge-error" },
  { id: 4, name: "María González", company: "TechStart Solutions", status: "aprobado", statusColor: "saas-badge-success" },
  { id: 5, name: "Carlos Mendoza", company: "Global Retail Corp", status: "aprobado", statusColor: "saas-badge-success" },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 font-medium">Resumen general del sistema de testimonios</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="saas-card p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">{stat.label}</span>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className={cn("text-3xl font-bold", stat.label === 'Rechazados' ? 'text-red-600' : stat.label === 'Pendientes' ? 'text-orange-600' : 'text-gray-900')}>
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-gray-400">{stat.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution Card */}
        <div className="saas-card p-8 space-y-8">
          <div className="flex items-center gap-3">
             <TrendingUp className="w-5 h-5 text-blue-600" />
             <h2 className="text-lg font-bold text-gray-900">Distribución por Categoría</h2>
          </div>
          
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-gray-600">{cat.name}</span>
                  <span className="text-sm font-bold text-gray-900">{cat.count}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.count / cat.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", cat.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Testimonials List Card */}
        <div className="saas-card p-8 space-y-8">
          <div className="flex items-center gap-3">
             <Users className="w-5 h-5 text-blue-600" />
             <h2 className="text-lg font-bold text-gray-900">Testimonios Recientes</h2>
          </div>
          
          <div className="divide-y divide-gray-50">
            {recentTestimonials.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-inner flex items-center justify-center text-gray-500 font-bold border-2 border-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</h4>
                    <p className="text-xs font-medium text-gray-400">{t.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <span className={cn("uppercase text-[10px] tracking-tight px-3 py-1 rounded-full font-bold", t.status === 'aprobado' ? 'bg-emerald-50 text-emerald-600' : t.status === 'pendiente' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600')}>
                     {t.status}
                   </span>
                   
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="p-1.5 text-gray-300 hover:text-gray-900 rounded-lg transition-colors border border-transparent hover:border-gray-100 bg-gray-50/50">
                           <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-black mb-4 mx-auto sm:mx-0">
                             {t.name.charAt(0)}
                          </div>
                          <DialogTitle className="text-3xl tracking-tighter">{t.name}</DialogTitle>
                          <DialogDescription className="text-lg">
                            Representando a <span className="text-gray-900 font-bold">{t.company}</span>
                          </DialogDescription>
                        </DialogHeader>
                        
                         <div className="mt-8 p-8 bg-gray-50/50 rounded-3xl border border-gray-100">
                            <p className="text-gray-700 italic text-xl leading-relaxed">
                              &quot;Testimonial Hub ha transformado nuestra manera de recolectar feedback. La elegancia y la rapidez son incomparables.&quot;
                            </p>
                         </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                           <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all">Aprobar</button>
                           <button className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-bold hover:text-rose-600 hover:border-rose-100 transition-all">Rechazar</button>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions (Bottom as per screenshot) */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="saas-card p-6 flex flex-col gap-4 cursor-pointer border-dashed border-2 hover:border-blue-200"
           >
              <div className="flex items-center justify-between">
                 <div className="p-2.5 bg-blue-50 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                 </div>
                 <ArrowRight className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-1">
                 <h4 className="font-bold text-gray-900">Nuevo Testimonio</h4>
                 <p className="text-sm text-gray-400">Crear uno nuevo</p>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="saas-card p-6 flex flex-col gap-4 cursor-pointer border-dashed border-2 hover:border-orange-200"
           >
              <div className="flex items-center justify-between">
                 <div className="p-2.5 bg-orange-50 rounded-xl">
                    <Clock className="w-5 h-5 text-orange-600" />
                 </div>
                 <Badge className="bg-orange-100 text-orange-700 text-[10px] px-2">2 esperando</Badge>
              </div>
              <div className="space-y-1">
                 <h4 className="font-bold text-gray-900">Revisar Pendientes</h4>
                 <p className="text-sm text-gray-400">Moderación activa</p>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="saas-card p-6 flex flex-col gap-4 cursor-pointer border-dashed border-2 hover:border-purple-200"
           >
              <div className="flex items-center justify-between">
                 <div className="p-2.5 bg-purple-50 rounded-xl">
                    <Globe className="w-5 h-5 text-purple-600" />
                 </div>
                 <ArrowRight className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-1">
                 <h4 className="font-bold text-gray-900">Ver Embeds</h4>
                 <p className="text-sm text-gray-400">Código de integración</p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
