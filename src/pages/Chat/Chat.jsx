import React, { useEffect, useState, useRef } from 'react';
import './Chat.css'
import { alluserApi ,host } from '../../utils/APIroutes';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import Contacts from '../../components/Contacts';
import Setavatar from '../Setavatar/Setavatar';
import Welcome from '../../components/Welcome';
import Chatcontainer from '../../components/Chatcontainer';
import {io} from 'socket.io-client'
function Chat(props) {
    const socket = useRef()
    const[contacts,setcontact]=useState([])
    const [currentuser,setcurrentuser]=useState("");
    const [currentChat, setCurrentChat] = useState("");

    useEffect( () => {
        const usertoken = {
            token: window.localStorage.getItem("chattoken")
        }
           axios.post('https://buddy-chat.onrender.com/api/auth/verifylogin', usertoken)
            .then((res) => {
                const { data } = res
                setcurrentuser(data)
             
        })

            .catch((error) => {

                console.log(error)
            })
            
    }

, [])

useEffect(()=>{
    if(currentuser){
        socket.current= io(host);
        socket.current.emit("add-user",currentuser._id);
    }
},[currentuser])

    useEffect(()=>{
         axios.get(`${alluserApi}/${currentuser._id}`)
        .then((res)=>{
            if(res){
                setcontact(res.data)
            }
        }).catch((error)=>{
              return error
        })
    
   
    },[ currentuser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };
    return (
        <div>
        { !currentuser.isAvatarImageSet ? <Setavatar/>
        :  <div className='container'>
        <div className="inner-container">
            <div className='usersarea'>
           <Contacts contacts={contacts} currentuser={currentuser} changechat={handleChatChange}/>
           </div>
           {
            currentChat==="" ?  <Welcome currentuser={currentuser}  /> : <Chatcontainer  currentchat={currentChat} currentuser={currentuser} socket={socket}  />
           }
          
        </div>
        
        
    </div>}
       
        </div>
    );
}

export default Chat;
