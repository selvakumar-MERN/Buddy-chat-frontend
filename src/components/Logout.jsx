import React from 'react';
import {BsPower} from 'react-icons/bs'
import './Logout.css'

function Logout(props) {
    
    const handleclick=()=>{
        window.localStorage.clear();
        window.location.reload()
        
    }
    return (
        <button className='powerbutton' onClick={()=>handleclick()}>
            <BsPower/>
        </button>
    );
}

export default Logout;