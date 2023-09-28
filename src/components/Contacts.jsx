import React, { useEffect, useState } from 'react';
import logo from '../pages/assests/logo.svg'
import './Contact.css'

function Contacts({contacts,currentuser,changechat}) {
    const[currentusername,setcurrentusername]=useState("")
    const[currentuserimage,setcurrentuserimage]=useState("")
    const[currentselected,setcurrentselected]=useState("")
    useEffect(()=>{
        if(currentuser){
            setcurrentuserimage(currentuser.avatarImage)
            setcurrentusername(currentuser.username)
        }
    },[currentuser])

    const changeCurrentChat = (index, contact) => {
        setcurrentselected(index);
        changechat(contact)
    }
   
    return (
        <>
             {currentuserimage && currentuserimage && (
            <div>
                   <div className="contact-brand">
                        <img src={logo} alt="logo" />
                           <h3>buddy</h3>
                     </div>
          <div className="contacts">
        
            {  contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentselected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentuserimage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentusername}</h2>
            </div>
          </div>
            </div>
             )}   
        </>
    );
}

export default Contacts;