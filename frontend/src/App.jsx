import { useState } from 'react'
import Header from './components/home/Header'
import './App.css'
import { Route, Routes, Navigate } from "react-router";
import DashboardLayout from './components/dashboard/DashboardLayout';
import FirstPage from './components/dashboard/FirstPage';
import Testimonios from './components/dashboard/Testimonios';
import NuevoTestimonio from './components/dashboard/NuevoTestimonio';
import Moderacion from './components/dashboard/Moderacion';

//MAXI
import AuthPage from './pages/AuthPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx'; 
import DashboardAuth from './pages/DashboardAuth.jsx';
import Embeds from './components/dashboard/Embeds.jsx';
<<<<<<< HEAD
import ApiDocs from './components/dashboard/ApiDocs.jsx';
=======
import Categorias from './components/dashboard/Categorias.jsx'; // <--- 1. IMPORTAMOS TU NUEVO COMPONENTE
>>>>>>> 95266d98fdea56cfa38039bb5eec166bd0403f3d

function App() {

  return (
    <>
      <Routes>
        {/*Home*/}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/*Login y Register*/}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/dashboardAuth" element={<DashboardAuth />} />
        
        <Route path='/crear' element={<NuevoTestimonio/>}></Route>

        <Route path="/home" element={<Header/>} />

        {/*Dashboard*/}
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<FirstPage/>}/>
          <Route path='nuevoTestimonio' element={<NuevoTestimonio/>}></Route>
          <Route path='testimonios' element={<Testimonios/>}></Route>
          <Route path='apiDocumento' element={<ApiDocs/>}></Route>
          <Route path='moderación' element={<Moderacion/>}></Route>
          <Route path='embeds' element={<Embeds/>}></Route>
<<<<<<< HEAD
          <Route path='testimonio/editar/:id' element={<NuevoTestimonio/>}></Route>
=======
          <Route path='categorias' element={<Categorias/>}></Route> {/* <--- 2. AGREGAMOS LA RUTA */}
>>>>>>> 95266d98fdea56cfa38039bb5eec166bd0403f3d
        </Route>
      </Routes>
    </>
  )
}

export default App