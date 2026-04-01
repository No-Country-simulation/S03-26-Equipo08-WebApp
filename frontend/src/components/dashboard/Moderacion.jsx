import { useState } from 'react';
import { useLocation } from 'react-router';
import TextsmsIcon from '@mui/icons-material/Textsms';

export function Moderacion () {
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);

    const testimonio = {
    nombre: "User1",
    rol:"Community Manager",
    empresa:"Marketing",
    mensaje: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, dolore maiores unde architecto, quod quos dolorum autem velit fuga provident illo nam. Quos, optio culpa minus commodi voluptatem aut libero.",
    imagen: "https://randomuser.me/api/portraits/men/32.jpg",
}

const location = useLocation();
const testimonios = location.state;

const CardTestimonio = ({ data, rating, setRating, hover, setHover }) => (
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
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              (hover || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ⭐
          </span>
        ))}
      </div>
    </div>

    {/* Mensaje */}
    <p className="text-gray-600 text-sm leading-relaxed">
      {data.mensaje || data.comentario}
    </p>

    {/* Rating texto */}
    <p className="mt-3 text-xs text-gray-500">
      {(data.rating || rating) > 0
        ? `Calificación: ${data.rating || rating}/5`
        : "Sin calificar"}
    </p>

    {/* Botones */}
    <div className="flex gap-4 mt-6">
      <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
        Aceptar
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
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
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>0</h5>
                        </div>
                        <div className='' style={{marginTop:'7%' , border:'groove' , borderRadius:'5px' , width:'17%' , padding:'8px'}}>
                            <div>
                                <span>Aceptados</span>
                                <TextsmsIcon style={{marginLeft:'40%'}}/>
                            </div>
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>0</h5>
                        </div>
                        <div className='' style={{marginTop:'7%' , border:'groove' , borderRadius:'5px' , width:'17%' , padding:'8px'}}>
                            <div>
                                <span>Rechazados</span>
                                <TextsmsIcon style={{marginLeft:'40%'}}/>
                            </div>
                            <h5 style={{marginTop:'3%' , fontWeight:'bold' , fontSize:'xx-large'}}>0</h5>
                        </div>
            </div>
<div className="flex flex-col items-center gap-6 mt-10">

  {/* Ejemplo */}
  <CardTestimonio
    data={testimonio}
    rating={rating}
    setRating={setRating}
    hover={hover}
    setHover={setHover}
  />

  {/* Preview del usuario */}
  {testimonios && (
    <CardTestimonio
      data={testimonios}
      rating={rating}
      setRating={setRating}
      hover={hover}
      setHover={setHover}
    />
  )}

</div>

        </>
    )
}

export default Moderacion
