import { useState } from 'react'
import Header from './components/home/Header'
import './App.css'
import { Route, Routes } from "react-router";
import DashboardLayout from './components/dashboard/DashboardLayout';
import FirstPage from './components/dashboard/FirstPage';
import Testimonios from './components/dashboard/Testimonios';

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Header/>} />
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<FirstPage/>}/>
          <Route path='testimonios' element={<Testimonios/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
