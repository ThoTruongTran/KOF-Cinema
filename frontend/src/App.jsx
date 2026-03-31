import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/FooterSection/Footer'
import NavMenu from './components/NavSection/Nav'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <NavMenu/>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
