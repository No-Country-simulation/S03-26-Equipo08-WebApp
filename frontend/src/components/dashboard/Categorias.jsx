import React, { useState, useEffect } from 'react';

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#3b82f6');
  
  // Estados para los Modales Galaxia
  const [modal, setModal] = useState({ show: false, message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const json = await response.json();
        // El backend devuelve la lista en 'content'
        if (json.content && Array.isArray(json.content)) {
          setCategories(json.content);
        }
      }
    } catch (error) {
      console.error("Error cargando categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const generatedSlug = newName.toLowerCase().trim().replace(/\s+/g, '-');

    const datosAEnviar = { 
      name: newName, 
      hexColor: newColor.replace('#', ''), // Guardamos sin el #
      slug: generatedSlug,                 
      type: 'PRODUCT',                     
      ownerId: 1                           
    };

    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosAEnviar)
      });

      if (response.ok) {
        setModal({ show: true, message: '¡Categoría creada con éxito!' });
        setNewName(''); 
        setShowForm(false);
        fetchCategories(); 
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const executeDelete = async () => {
    const id = confirmModal.id;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setConfirmModal({ show: false, id: null });
        setModal({ show: true, message: 'Categoría eliminada correctamente' });
        fetchCategories();
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 relative min-h-screen">
      
      {/* 1. MODAL GALAXIA: ÉXITO */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 transition-all">
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 w-80 p-6 rounded-2xl shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <h3 className="text-white font-medium text-lg mb-8 text-center tracking-wide italic">
              {modal.message}
            </h3>
            <div className="flex justify-end">
              <button 
                onClick={() => setModal({ show: false, message: '' })}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-white/10"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL GALAXIA: CONFIRMACIÓN */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 transition-all">
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 w-80 p-6 rounded-2xl shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <h3 className="text-white font-medium text-lg mb-8 text-center tracking-wide italic">
              ¿Estás seguro de eliminar esta categoría?
            </h3>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmModal({ show: false, id: null })}
                className="text-white/60 hover:text-white px-3 py-1.5 text-sm transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={executeDelete}
                className="bg-red-500/40 hover:bg-red-500/60 text-white px-5 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-white/10"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-500 text-sm">Administra las etiquetas del sistema</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all shadow-lg"
        >
          {showForm ? 'Cancelar' : '+ Nueva Categoría'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                type="text" required value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input 
                type="color" value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="h-10 w-20 p-1 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all">
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* LISTA DE CATEGORÍAS ACTUALIZADA */}
      <div className="grid gap-3">
        {categories.map((cat) => {
          // Lógica para asegurar que el color se lea correctamente del nuevo backend
          const colorBruto = cat.hexColor || cat.color || 'CCCCCC';
          const colorFinal = colorBruto.startsWith('#') ? colorBruto : `#${colorBruto}`;

          return (
            <div key={cat.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div 
                  className="w-6 h-6 rounded-full border border-gray-200 shadow-inner transition-transform hover:scale-110" 
                  style={{ backgroundColor: colorFinal }} 
                ></div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-lg leading-tight">{cat.name}</span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    {colorFinal}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setConfirmModal({ show: true, id: cat.id })} 
                className="p-3 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-xl transition-all"
              >
                <span className="text-xl">🗑️</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categorias;