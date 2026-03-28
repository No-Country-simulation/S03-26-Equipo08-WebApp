import { useState } from 'react';
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
<div style={{marginTop:'5%'}} className="bg-white rounded-xl shadow-md p-5 border max-w-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        
        <div className="flex items-center gap-4">
          <img
            src={testimonio.imagen}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-gray-800">
              {testimonio.nombre}
            </h3>
            <p className="text-sm text-gray-500">
              {testimonio.rol} en {testimonio.empresa}
            </p>
          </div>
        </div>

        {/* ⭐ Rating */}
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
        {testimonio.mensaje}
      </p>

      {/* Texto de rating */}
      <p className="mt-3 text-xs text-gray-500">
        {rating > 0 ? `Calificación: ${rating}/5` : "Sin calificar"}
      </p>
<div style={{display:'flex'}}>
    <div className="mt-10">
      <button style={{background:'green' , width:'18rem'}} type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Aceptar</button>
    </div>
    <div className="mt-10">
      <button style={{background:'red' , width:'18rem' , marginLeft:'19%'}} type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Rechazar</button>
    </div>
    </div>
</div>
        </>
    )
}

export default Moderacion