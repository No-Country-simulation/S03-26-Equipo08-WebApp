import { useState , useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

export function NuevoTestimonio () {

  const navigate = useNavigate()
  const location = useLocation()
  const esAdmin = localStorage.getItem("role") === "admin"
  
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

  const [firstName , setFirstName] = useState("");
  const [surname , setSurname] = useState("");
  const [rol , setRol] = useState("");
  const [organizacion , setOrganizacion] = useState("");
  const [comentario , setComentario] = useState("")
  const [preview , setPreview] = useState(null)

  const usuario = JSON.parse(localStorage.getItem("user"));

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!firstName || !surname || !rol || !organizacion || !comentario) {
    toast.error("Faltan campos que completar");
    return;
  }

  if (!categoryId) {
  toast.error("Debes seleccionar una categoría");
  return;
  }
  
  if (!usuario) {
    toast.error("Debes iniciar sesión");
    navigate("/");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content: comentario,
        authorName: `${firstName} ${surname}`,
        authorRole: rol,
        rating: rating,
        categoryId: Number(categoryId),
        tagIds: []
      })
    });

  console.log({
  content: comentario,
  authorName: `${firstName} ${surname}`,
  authorRole: rol,
  rating,
  categoryId
});

    if (!res.ok) {
    const errorText = await res.text();
    console.log("ERROR BACK:", errorText);
    return;
  }

    const data = await res.json();

    console.log("CREADO:", data);

    Swal.fire({
      title: "Testimonio Creado",
      icon: "success",
    }).then(() => {
      if (esAdmin) {
        navigate("/dashboard/moderacion");
      } else {
        navigate("/dashboard");
      }
    });

  } catch (error) {
    console.error("Error al crear testimonio", error);
  }

};

const [categorias, setCategorias] = useState([]);
const [categoryId, setCategoryId] = useState("");

useEffect(() => {
  const traerCategorias = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/categories?type=APPROVED", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setCategorias(data.content); // 👈 importante (viene en content)
    } catch (error) {
      console.error("Error al traer categorías");
    }
  };

  traerCategorias();
}, []);






return(
        <>
<Toaster/>
<div style={{padding:'4%'}} className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Nuevo Testimonio</h2>
  </div>
  <form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">Nombre</label>
        <div className="mt-2.5">
          <input id="first-name"  value={firstName} onChange={e => setFirstName(e.target.value)} type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div>
        <label htmlFor="surname" className="block text-sm/6 font-semibold text-gray-900">Apellido</label>
        <div className="mt-2.5">
          <input id="surname"  value={surname} onChange={e => setSurname(e.target.value)} type="text" name="surname" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
    <div style={{width:'36rem'}} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="rol" className="block text-sm/6 font-semibold text-gray-900">Cargo/Rol</label>
        <div className="mt-2.5">
          <input id="rol"  value={rol} onChange={e => setRol(e.target.value)} type="text" name="rol" autoComplete="given-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div>
        <label htmlFor="empresa" className="block text-sm/6 font-semibold text-gray-900">Empresa/Organización</label>
        <div className="mt-2.5">
          <input id="empresa"  value={organizacion} onChange={e => setOrganizacion(e.target.value)} type="text" name="empresa" autoComplete="family-name" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
    </div>
    <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Comentario</label>
        <div className="mt-2.5">
          <textarea id="message"  value={comentario} onChange={e => setComentario(e.target.value)} name="message" rows="4" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
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

    <div>
  <label className="block text-sm font-semibold text-gray-900">
    Categoría
  </label>

  <select
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
    className="block w-full rounded-md border px-3 py-2"
  >
    <option value="">Seleccionar categoría</option>

    {categorias.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>
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
    {!esAdmin && (
    <p className="text-sm text-gray-500 mb-4">
      Tu testimonio será revisado antes de publicarse.
    </p>
    )}
    <div className="mt-10">
      <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{esAdmin ? "Publicar" : "Enviar"}</button>
    </div>
  </form>
</div>
        </>
    )
}


export default NuevoTestimonio