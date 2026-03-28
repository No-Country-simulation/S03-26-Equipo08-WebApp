import { useState } from "react";

export function NuevoTestimonio () {

  const [imagen, setImagen] = useState(null);
  const [video, setVideo] = useState(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleFile = (file) => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setImagen(URL.createObjectURL(file));
    } else if (file.type.startsWith("video/")) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

    return(
        <>
<div style={{padding:'4%'}} className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Nuevo Testimonio</h2>
  </div>
  <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">Name</label>
        <div className="mt-2.5">
          <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div>
        <label htmlFor="surname" className="block text-sm/6 font-semibold text-gray-900">Surname</label>
        <div className="mt-2.5">
          <input id="surname" type="text" name="surname" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
    <div style={{width:'36rem'}} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="rol" className="block text-sm/6 font-semibold text-gray-900">Cargo/Rol</label>
        <div className="mt-2.5">
          <input id="rol" type="text" name="rol" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div>
        <label htmlFor="empresa" className="block text-sm/6 font-semibold text-gray-900">Empresa/Organización</label>
        <div className="mt-2.5">
          <input id="empresa" type="text" name="empresa" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
    </div>
    <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Comentario</label>
        <div className="mt-2.5">
          <textarea id="message" name="message" rows="4" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
        </div>
      </div>
    </div>
    <div>
    </div>
    <div className="space-y-4">

      {/* CUADRO */}
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <p className="text-gray-500">📁 Arrastrá o hacé click</p>
        <p className="text-sm text-gray-400">Imagen o Video</p>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* PREVIEW IMAGEN */}
      {imagen && (
        <img
          src={imagen}
          alt="preview"
          className="w-40 rounded-lg"
        />
      )}

      {/* PREVIEW VIDEO */}
      {video && (
        <video controls className="w-full max-w-xs rounded-lg">
          <source src={video} />
        </video>
      )}
    </div>
    
    {/*CALIFICACION*/}
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ⭐
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-600">
        {rating > 0 ? `${rating}/5` : "Sin calificar"}
      </span>
    </div>
    <div className="mt-10">
      <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
    </div>
  </form>
</div>
        </>
    )
}

export default NuevoTestimonio