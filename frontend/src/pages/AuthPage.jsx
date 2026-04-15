import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api'; 

const AuthPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (loginError) setLoginError(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Guardamos el token (Tu lógica)
        if(data.token) localStorage.setItem('token', data.token); 

        // Guardamos el usuario (Lógica de Lautaro que es útil)
        localStorage.setItem("user", JSON.stringify({
          email: formData.email
        }));

        navigate('/dashboard'); 
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error de conexión", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white font-sans px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="flex flex-col items-center mb-4">
          <img src="/src/assets/logo.png" alt="Logo" className="w-64 h-auto object-contain" />
        </div>

        {successMessage && (
          <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded-lg text-center font-semibold">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            name="email" type="email" placeholder="Correo electrónico" required 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] outline-none"
            onChange={handleChange} 
          />
          <div>
            <input 
              name="password" type="password" placeholder="Contraseña" required 
              className={`w-full px-4 py-3 border ${loginError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#8A5DE8] outline-none transition-all`}
              onChange={handleChange} 
            />
            {loginError && (
              <p className="text-red-500 text-xs mt-2 font-semibold italic text-center">
                Contraseña incorrecta. Por favor intente nuevamente.
              </p>
            )}
          </div>
          
          <button type="submit" className="w-full py-3 bg-[#8A5DE8] hover:bg-[#7a4ddb] text-white font-bold rounded-lg shadow-lg transition-all active:scale-95">
            Ingresar
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes cuenta? 
          <button onClick={() => navigate('/register')} className="text-[#4A90E2] font-semibold hover:underline ml-1">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;