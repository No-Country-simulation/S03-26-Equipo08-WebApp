import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Ver confirmación
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // Modal personalizado
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.password.length > 0 && formData.password.length < 8) setPasswordError('Mínimo 8 caracteres');
    else setPasswordError('');
    if (formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword) setMatchError('Las contraseñas no coinciden');
    else setMatchError('');
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError && !matchError) {
      setIsSubmitting(true);
      try {
        const dataToSend = { name: formData.name, email: formData.email, password: formData.password, role: 'client' };
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          navigate('/', { state: { successMessage: "¡Cuenta registrada con éxito!" } }); 
        } else {
          const data = await response.json();
          // Si el backend dice que el usuario ya existe:
          if (data.message && data.message.includes("registrado") || response.status === 409 || response.status === 400) {
            setShowEmailModal(true);
          } else {
            alert("Error: " + data.message);
          }
        }
      } catch (error) {
        console.error("Error de conexión");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white font-sans px-4 py-12 relative">
      
      {/* MODAL PERSONALIZADO (Aparece en el medio) */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all">
          <div className="bg-gradient-to-br from-gray-900 to-black w-80 p-6 rounded-xl shadow-2xl relative border border-gray-700">
            {/* Cruz Roja arriba a la derecha */}
            <button 
              onClick={() => setShowEmailModal(false)}
              className="absolute top-2 right-3 text-red-500 hover:text-red-400 text-2xl font-bold transition-colors"
            >
              ×
            </button>
            <div className="text-center mt-2">
              <p className="text-gray-300 text-lg font-medium">
                Este mail ya pertenece a una cuenta.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input name="name" type="text" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input 
                name="password" type={showPassword ? "text" : "password"} 
                required onChange={handleChange}
                className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-gray-400 text-xs mt-1">
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Repetir contraseña</label>
            <div className="relative">
              <input 
                name="confirmPassword" type={showConfirmPassword ? "text" : "password"} 
                required onChange={handleChange}
                className={`w-full px-4 py-2 border ${matchError ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none`}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 text-gray-400 text-xs mt-1">
                {showConfirmPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
            {matchError && <p className="text-red-500 text-[10px] font-bold italic mt-1">{matchError}</p>}
          </div>
          
          <button type="submit" disabled={isSubmitting} className={`w-full py-3 mt-4 text-white font-bold rounded-lg shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#8A5DE8] hover:bg-[#7a4ddb]'}`}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;