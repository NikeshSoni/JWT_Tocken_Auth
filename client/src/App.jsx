import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import CreateRecipe from "./Pages/CreateRecipe";
import SavedRecipe from "./Pages/SavedRecipe";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/savedrecipe" element={<SavedRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
