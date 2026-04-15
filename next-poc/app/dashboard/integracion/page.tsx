"use client";

import { 
  Code2, 
  Copy, 
  Globe, 
  ChevronDown, 
  Eye, 
  Terminal, 
  Check, 
  ArrowUpRight,
  Star,
  Activity,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const apiExamples = {
  javascript: `// GET Testimonials API
fetch('https://api.testimonialscms.com/v1/testimonials?status=approved', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
  curl: `curl -X GET https://api.testimonialscms.com/v1/testimonials \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  python: `import requests

url = "https://api.testimonialscms.com/v1/testimonials"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`
};

export default function IntegrationPage() {
  const [activeApiTab, setActiveApiTab] = useState<'javascript' | 'curl' | 'python'>('javascript');
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Tarjeta Elite');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const embedCode = `<!-- TestimonialsCMS Widget -->
<div data-testimonials-widget="1" data-style="modern-silk"></div>
<script src="https://cdn.testimonialscms.com/v1/embed.js" async></script>`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Integraciones & Embeds</h1>
          <p className="text-gray-500 font-medium">Implementación de prueba social en sitios externos</p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-2 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          API STATUS: ONLINE
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Configuration Section */}
        <div className="space-y-8">
           <section className="saas-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                 <Settings className="w-5 h-5 text-blue-600" />
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Configuración del Widget</h2>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Origen de Datos</label>
                    <div className="relative group">
                       <select className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl outline-none transition-all font-semibold text-sm text-gray-900 appearance-none cursor-pointer focus:bg-white">
                          <option>Colección Principal // Todos los aprobados</option>
                          <option>Segmento: SaaS Enterprise</option>
                          <option>Segmento: Testimonios de Video</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">Estilo Visual</label>
                    <div className="relative group">
                       <select 
                         value={selectedStyle}
                         onChange={(e) => setSelectedStyle(e.target.value)}
                         className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl outline-none transition-all font-semibold text-sm text-gray-900 appearance-none cursor-pointer focus:bg-white"
                       >
                          <option>Tarjeta Moderna Silk</option>
                          <option>Grid de Alta Densidad</option>
                          <option>Muro de Confianza (Masonry)</option>
                          <option>Carousel Dinámico</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                 </div>
              </div>
           </section>

           <section className="saas-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">Código de Integración</h2>
                 </div>
                 <button 
                   onClick={() => copyToClipboard(embedCode)}
                   className="saas-button-primary py-2 text-xs flex items-center gap-2"
                 >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado' : 'Copiar'}
                 </button>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-2xl relative overflow-hidden group">
                 <pre className="text-blue-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {embedCode}
                 </pre>
                 <div className="absolute top-2 right-2 opacity-10">
                    <Terminal className="w-8 h-8 text-white" />
                 </div>
              </div>
              <p className="text-[11px] font-medium text-gray-400 italic text-center">
                 Inserte este código antes del cierre de la etiqueta &lt;/body&gt; en su sitio web.
              </p>
           </section>
        </div>

        {/* Live Preview Section */}
        <section className="saas-card p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <Eye className="w-5 h-5 text-blue-600" />
             <h2 className="text-lg font-bold text-gray-900 tracking-tight">Vista Previa</h2>
          </div>
          
          <div className="flex-1 min-h-[400px] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
             <AnimatePresence mode="wait">
               {selectedStyle === 'Tarjeta Moderna Silk' && (
                 <motion.div 
                   key="silk"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="w-full max-w-sm bg-white p-8 rounded-3xl border border-gray-50 shadow-xl flex flex-col gap-6 transition-all hover:shadow-2xl"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xl border-4 border-blue-50 shadow-sm">MG</div>
                       <div className="space-y-0.5">
                          <h4 className="text-base font-bold text-gray-900 leading-none">María González</h4>
                          <p className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">CEO // TechStart</p>
                       </div>
                    </div>
                    <div className="flex gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic font-medium">
                       &quot;Este producto transformó nuestra gestión de prueba social. La eficiencia aumentó un 300% desde que lo integramos.&quot;
                    </p>
                 </motion.div>
               )}

               {selectedStyle === 'Grid de Alta Densidad' && (
                 <motion.div 
                    key="grid"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="grid grid-cols-2 gap-4 w-full"
                 >
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                            <div className="flex gap-0.5">
                               {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                            </div>
                         </div>
                         <p className="text-[10px] text-gray-500 line-clamp-2">Excelente herramienta, muy recomendada.</p>
                      </div>
                    ))}
                 </motion.div>
               )}

               {selectedStyle === 'Muro de Confianza (Masonry)' && (
                 <motion.div 
                    key="masonry"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col gap-4 w-full max-w-md"
                 >
                    <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg space-y-4">
                       <p className="text-sm italic font-medium">&quot;Simplemente increíble. No puedo imaginarme trabajando sin esto ahora.&quot;</p>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20" />
                          <div>
                             <p className="text-xs font-bold">Roberto Sánchez</p>
                             <p className="text-[10px] opacity-70">Fundador @ EcoSolutions</p>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-4">
                       <p className="text-sm text-gray-600 italic">&quot;La mejor inversión que hemos hecho este año.&quot;</p>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100" />
                          <p className="text-xs font-bold text-gray-900">Ana Rodríguez</p>
                       </div>
                    </div>
                 </motion.div>
               )}

               {selectedStyle === 'Carousel Dinámico' && (
                 <motion.div 
                    key="carousel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 w-full"
                 >
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 cursor-pointer">&lt;</div>
                    <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-50 shadow-xl text-center space-y-4">
                       <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto" />
                       <div className="space-y-1">
                          <h4 className="font-bold">Laura Fernández</h4>
                          <div className="flex justify-center gap-1">
                             {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                          </div>
                       </div>
                       <p className="text-gray-500 text-sm italic">&quot;La integración fue pan comido. ¡Excelente soporte!&quot;</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 cursor-pointer">&gt;</div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </section>
      </div>

      {/* REST API Reference Row */}
      <section className="saas-card p-10 space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
               <Globe className="w-6 h-6 text-blue-600" />
               <h2 className="text-xl font-bold text-gray-900 tracking-tight">Documentación API</h2>
            </div>
            <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
               {(['javascript', 'curl', 'python'] as const).map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveApiTab(tab)}
                   className={cn(
                     "px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-tight transition-all",
                     activeApiTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-900"
                   )}
                 >
                    {tab}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-gray-900 p-8 rounded-2xl relative overflow-hidden group">
               <AnimatePresence mode="wait">
                  <motion.pre 
                    key={activeApiTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="text-blue-100 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-blue-600 selection:text-white"
                  >
                     {apiExamples[activeApiTab]}
                  </motion.pre>
               </AnimatePresence>
               <button 
                 onClick={() => copyToClipboard(apiExamples[activeApiTab])}
                 className="absolute bottom-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/5"
               >
                  <Copy className="w-4 h-4" />
               </button>
            </div>

            <div className="lg:col-span-4 space-y-6 py-4">
               <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                 <ArrowUpRight className="w-4 h-4 text-blue-600" />
                 Configuración Técnica
               </h3>
               <ul className="space-y-3">
                  {[
                    "Autenticación Bearer Token",
                    "Respuesta JSON Estándar",
                    "Rate Limit: 1000 rq/min",
                    "Soporte Webhooks v1"
                  ].map((item, i) => (
                    <li key={i} className="text-xs font-semibold text-gray-500 flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-100 border border-blue-400" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>
    </div>
  );
}
