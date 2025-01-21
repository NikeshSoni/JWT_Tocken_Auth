import React from 'react';
import { Link , useNavigate } from 'react-router-dom';

const PageNotfound = () => {

    const navigate = useNavigate()

  return (
    <div>
        <h2>PageNotfound</h2>
        <button onClick={() => navigate("/login")}>
               Login
         </button>
    </div>
  )
}

export default PageNotfound