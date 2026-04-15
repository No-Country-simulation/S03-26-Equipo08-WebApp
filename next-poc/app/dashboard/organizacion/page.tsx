"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Building2, 
  Cloud, 
  Save, 
  ArrowLeft, 
  Loader2, 
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrganizationConfigAction, getOrganizationConfigAction } from "@/lib/actions/organizations";

export default function OrganizacionSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Auth States
  authClient.useSession();
  const { data: member, isPending: isMemberPending } = authClient.useActiveMember();

  // Settings States
  const [orgName, setOrgName] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [hasSecret, setHasSecret] = useState(false);

  // Visibility States
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (isMemberPending) return;
    
    // 🛡️ Redirección de seguridad: Si no es owner, lo sacamos al perfil
    if (member?.role !== "owner") {
       toast.error("No tienes permisos para acceder a esta sección.");
       router.push("/dashboard/perfil");
       return;
    }

    const loadOrg = async () => {
      try {
        const res = await getOrganizationConfigAction();
        if (res.success && res.data) {
          setOrgName(res.data.name || "");
          setCloudName(res.data.cloudinaryCloudName || "");
          setApiKey(res.data.cloudinaryApiKey || "");
          setApiSecret(res.data.cloudinaryApiSecret || ""); // Cargamos el secret actual
          setHasSecret(res.data.hasApiSecret || false);
        } else {
          toast.error("No se pudo cargar la configuración");
        }
      } catch {
        toast.error("Error de conexión");
      } finally {
        setIsPageLoading(false);
      }
    };
    loadOrg();
  }, [member, isMemberPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateOrganizationConfigAction({
        name: orgName,
        cloudinaryCloudName: cloudName,
        cloudinaryApiKey: apiKey,
        cloudinaryApiSecret: apiSecret || undefined,
      });

      if (res.success) {
        toast.success("¡Configuración actualizada!");
        setApiSecret("");
        setHasSecret(true);
      } else {
        toast.error(res.error || "Error al actualizar");
      }
    } catch {
      toast.error("Error de servidor");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading || member?.role !== "owner") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20 animate-in fade-in duration-500">
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
           <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-widest leading-none">Ajustes de Empresa</span>
           </div>
           <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mi Organización</h1>
           <p className="text-gray-500 font-medium text-lg">Configura el nombre y las integraciones de tu agencia.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="space-y-8">
            <Card className="border-none shadow-xl shadow-blue-100/30 rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Información General</CardTitle>
                    <CardDescription className="text-blue-100/80 mt-1">Nombre público de tu empresa en el CMS.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Nombre de la Organización</label>
                  <Input 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="py-8 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white px-8 text-lg font-bold text-gray-800 shadow-sm"
                    required
                    placeholder="Ej: Mi Agencia Digital"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-indigo-100/30 rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <Cloud className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Integración Multimedia</CardTitle>
                    <CardDescription className="text-indigo-100/80 mt-1">Configura Cloudinary para almacenar tus testimonios.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Cloud Name</label>
                    <Input 
                      placeholder="Identificador de tu nube" 
                      value={cloudName}
                      onChange={(e) => setCloudName(e.target.value)}
                      className="py-7 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white px-6 font-medium text-gray-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">API Key</label>
                    <div className="relative group">
                      <Input 
                        type={showKey ? "text" : "password"}
                        placeholder="Tu Cloudinary API Key" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="py-7 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white px-6 pr-14 font-medium text-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center justify-between">
                    API Secret
                    {hasSecret && (
                      <span className="flex items-center gap-1 text-emerald-500 text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3" /> CONFIGURADO
                      </span>
                    )}
                  </label>
                  <div className="relative group">
                    <Input 
                      type={showSecret ? "text" : "password"} 
                      placeholder={hasSecret ? "••••••••••••••••••••••••" : "Tu Cloudinary API Secret"} 
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      className="py-7 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white px-6 pr-14 font-medium text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 italic px-2">
                    {hasSecret ? "Si dejas este campo vacío, se mantendrá el secreto actual." : "Requerido para habilitar la subida de multimedia."}
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full bg-indigo-600 hover:bg-black py-8 rounded-2xl font-bold text-xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Save className="w-6 h-6" />
                    )}
                    {isLoading ? "Guardando cambios..." : "Guardar Configuración"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="space-y-6">
          <Card className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200 transition-colors" />
            <h4 className="font-black text-blue-900 text-lg mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5" /> Guía de Configuración
            </h4>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Paso 1</p>
                <p className="text-sm text-blue-800/70 leading-relaxed font-medium">
                  En tu consola de Cloudinary, busca la sección <span className="font-bold text-blue-900">&quot;Product Environment&quot;</span> y pulsa el botón azul <span className="font-bold text-blue-900">&quot;Go to API Keys&quot;</span>.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Paso 2</p>
                <p className="text-sm text-blue-800/70 leading-relaxed font-medium">
                  Copia el <span className="font-bold text-blue-900">Cloud Name</span>, la <span className="font-bold text-blue-900">API Key</span> y pulsa en el ojo del <span className="font-bold text-blue-900">API Secret</span>.
                </p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl border border-blue-100/50">
                <p className="text-[11px] text-blue-600 leading-tight italic">
                  * Nota: Cloudinary podría enviarte un código a su email para revelarte el API Secret. ¡Es normal y seguro!
                </p>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto font-black text-sm hover:translate-x-2 transition-transform mt-4" asChild>
                <a href="https://cloudinary.com/console" target="_blank" rel="noopener noreferrer">Ir a Cloudinary Console &rarr;</a>
              </Button>
            </div>
          </Card>

          <Card className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100 shadow-sm">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="font-black text-amber-900 text-lg">Nota de Seguridad</h4>
                <p className="text-sm text-amber-800/70 leading-relaxed font-medium">
                  Las credenciales se almacenan de forma segura y se utilizan únicamente para procesar las imágenes de tus testimonios.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
