import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', companyName: '', password: '', confirmPassword: '', role: 'client'
  });

  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validaciones en tiempo real
  useEffect(() => {
    // 1. Validar longitud
    if (formData.password.length > 0 && formData.password.length < 8) {
      setPasswordError('Mínimo 8 caracteres');
    } else {
      setPasswordError('');
    }

    // 2. Validar coincidencia
    if (formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword) {
      setMatchError('Las contraseñas no coinciden');
    } else {
      setMatchError('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && !matchError) {
      console.log("Registro exitoso", formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white font-sans px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-sans">Crear cuenta</h2>
          <p className="text-gray-500 mt-2">Únete a TestimonialHub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input name="fullName" type="text" required onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A5DE8] outline-none" placeholder="Juan Pérez" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input name="email" type="email" required onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] outline-none" placeholder="ejemplo@gmail.com" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#8A5DE8] outline-none`}
                placeholder="••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 text-xs mt-1"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{passwordError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Repetir contraseña</label>
            <input 
              name="confirmPassword" 
              type="password" 
              required 
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${matchError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#8A5DE8] outline-none`}
              placeholder="••••••••" 
            />
            {matchError && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{matchError}</p>}
          </div>

          {/* ¡CAMBIO: Selector de roles RECUPERADO! */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tu Rol</label>
            <select 
              name="role" 
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#8A5DE8] transition-all"
            >
              <option value="client">Cliente (Quiero testimonios)</option>
              <option value="admin">Administrador (Control total)</option>
            </select>
          </div>

          <button type="submit" 
            disabled={passwordError || matchError}
            className={`w-full py-3 mt-4 text-white font-bold rounded-lg shadow-lg transition-all ${passwordError || matchError ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8A5DE8] hover:bg-[#7a4ddb]'}`}>
            Registrarse
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿Ya tienes cuenta? <button onClick={() => navigate('/')} className="text-[#4A90E2] font-semibold hover:underline">Inicia sesión</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;