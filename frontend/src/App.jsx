import { useState } from 'react'
import Header from './components/home/Header'
import './App.css'
import { Route, Routes, Navigate } from "react-router";
import DashboardLayout from './components/dashboard/DashboardLayout';
import FirstPage from './components/dashboard/FirstPage';
import Testimonios from './components/dashboard/Testimonios';
import NuevoTestimonio from './components/dashboard/NuevoTestimonio';
import Moderacion from './components/dashboard/Moderacion';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx'; // 1. Importa la nueva página
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Header/>} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* 2. Agrega la ruta */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<FirstPage/>}/>
          <Route path='nuevoTestimonio' element={<NuevoTestimonio/>}></Route>
          <Route path='testimonios' element={<Testimonios/>}></Route>
          <Route path='moderación' element={<Moderacion/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
