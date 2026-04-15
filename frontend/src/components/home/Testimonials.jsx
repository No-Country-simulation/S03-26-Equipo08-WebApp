import Quantity from "./Quantity"
import { useState , useEffect } from "react";


export function Testimonials () {
const [testimonios , setTestimonios] = useState([]);

useEffect(() => {
  
  const traerTestimonios = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch ("http://localhost:8080/api/testimonials/search?status=PUBLISHED" , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (!res.ok) {
        console.log("ERROR:" , res.status);
        return;
      }

      console.log("PRODUCTOS OBTENIDOS!!");
      
      const data = await res.json();

      if(Array.isArray(data)) {
        setTestimonios(data)
      } else if (Array.isArray(data.content)) {
        setTestimonios(data.content)
      }

    } catch (error) {
      console.error("Error a traer los testimonios aprobados" , error);
    }
  }
  traerTestimonios()
},[])

    return (
        <>
        <h2 style={{marginLeft:'42%'}} className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Testimonios</h2>
        <div style={{marginLeft:'10%' , marginTop:'5%'}} className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
  {testimonios.map((t) => (
    <div
      key={t.id}
      style={{ background: '#70D5FA' }}
      className="flex flex-col items-start rounded-lg p-6 shadow-sm transition-all hover:bg-gray-50"
    >
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <h4 style={{ color: 'black' }} className="text-lg font-semibold">
            {t.authorName}
          </h4>
          <p style={{ color: 'black' }} className="text-sm text-gray-500">
            {t.authorRole}
          </p>
        </div>
      </div>

      <p style={{ color: 'black' }} className="text-sm leading-relaxed">
        "{t.content}"
      </p>

      {/* ⭐ rating */}
      <div className="mt-2">
        {"⭐".repeat(t.rating || 0)}
      </div>

      {/* 🎥 media */}
      {t.mediaAssets?.map((media, index) => {
        if (media.provider === "CLOUDINARY") {
          return (
            <img
              key={index}
              src={media.url}
              className="mt-3 rounded"
            />
          );
        }

        if (media.provider === "YOUTUBE") {
          const videoId = media.url.split("v=")[1]?.split("&")[0];

          return (
            <iframe
              key={index}
              className="w-full h-[200px] mt-3 rounded"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          );
        }

        return null;
      })}
    </div>
  ))}
</div>
    <Quantity/>
        </>
    )
}

export default Testimonials