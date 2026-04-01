import { useState } from 'react';
import TextsmsIcon from '@mui/icons-material/Textsms';

export function Moderacion () {

const [testimonios, setTestimonios] = useState(
  JSON.parse(localStorage.getItem("testimonios")) || []
);

const pendientes = testimonios.filter(t => t.estado === "Pendiente");
const aprobados = testimonios.filter(t => t.estado === "Aprobado");
const rechazados = testimonios.filter(t => t.estado === "Rechazado");

const actualizarEstado = (id, nuevoEstado) => {
  const actualizados = testimonios.map(t =>
    t.id === id ? { ...t, estado: nuevoEstado } : t
  );

  setTestimonios(actualizados);
  localStorage.setItem("testimonios", JSON.stringify(actualizados));
};


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
            {data.nombre || `${data.firstName} ${data.surname}`}
          </h3>
          <p className="text-sm text-gray-500">
            {data.rol} en {data.empresa || data.organizacion}
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
      {data.mensaje || data.comentario}
    </p>

    {/* Rating texto */}
    <p className="mt-3 text-xs text-gray-500">
      {(data.rating) > 0
        ? `Calificación: ${data.rating || rating}/5`
        : "Sin calificar"}
    </p>

    {/* Botones */}
    <div className="flex gap-4 mt-6">
      <button onClick={() => actualizarEstado(data.id, "Aprobado")} className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
        Aceptar
      </button>

      <button onClick={() => actualizarEstado(data.id, "Rechazado")} className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
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
