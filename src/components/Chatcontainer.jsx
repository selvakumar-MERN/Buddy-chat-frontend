import React, { useEffect, useRef, useState } from 'react';
import Logout from './Logout';
import Chatinput from './Chatinput';
import './Chatcontainer.css'
import axios from 'axios';
import { getmessageApi, sendmessageApi } from '../utils/APIroutes';
import {v4 as uuidv4} from 'uuid'

function Chatcontainer({currentchat,currentuser,socket}) {
       const [messages,setmessages]= useState([])
       const [arrivalmessage,setarrivalmessage]= useState(null)
       const  scrollRef= useRef();
    useEffect(()=>{
        if(currentchat){
        async function fetch(){
      await  axios.post(`${getmessageApi}`,{
              from:currentuser._id,
              to:currentchat._id,
        })
       .then((res)=>{
        console.log(res)
           setmessages(res.data)
       }).catch((error)=>{
             console.log(error)
       })
    }
    fetch()
}
   },[ currentchat,currentuser])


    const handlesendmsg= async(msg)=>{

        socket.current.emit("send-msg",{
            to: currentchat._id,
            from:currentuser._id,
            msg,
        });
       await axios.post(`${sendmessageApi}`,{
            from: currentuser._id,
            to:currentchat._id,
            message: msg,
        })
        .then((res)=>{
              console.log(res)
            
        }).catch((error)=>{
              return error
        })
        const msgs=[...messages];
        msgs.push({fromSelf:true,message:msg})
        setmessages(msgs)
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                 setarrivalmessage({fromSelf:false,message:msg})
            })
        }
    },[socket])

    useEffect(()=>{
        arrivalmessage && setmessages((prev)=>[...prev,arrivalmessage]);
    },[arrivalmessage])

    useEffect(()=>{
         scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])
    return (
        <div className='chat-container'>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${currentchat.avatarImage}`}
                      alt="avatar"
                    />
                    </div>
                    <div className="username">
                        <h3>{currentchat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                        <div ref={scrollRef} key={uuidv4()}>
                              <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                                   <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                   </div>
                              </div>
                        </div>
                        ) 
                    })
                }
            </div>
            
                 <Chatinput handlesendmsg={handlesendmsg}/>
            
        </div>
    );
}


export default Chatcontainer;