import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login intentado con:", formData);
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white font-sans px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        {/* LOGO SECCIÓN: Margen inferior reducido (mb-4) para subirlo */}
        <div className="flex flex-col items-center mb-4">
          <img 
            src="/src/assets/logo.png" // Mantenemos tu ruta funcional
            alt="TestimonialHub Logo" 
            className="w-64 h-auto object-contain" 
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico (ejemplo@gmail.com)" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] outline-none transition-all"
            onChange={handleChange} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A5DE8] outline-none transition-all"
            onChange={handleChange} 
            required 
          />
          
          <button type="submit" 
            className="w-full py-3 bg-[#8A5DE8] hover:bg-[#7a4ddb] text-white font-bold rounded-lg shadow-lg transform transition-all active:scale-95">
            Ingresar
          </button>
        </form>

        {/* Margen superior reducido (mt-6) */}
        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes cuenta? 
          <button 
            onClick={() => navigate('/register')} 
            className="text-[#4A90E2] font-semibold hover:underline ml-1"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;