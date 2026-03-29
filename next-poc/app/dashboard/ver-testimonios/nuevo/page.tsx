"use client";

import { 
  ArrowLeft, 
  Plus, 
  Star, 
  Video, 
  Upload, 
  X,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function NuevoTestimonioPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const suggestedTags = [
    "eficiencia", "transformación digital", "satisfacción", "networking", 
    "aprendizaje", "comunidad", "marketing", "ROI", "productividad", 
    "conferencia", "innovación", "soporte", "integración", "calidad", 
    "feedback", "mejoras"
  ];

  const categories = ["Producto", "Evento", "Cliente", "Industria"];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-start gap-4 mb-2">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 mt-1 text-gray-900 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-base">Volver</span>
        </button>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Nuevo Testimonio</h1>
          <p className="text-gray-500 font-medium text-lg">Completa la información del testimonio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Sección: Información Básica */}
        <section className="saas-card p-10 space-y-8">
          <h2 className="text-xl font-bold text-gray-900">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2.5">
              <label className="text-base font-bold text-gray-900">Nombre completo *</label>
              <input 
                type="text" 
                placeholder="Ej: María González" 
                className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
              />
            </div>
            
            <div className="space-y-2.5">
              <label className="text-base font-bold text-gray-900">Cargo *</label>
              <input 
                type="text" 
                placeholder="Ej: CEO" 
                className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
              />
            </div>
            
            <div className="space-y-2.5 md:col-span-2">
              <label className="text-base font-bold text-gray-900">Empresa *</label>
              <input 
                type="text" 
                placeholder="Ej: TechStart Solutions" 
                className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
              />
            </div>

            <div className="space-y-2.5 md:col-span-2">
              <label className="text-base font-bold text-gray-900">Calificación</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base transition-all hover:bg-gray-100 cursor-pointer shadow-sm">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={cn(
                            "w-5 h-5",
                            s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
                          )} 
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-base font-bold text-gray-900">({rating} {rating === 1 ? 'estrella' : 'estrellas'})</span>
                    <div className="ml-auto">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 mt-2 z-[110]">
                  <DropdownMenuRadioGroup value={rating.toString()} onValueChange={(v) => setRating(parseInt(v))}>
                    {[5, 4, 3, 2, 1].map((s) => (
                      <DropdownMenuRadioItem 
                        key={s} 
                        value={s.toString()} 
                        className="flex items-center gap-3 py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer outline-none focus:bg-gray-50"
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "w-4 h-4",
                                star <= s ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
                              )} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-600">({s} {s === 1 ? 'estrella' : 'estrellas'})</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* Sección: Contenido del Testimonio */}
        <section className="saas-card p-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Contenido del Testimonio</h2>
          
          <div className="space-y-3">
            <label className="text-base font-bold text-gray-900">Testimonio *</label>
            <textarea 
              placeholder="Escribe el testimonio aquí..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[140px] px-6 py-5 bg-gray-50 border-transparent rounded-2xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none leading-relaxed text-gray-600"
            />
            <p className="text-sm font-medium text-gray-400">{content.length} caracteres</p>
          </div>
        </section>

        {/* Sección: Multimedia */}
        <section className="saas-card p-10 space-y-8">
          <h2 className="text-xl font-bold text-gray-900">Multimedia</h2>
          
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-base font-bold text-gray-900">URL de la imagen</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://ejemplo.com/imagen.jpg" 
                  className="flex-1 px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
                />
                <button className="p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group shadow-sm bg-white">
                  <Upload className="w-5 h-5 text-gray-900" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <label className="text-base font-bold text-gray-900">URL de video (opcional)</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://youtube.com/watch?v=..." 
                  className="flex-1 px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
                />
                <button className="p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group shadow-sm bg-white">
                  <Video className="w-5 h-5 text-gray-900" />
                </button>
              </div>
              <p className="text-sm font-medium text-gray-400">Compatible con YouTube, Vimeo y Cloudinary</p>
            </div>
          </div>
        </section>

        {/* Sección: Categorías */}
        <section className="saas-card p-10 space-y-8">
          <h2 className="text-xl font-bold text-gray-900">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-xl text-base font-semibold transition-all border",
                  selectedCategories.includes(cat)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Sección: Etiquetas */}
        <section className="saas-card p-10 space-y-8">
          <h2 className="text-xl font-bold text-gray-900">Etiquetas (Tags)</h2>
          
          <div className="space-y-8">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Agregar nueva etiqueta..." 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-5 py-3.5 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-600"
              />
              <button 
                onClick={addTag}
                className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-base shadow-sm hover:bg-black transition-all active:scale-95"
              >
                Agregar
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pb-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-4 py-2 font-bold text-xs rounded-xl flex items-center gap-2 group transition-all">
                    {tag}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTags(tags.filter(t => t !== tag));
                      }}
                      className="ml-1 cursor-pointer pointer-events-auto hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900">Etiquetas sugeridas:</p>
              <div className="flex flex-wrap gap-2.5">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => !tags.includes(tag) && setTags([...tags, tag])}
                    className="px-4 py-2 rounded-xl border border-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all hover:border-gray-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Moderación */}
        <section className="saas-card p-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Estado de Moderación</h2>
          
          <div className="relative group">
             <select className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-xl text-base focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none appearance-none font-semibold text-gray-700 cursor-pointer">
               <option>⏳ Pendiente de revisión</option>
               <option>✅ Aprobado</option>
               <option>❌ Rechazado</option>
             </select>
             <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-900 transition-colors">
                <ChevronDown className="w-5 h-5" />
             </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div 
        className="fixed bottom-0 right-0 z-40 p-8 bg-white/80 backdrop-blur-xl border-t border-gray-50 transition-all shadow-[0_-20px_25px_-5px_rgba(0,0,0,0.03)]"
        style={{ left: "var(--sidebar-width, 0px)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">

          <button 
            className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
            Crear Testimonio
          </button>
          <button 
            onClick={() => router.back()}
            className="px-8 py-4 bg-white border border-gray-100 text-gray-500 rounded-2xl font-bold text-base hover:bg-gray-50 transition-all hover:text-gray-900"
          >
            Cancelar
          </button>
        </div>
      </div>

    </div>
  );
}
