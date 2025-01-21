import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import GoogleRoutes from './Components/GoogleRoutes';
import DashBoard from './Components/DashBoard';
import PageNotfound from './Components/PageNotfound';
import { GoogleOAuthProvider } from "@react-oauth/google"


function App() {
  const [count, setCount] = useState(0)

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='671088416652-bd5deeoh5tdb4mudo1iv1ahmajhgevg3.apps.googleusercontent.com'>
        <GoogleRoutes />
      </GoogleOAuthProvider>
    )
  }
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<PageNotfound />} />

          PageNotfound
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
