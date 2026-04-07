import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 

const AuthPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const res = await fetch (`http://localhost:8080/api/auth/login` , {
      method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email: formData.email,
          password: formData.password
        })
    })
    const data = await res.json()

    localStorage.setItem("token" , data.token)

    localStorage.setItem("user" , JSON.stringify({
      email: formData.email
    }));

    navigate("/dashboard");
  
  } catch (error) {
    console.error("Error al iniciar sesión" , error);
  }
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




/*
      const { email } = formData;

  // 🔹 Simulación de roles
      let role = "user";

      if (email === "admin@mail.com") {
        role = "admin";
      }

  // 🔹 Guardar role
  localStorage.setItem("role", role);

  // 🔹 (opcional) guardar usuario
  localStorage.setItem("user", JSON.stringify({ email, role }));

  // 🔹 Verificar testimonios
  const testimonios = JSON.parse(localStorage.getItem("testimonios")) || [];

  if (testimonios.length === 0) {
    navigate("/crear");
  } else {
    navigate("/dashboard");
  }
*/