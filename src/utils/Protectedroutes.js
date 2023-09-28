import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Protectedroutes(props) {
    const tokenvalue = window.localStorage.getItem("chattoken")
    
    return (
        <div>
           {tokenvalue ? <Outlet/> : <Navigate to='/login'/> }
        </div>
    );
}

export default Protectedroutes;