import { useEffect, useState } from "react"
import { getTestimonios } from "../../services/testimonios"
import { API_BASE_URL } from '../../config/api';

export function Embeds () {

    const [testimoniosApi , setTestimoniosApi] = useState([])

    useEffect(() => {
        const obtenerTestimonios = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${API_BASE_URL}/api/testimonials/search?status=PUBLISHED` , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })


            
            if(!res.ok) {
                console.log("ERROR:" , res.status);
                return;
            }
            const data = await res.json();

            if (Array.isArray(data)) {
                setTestimoniosApi(data);
            } else if (Array.isArray(data.content)) {
                setTestimoniosApi(data.content);
            }

            console.log("TESTIMONIOS A LA API OBTENIDOS!!" , data);
        
        } catch (error) {
            console.error("Error al obtener los productos para la Api" , error);
        }
        }
        obtenerTestimonios()
    },[])

    

    return (
        <>
            <h2 style={{fontSize:'xx-large'}} className="text-2xl font-bold">Embeds y Código de Integración</h2>
            <p>Integra testimonios en tu sitio web</p>

            <pre className="bg-black text-green-400 p-4 rounded">
                GET /api/testimonials/search?status=APPROVED
            </pre>
            <pre className="bg-black text-green-400 p-4 rounded mt-2">
                {`fetch("${API_BASE_URL}/api/testimonials/search?status=PUBLISHED")
                .then(res => res.json())
                .then(data => console.log(data));`}
            </pre>
            <pre className="bg-black text-green-400 p-4 rounded mt-2">
                {`[
                    {
                        "firstName": "Juan",
                        "comentario": "Muy buen servicio",
                        "rating": 5
                        }
                    ]`}
            </pre>
            <h3 className="text-lg font-semibold mt-6">Vista real (API simulada)</h3>

        {testimoniosApi.length === 0 ? (
  <p className="text-gray-500">No hay testimonios aprobados</p>
) : (
  testimoniosApi.map(t => (
    <div key={t.id} className="border p-3 mt-2 rounded">

      <p><b>{t.authorName}</b></p>
      <p>{t.content}</p>
      <p>⭐ {t.rating}</p>

      {/* 🔥 MEDIA VA ADENTRO */}
      {t.mediaAssets?.map((media, index) => {

        if (media.provider === "CLOUDINARY") {
          return (
            <img
              key={index}
              src={media.url}
              className="mt-2 rounded"
            />
          );
        }

        if (media.provider === "YOUTUBE") {
          const videoId = media.url.split("v=")[1]?.split("&")[0];

          return (
            <iframe
              key={index}
              className="w-full h-[200px] mt-2 rounded"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          );
        }

        return null;
      })}

    </div>
  ))
)}

        </>
    )
}

export default Embeds