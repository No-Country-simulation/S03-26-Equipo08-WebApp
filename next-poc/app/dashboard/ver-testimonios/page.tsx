"use client";

import { 
  Search, 
  Plus, 
  Star, 
  Video, 
  Eye, 
  Edit3, 
  Trash2, 
  X,
  Play,
  Database,
  Loader2
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { seedMockTestimonialsAction } from "@/lib/actions/testimonials";
import { toast } from "sonner";


const initialTestimonials = [
  { 
    id: "1", 
    name: "María González", 
    role: "CEO", 
    company: "TechStart Solutions", 
    content: "Este producto transformó completamente nuestra manera de trabajar. La eficiencia aumentó un 300% y nuestro equipo está más feliz que nunca. Altamente recomendado para cualquier empresa que busque optimizar sus procesos.", 
    rating: 5, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", 
    videoUrl: "https://www.youtube.com/watch?v=dQw124124", 
    categories: ["Producto", "Cliente"], 
    tags: ["eficiencia", "transformación digital"], 
    status: "aprobado",
    initials: "MG"
  },
  { 
    id: "2", 
    name: "Carlos Mendoza", 
    role: "Director de Operaciones", 
    company: "Global Retail Corp", 
    content: "Participar en el evento anual fue una experiencia increíble. Las conexiones que hice y el conocimiento que adquirí son invaluables. El equipo organizador hizo un trabajo excepcional.", 
    rating: 5, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", 
    videoUrl: null, 
    categories: ["Evento", "Industria"], 
    tags: ["networking", "aprendizaje"], 
    status: "aprobado",
    initials: "CM"
  },
  { 
    id: "3", 
    name: "Ana Rodríguez", 
    role: "Gerente de Marketing", 
    company: "Creative Agency Plus", 
    content: "Llevamos usando la plataforma por 6 meses y los resultados hablan por sí solos. Nuestras campañas tienen mejor ROI y el proceso de creación es mucho más ágil.", 
    rating: 4, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", 
    videoUrl: null, 
    categories: ["Producto", "Industria"], 
    tags: ["marketing", "ROI"], 
    status: "pendiente",
    initials: "AR"
  },
  { 
    id: "4", 
    name: "Roberto Sánchez", 
    role: "Fundador", 
    company: "EcoSolutions Ltd", 
    content: "La conferencia superó todas mis expectativas. Los speakers fueron de primer nivel y la organización impecable. Ya estoy ansioso por la próxima edición.", 
    rating: 5, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto", 
    videoUrl: "https://www.youtube.com/watch?v=dQw124124", 
    categories: ["Evento", "conferencia"], 
    tags: ["Innovación"], 
    status: "pendiente",
    initials: "RS"
  },
  { 
    id: "5", 
    name: "Laura Fernández", 
    role: "VP de Tecnología", 
    company: "FinTech Innovations", 
    content: "Excelente servicio al cliente y un producto que realmente resuelve problemas reales. La integración fue sencilla y el soporte técnico siempre disponible.", 
    rating: 5, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", 
    videoUrl: null, 
    categories: ["Producto", "Cliente"], 
    tags: ["soporte", "integración"], 
    status: "aprobado",
    initials: "LF"
  },
  { 
    id: "6", 
    name: "Diego Torres", 
    role: "CTO", 
    company: "DataDriven Co", 
    content: "No estoy seguro si este producto es adecuado para nosotros. Algunos features faltan y otros no funcionan como esperábamos.", 
    rating: 3, 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", 
    videoUrl: null, 
    categories: ["Producto"], 
    tags: ["feedback", "mejoras"], 
    status: "rechazado",
    initials: "DT"
  }
];

export default function TestimoniosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos los estados");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [previewTestimonial, setPreviewTestimonial] = useState<(typeof initialTestimonials)[0] | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const filtered = useMemo(() => {
    return initialTestimonials.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "Todos los estados" || 
                           t.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const handleSeed = async () => {
    setIsSeeding(true);
    const res = await seedMockTestimonialsAction();
    if (res.success) {
      toast.success(`¡Éxito! Se migraron ${res.count} testimonios a la DB.`);
    } else {
      toast.error(res.error || "No se pudo migrar la información.");
    }
    setIsSeeding(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header and Quick Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mis Testimonios</h1>
          <p className="text-gray-500 font-medium">Gestiona y visualiza todos tus testimonios recibidos</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            disabled={isSeeding}
            onClick={handleSeed}
            className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-amber-100 transition-all disabled:opacity-50"
          >
            {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            Sembrar Mocks en DB
          </button>
          <Link href="/dashboard/ver-testimonios/nuevo" className="saas-button-primary flex items-center gap-2 w-fit">
            <Plus className="w-5 h-5" />
            Nuevo Testimonio
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, empresa o contenido..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <select 
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none cursor-pointer focus:ring-2 focus:ring-blue-100 shadow-sm appearance-none font-semibold text-gray-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Todas las categorías</option>
            <option>Producto</option>
            <option>Cliente</option>
            <option>Evento</option>
            <option>Industria</option>
          </select>
        </div>

        <div className="relative">
          <select 
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none cursor-pointer focus:ring-2 focus:ring-blue-100 shadow-sm appearance-none font-semibold text-gray-600"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>Todos los estados</option>
            <option>Aprobado</option>
            <option>Pendiente</option>
            <option>Rechazado</option>
          </select>
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-500 px-1">Mostrando {filtered.length} de {initialTestimonials.length} testimonios</p>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filtered.map((t) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="saas-card p-8 space-y-6 flex flex-col justify-between relative"
          >
            {/* Red Video Icon for video testimonials as in screenshot */}
            {t.videoUrl && (
              <div className="absolute top-6 right-6 p-2 bg-red-50 rounded-xl">
                 <Video className="w-5 h-5 text-red-500" />
              </div>
            )}

            <div className="space-y-6">
              {/* Card Header Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center bg-gray-100 relative">
                   <Image src={t.image} alt={t.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-gray-900 leading-none">{t.name}</h3>
                  <p className="text-sm font-medium text-gray-400">{t.role} en {t.company}</p>
                  <div className="flex gap-1 pt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-100 fill-gray-100")} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Content Text */}
               <p className="text-sm font-medium text-gray-500 leading-relaxed line-clamp-3 italic">
                &quot; {t.content} &quot;
              </p>

              {/* Badges Bar */}
              <div className="flex flex-wrap gap-2">
                {t.categories.map(c => (
                  <Badge key={c} className="bg-blue-50 text-blue-600 border-none px-3 py-1 font-semibold text-[11px] rounded-lg">
                    {c}
                  </Badge>
                ))}
                {t.tags.map(tag => (
                  <Badge key={tag} className="bg-white text-gray-900 border border-gray-100 px-3 py-1 font-semibold text-[11px] rounded-lg shadow-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
               <Badge className={cn(
                 "text-[10px] uppercase font-bold px-3 py-1 rounded-lg border-none",
                 t.status === 'aprobado' ? "bg-emerald-50 text-emerald-600" : 
                 t.status === 'pendiente' ? "bg-orange-50 text-orange-600" : 
                 "bg-red-50 text-red-600"
               )}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
               </Badge>

               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setPreviewTestimonial(t)}
                    className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                     <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
                     <Edit3 className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                     <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal - As in screenshot */}
      <AnimatePresence>
        {previewTestimonial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewTestimonial(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                       <Eye className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Vista Previa</h2>
                 </div>
                 <button 
                   onClick={() => setPreviewTestimonial(null)}
                   className="p-2 hover:bg-gray-50 rounded-xl transition-all"
                 >
                    <X className="w-5 h-5 text-gray-400" />
                 </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-50 shadow-sm flex items-center justify-center bg-gray-100 relative">
                        <Image src={previewTestimonial.image} alt={previewTestimonial.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold text-gray-900">{previewTestimonial.name}</h3>
                       <p className="text-sm font-medium text-gray-400">{previewTestimonial.role} en {previewTestimonial.company}</p>
                       <div className="flex gap-1.5 pt-1">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} className={cn("w-5 h-5", i < previewTestimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-100 fill-gray-100")} />
                          ))}
                       </div>
                    </div>
                 </div>

                 <p className="text-xl font-medium text-gray-600 leading-relaxed italic">
                    &quot; {previewTestimonial.content} &quot;
                 </p>

                 {/* Video Player Placeholder as in image */}
                 <div className="aspect-video bg-blue-50/30 rounded-2xl border border-blue-50 flex flex-col items-center justify-center gap-4 group relative overflow-hidden">
                    <Play className="w-12 h-12 text-blue-300 group-hover:scale-110 group-hover:text-blue-500 transition-all cursor-pointer" />
                    <p className="text-xs font-bold text-blue-400 tracking-tight flex items-center gap-2">
                       Video URL: <span className="opacity-60">{previewTestimonial.videoUrl || 'Sin video vinculado'}</span>
                    </p>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    {previewTestimonial.categories.map((c: string) => (
                      <Badge key={c} className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 font-bold text-xs rounded-xl">
                        {c}
                      </Badge>
                    ))}
                    {previewTestimonial.tags.map((tag: string) => (
                      <Badge key={tag} className="bg-white text-gray-900 border border-gray-100 px-4 py-1.5 font-bold text-xs rounded-xl shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                 </div>
              </div>

               {/* Modal Footer */}
               <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setPreviewTestimonial(null)}
                    className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-900 transition-all"
                  >
                    Cerrar
                  </button>
                  <button className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Editar Testimonio
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
