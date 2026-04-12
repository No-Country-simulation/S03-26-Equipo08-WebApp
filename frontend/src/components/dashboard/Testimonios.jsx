import { useState } from "react";
import { NavLink } from "react-router";
import NuevoTestimonio from "./NuevoTestimonio";

export function Testimonios () {

    const testimonio = {
    nombre: "María González",
    rol: "CEO en TechStart Solutions",
    texto:"Este producto transformó completamente nuestra manera de trabajar. La eficiencia aumentó y nuestro equipo está más feliz que nunca.",
    estado: "Aprobado",
    tags: ["Producto", "Cliente", "Eficiencia"],
    rating: 5,
    imagen: "https://randomuser.me/api/portraits/women/44.jpg",
};


    return(
        <>
        <div style={{display:'flex' , justifyContent:'space-between'}}>
            <div>
                <h2 style={{fontSize:'xx-large'}} className="text-2xl font-bold">Testimonios</h2>
                <p>Gestiona todos los testimonios del sistema</p>
            </div>
            <div style={{marginTop:'2%'}}>
                <NavLink to='/dashboard/nuevoTestimonio' style={{background:'#8A5DE8'}} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Nuevo Testimonio</NavLink>
            </div>
        </div>
    
    <div style={{display:'flex' , marginTop:'3%'}}>
        <div className="relative w-full max-w-md">
            {/* Icono */}
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
    🔍
                </span>

        {/* Input */}
            <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div style={{width:'28%' , marginTop:'-4px' , marginLeft:'2%'}} className="sm:col-span-3 max-w-md  ">
          <div className="mt-2 grid grid-cols-1">
            <select id="country" name="country" autocomplete="country-name" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <option>Todas las categorias</option>
              <option>Producto</option>
              <option>Evento</option>
              <option>Cliente</option>
              <option>Industria</option>
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div style={{width:'28%' , marginTop:'-4px' , marginLeft:'2%'}} className="sm:col-span-3 max-w-md  ">
          <div className="mt-2 grid grid-cols-1">
            <select id="country" name="country" autocomplete="country-name" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <option>Todos los estados</option>
              <option>Aprobado</option>
              <option>Pendiente</option>
              <option>Rechazado</option>
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>
        </div>
    </div>
        <div className="p-6">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-5 border">

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
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
                {testimonio.rol}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-3 text-yellow-400">
            {"⭐".repeat(testimonio.rating)}
          </div>

          {/* Texto */}
          <p className="text-gray-600 text-sm mb-4">
            {testimonio.texto}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {testimonio.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
              {testimonio.estado}
            </span>

            <div className="flex gap-3 text-gray-500 cursor-pointer">
              <span>👁️</span>
              <span>✏️</span>
              <span className="text-red-500">🗑️</span>
            </div>
          </div>

        </div>
      </div>
    </div>
        </>
    )
}

export default Testimonios