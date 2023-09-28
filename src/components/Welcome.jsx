import React from 'react';
import Robot from '../pages/assests/robot.gif'
import './Welcome.css'


function Welcome({currentuser }) {
    return (
        <div className='welcome-container'>
            <img src={Robot} alt='welcome'></img>
            <h1>
                Welcome, <span>{currentuser.username}</span>
            </h1>
            <h3>Plese select a chat to start messaging</h3>

            
        </div>
    );
}

export default Welcome;