"use client";

import { 
  Key, 
  Globe, 
  Copy, 
  Check,
  Activity,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const endpointsData = {
  testimonios: [
    {
      title: "Listar Testimonios",
      method: "GET",
      path: "/v1/testimonials",
      desc: "Acceso global a la base de datos de prueba social con parámetros de filtrado avanzado.",
      params: [
        { name: "status", type: "string", desc: "Filtrar por estado: approved, pending, rejected" },
        { name: "category", type: "string", desc: "Filtrar por ID de categoría" },
        { name: "limit", type: "number", desc: "Número de resultados (default: 10)" },
      ],
      request: `GET /v1/testimonials?status=approved&limit=10\nAuthorization: Bearer YOUR_API_KEY`,
      response: `{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "1",
        "name": "María González",
        "role": "CEO",
        "company": "TechStart",
        "status": "approved"
      }
    ],
    "total": 6
  }
}`
    },
    {
      title: "Crear Testimonio",
      method: "POST",
      path: "/v1/testimonials",
      desc: "Inyección de nuevo contenido en el sistema para moderación.",
      params: [],
      request: `POST /v1/testimonials\nAuthorization: Bearer YOUR_API_KEY\nContent-Type: application/json\n\n{ "name": "Juan Perez", "content": "..." }`,
      response: `{ "success": true, "data": { "id": "2" } }`
    }
  ],
  categorias: [
    {
      title: "Clasificación",
      method: "GET",
      path: "/v1/categories",
      desc: "Recuperación de la taxonomía oficial del sistema.",
      params: [],
      request: `GET /v1/categories\nAuthorization: Bearer YOUR_API_KEY`,
      response: `{ "success": true, "data": { "categories": [...] } }`
    }
  ],
  auth: [
    {
      title: "Token de Acceso",
      method: "POST",
      path: "/v1/auth/token",
      desc: "Generación de tokens para sesiones externas.",
      params: [],
      request: `POST /v1/auth/token\n{ "client_id": "...", "client_secret": "..." }`,
      response: `{ "access_token": "...", "expires_in": 3600 }`
    }
  ]
};

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof endpointsData>('testimonios');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Documentación API</h1>
          <p className="text-gray-500 font-medium">Guía técnica para la integración de sistemas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-gray-800 transition-all">
          <FileText className="w-4 h-4" />
          Descargar OpenAPI / Spec
        </button>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="saas-card p-6 space-y-4">
            <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-blue-600" />
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Base URL</h3>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
               <code className="text-xs font-mono font-bold text-blue-600">https://api.testimonialscms.com/v1</code>
               <button onClick={() => copy("https://api.testimonialscms.com/v1", "base")} className="text-gray-400 hover:text-gray-900 transition-colors">
                  {copied === "base" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
               </button>
            </div>
         </div>

         <div className="saas-card p-6 space-y-4">
            <div className="flex items-center gap-3">
               <Key className="w-5 h-5 text-blue-600" />
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Autenticación</h3>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
               <code className="text-xs font-mono font-bold text-blue-600">Authorization: Bearer YOUR_KEY</code>
               <button onClick={() => copy("Authorization: Bearer YOUR_KEY", "auth")} className="text-gray-400 hover:text-gray-900 transition-colors">
                  {copied === "auth" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
               </button>
            </div>
         </div>
      </div>

      {/* Navigator Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
        {(Object.keys(endpointsData) as Array<keyof typeof endpointsData>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all",
              activeTab === key ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-gray-900"
            )}
          >
             {key}
          </button>
        ))}
      </div>

      {/* Endpoint Details */}
      <div className="space-y-12">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
               {endpointsData[activeTab].map((endpoint, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Info Card */}
                     <div className="saas-card p-8 space-y-8">
                        <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                           <div className="space-y-1">
                              <h3 className="text-xl font-bold text-gray-900 leading-none">{endpoint.title}</h3>
                              <code className="text-[10px] font-mono font-bold text-gray-400">{endpoint.path}</code>
                           </div>
                           <Badge className={cn(
                              "px-3 py-1 rounded-lg text-xs font-bold border-none",
                              endpoint.method === 'GET' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                           )}>
                              {endpoint.method}
                           </Badge>
                        </div>

                        <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
                           {endpoint.desc}
                        </p>

                        {endpoint.params.length > 0 && (
                          <div className="space-y-4">
                             <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-600" />
                                Parámetros
                             </h4>
                             <div className="space-y-2">
                                {endpoint.params.map(p => (
                                  <div key={p.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                     <div className="flex items-center gap-3">
                                        <Badge className="bg-gray-900 text-white font-mono text-[10px] lowercase px-2 py-0.5 rounded-md">{p.name}</Badge>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase">{p.type}</span>
                                     </div>
                                     <p className="text-xs font-semibold text-gray-400">{p.desc}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>

                     {/* Code Card */}
                     <div className="space-y-4">
                        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                           <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Protocolo de Request</span>
                              <Copy className="w-3.5 h-3.5 text-white/40 cursor-pointer" onClick={() => copy(endpoint.request, `req-${i}`)} />
                           </div>
                           <pre className="p-6 text-blue-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                              {endpoint.request}
                           </pre>
                        </div>

                        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                           <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Modelo JSON de Response</span>
                              <Copy className="w-3.5 h-3.5 text-white/40 cursor-pointer" onClick={() => copy(endpoint.response, `res-${i}`)} />
                           </div>
                           <pre className="p-6 text-blue-100 font-mono text-xs leading-relaxed overflow-x-auto">
                              {endpoint.response}
                           </pre>
                        </div>
                     </div>
                  </div>
               ))}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
