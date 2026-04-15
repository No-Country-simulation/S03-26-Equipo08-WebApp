import { useEffect, useState } from 'react';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'

export function Moderacion () {

const navigate = useNavigate()

const [testimonios, setTestimonios] = useState([]);


const pendientes = testimonios.filter(t => t.status === "PENDING");
const aprobados = testimonios.filter(t => t.status === "PUBLISHED");
const rechazados = testimonios.filter(t => t.status === "REJECTED");

const actualizarEstado = (id, nuevoEstado) => {
  const actualizados = testimonios.map(t =>
    t.id === id ? { ...t, status: nuevoEstado } : t
  );

  setTestimonios(actualizados);
};

//CONEXIÓN A LA API
const aprobarTestimonios = async (id) => {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`http://localhost:8080/api/testimonials/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (res.ok) {
      setTestimonios(prev =>
        prev.map(t =>
          t.id === id ? { ...t, status: "PUBLISHED" } : t
        )
      );
    }

    console.log("STATUS:", res.status);

  } catch (error) {
    console.error("Error al aprobar");
  }
};

const eliminarTestimonio = async (id) => {
  const token = localStorage.getItem("token")
  try {
    const res = await fetch (`http://localhost:8080/api/testimonials/${id}` , {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(!res.ok) {
      console.log("Eliminación inválida");
      return;
    }
    const confirm = await Swal.fire({
      title: "¿Eliminar testimonio?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

  if (!confirm.isConfirmed) return;

    console.log("RESPUESTA:" , res.status);
    setTestimonios(prev =>
      prev.filter(t => t.id !== id)
    );
    
  } catch (error) {
    console.error("Error al eliminar el testimonio", error);
  }
}

const rechazarTestimonios = async (id) => {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`http://localhost:8080/api/testimonials/reject/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (res.ok) {
      setTestimonios(prev =>
        prev.map(t =>
          t.id === id ? { ...t, status: "REJECTED" } : t
        )
      );
    }

    console.log("STATUS:", res.status);

  } catch (error) {
    console.error("Error al rechazar");
  }
};



useEffect(() => {
  const traerTestimonios = async () => {
    const token = localStorage.getItem("token")

    try {
      const res = await fetch("http://localhost:8080/api/testimonials/search?status=PENDING", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("RES:", res)

      const data = await res.json()

      console.log("JSON:", data)

      // 🔥 CLAVE
  if (Array.isArray(data)) {
  setTestimonios(data);
} else if (Array.isArray(data.content)) {
  setTestimonios(data.content);
} else {
  console.error("Respuesta inválida:", data);
  setTestimonios([]); // 👈 evita que rompa
}

    } catch (error) {
      console.error("Error al traer testimonios")
    }
  }

  traerTestimonios()
}, [])



const CardTestimonio = ({data}) => (
  <div className="bg-white rounded-xl shadow-md p-5 border max-w-2xl w-full">

    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      
      <div className="flex items-center gap-4">
        <img
          src={data.imagen || "https://via.placeholder.com/40"}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {data.authorName || `${data.firstName} ${data.surname}`}
          </h3>
          <p className="text-sm text-gray-500">
            {data.authorRole}
          </p>
        </div>
      </div>
      
      {/* Rating */}
      <div className="flex gap-1 text-xl">
        {"⭐".repeat(data.rating || 0)}
      </div>
    </div>

    {/* Mensaje */}
    <p className="text-gray-600 text-sm leading-relaxed">
      {data.content || data.comentario}
    </p>

    {/* Rating texto */}
    <p className="mt-3 text-xs text-gray-500">
      {(data.rating) > 0
        ? `Calificación: ${data.rating || rating}/5`
        : "Sin calificar"}
    </p>
    
{data.mediaAssets?.map((media, index) => {
  if (media.provider === "CLOUDINARY") {
    return (
      <img
        key={index}
        src={media.url}
        alt="media"
        className="w-full rounded mt-3"
      />
    );
  }

  if (media.provider === "YOUTUBE") {
    const videoId = media.url.split("v=")[1]?.split("&")[0];

    return (
      <iframe
        key={index}
        className="w-full h-[200px] rounded mt-3"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    );
  }

  return null;
})}

    {/* Botones */}
    <div className="flex gap-4 mt-6">
      <button onClick={() => aprobarTestimonios(data.id)} className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
        Aceptar
      </button>

      <button onClick={() => navigate(`/dashboard/testimonio/editar/${data.id}`)} style={{background:'grey'}} className="bg-grey-500 text-white px-4 py-2 rounded-md w-full">
        Editar
      </button>

      <button onClick={() => eliminarTestimonio(data.id)} className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
        Eliminar
      </button>

      <button onClick={() => rechazarTestimonios(data.id)} className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
        Rechazar
      </button>
    </div>
  </div>
);

return (
        <>
            <h2 style={{fontSize:'xx-large'}} className="text-2xl font-bold">Panel de Moderación</h2>
            <p>Revisa y aprueba testimonios antes de su publicación</p>
            <div style={{display:'flex' , justifyContent:'space-between' , marginTop:'-4%'}}>
                        <div className="" style={{marginTop:'7%' , border:'groove' , borderRadius:'5px' , width:'17%' , padding:'8px'}}>
                            <div>
                                <span>Pendientes</span>
                                <TextsmsIcon style={{marginLeft:'40%'}}/>
                            </div>
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>{pendientes.length}</h5>
                        </div>
                        <div className='' style={{marginTop:'7%' , border:'groove' , borderRadius:'5px' , width:'17%' , padding:'8px'}}>
                            <div>
                                <span>Aprobados</span>
                                <TextsmsIcon style={{marginLeft:'40%'}}/>
                            </div>
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>{aprobados.length}</h5>
                        </div>
                        <div className='' style={{marginTop:'7%' , border:'groove' , borderRadius:'5px' , width:'17%' , padding:'8px'}}>
                            <div>
                                <span>Rechazados</span>
                                <TextsmsIcon style={{marginLeft:'40%'}}/>
                            </div>
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>{rechazados.length}</h5>
                        </div>
            </div>

{pendientes.length === 0 && (
  <p className="text-gray-500">No hay testimonios pendientes</p>
)}

<div className="flex flex-col items-center gap-6 mt-10">

  {/* Preview del usuario */}
  {pendientes.map((t) => (
  <CardTestimonio
    key={t.id}
    data={t}
  />
))}
</div>

        </>
)
}
export default Moderacion


