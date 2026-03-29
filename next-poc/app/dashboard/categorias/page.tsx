"use client";

import { 
  Plus, 
  Trash2, 
  Edit3, 
  Tags, 
  Layers, 
  BarChart2, 
  Hash,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const categoriesData = [
  { id: 1, name: "Producto", color: "bg-blue-500", count: 4, hex: "#3b82f6" },
  { id: 2, name: "Evento", color: "bg-purple-500", count: 2, hex: "#a855f7" },
  { id: 3, name: "Cliente", color: "bg-emerald-500", count: 3, hex: "#10b981" },
  { id: 4, name: "Industria", color: "bg-orange-500", count: 2, hex: "#f97316" },
];

const tagsData = [
  "eficiencia", "transformación-digital", "satisfacción", "networking", 
  "aprendizaje", "comunidad", "marketing", "ROI", "productividad"
];

export default function CategoriesPage() {
  const [tags, setTags] = useState(tagsData);
  const [newTag, setNewTag] = useState("");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([newTag, ...tags]);
      setNewTag("");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categorías & Etiquetas</h1>
          <p className="text-gray-500 font-medium">Gestiona la clasificación de tus testimonios</p>
        </div>
        <button className="saas-button-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Categories Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-2 px-2">
             <Layers className="w-4 h-4 text-blue-600" />
             <h2 className="text-sm font-bold text-gray-900 tracking-tight">Clasificación Activa</h2>
          </div>
          
          <div className="space-y-4">
            {categoriesData.map((cat) => (
              <motion.div 
                key={cat.id}
                whileHover={{ y: -2 }}
                className="saas-card p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={cn("w-10 h-10 rounded-xl shadow-sm flex items-center justify-center text-white", cat.color)}>
                     <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-none mb-1">{cat.name}</h3>
                    <code className="text-[10px] font-bold text-gray-400 font-mono tracking-widest">{cat.hex}</code>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                   <div className="hidden sm:block text-right">
                      <p className="text-lg font-black text-gray-900 leading-none">{cat.count}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Activos</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Utilities */}
        <div className="space-y-8">
          {/* Tags Management */}
          <section className="saas-card p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Tags className="w-5 h-5 text-blue-600" />
                 <h2 className="text-base font-bold text-gray-900">Etiquetas (Tags)</h2>
              </div>
              <Badge className="bg-gray-100 text-gray-500 font-bold border-none rounded-lg">{tags.length}</Badge>
            </div>

            <form onSubmit={addTag} className="relative group">
               <input 
                 type="text" 
                 value={newTag}
                 onChange={(e) => setNewTag(e.target.value)}
                 placeholder="Nueva etiqueta..." 
                 className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-sm outline-none"
               />
               <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                  <Plus className="w-4 h-4" />
               </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div 
                  key={tag} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:bg-white hover:border-blue-100 hover:text-blue-600 transition-all cursor-default group/tag"
                >
                  <Hash className="w-3 h-3 opacity-40" />
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-red-400 hover:text-red-600 opacity-0 group-hover/tag:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Metrics Section */}
          <section className="saas-card p-8 space-y-8 bg-blue-600 border-none relative overflow-hidden group">
            {/* Visual Decor */}
            <div className="absolute top-0 right-0 p-6 opacity-10 flex pointer-events-none">
               <BarChart2 className="w-24 h-24 text-white" />
            </div>

            <div className="flex items-center gap-3 relative z-10">
               <Zap className="w-5 h-5 text-white fill-white" />
               <h2 className="text-base font-bold text-white tracking-tight">Métricas Rápidas</h2>
            </div>

            <div className="space-y-6 relative z-10">
               {categoriesData.slice(0, 3).map((cat) => (
                 <div key={cat.name} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">{cat.name}</span>
                       <span className="text-xs font-bold text-white opacity-80">{cat.count} docs</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(cat.count / 4) * 100}%` }}
                         className="h-full bg-white rounded-full" 
                       />
                    </div>
                 </div>
               ))}
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between group/more cursor-pointer">
               <p className="text-xs font-bold text-blue-50">Gestionar todo</p>
               <ArrowRight className="w-4 h-4 text-white group-hover/more:translate-x-2 transition-transform" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
