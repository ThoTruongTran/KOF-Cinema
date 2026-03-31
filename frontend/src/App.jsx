import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/FooterSection/Footer'
import NavMenu from './components/NavSection/Nav'
import Hero from './components/HeroSection/Hero'
import HomePage from './pages/HomePage/HomePage'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <NavMenu/>
      <Hero/>
      <HomePage/>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
