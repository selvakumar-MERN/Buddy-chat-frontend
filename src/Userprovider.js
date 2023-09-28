import React ,{useEffect, useState} from "react";
import Mycontext from "./Context";
import axios from "axios";

const UserProvider = ({children})=>{

    const[userdata,setuser]=useState({});
    
    useEffect( () => {
        async function finddata(){
        const usertoken = {
            token: window.localStorage.getItem("chattoken")
       
        }
        
          await axios.post('https://buddy-chat.onrender.com/api/auth/verifylogin', usertoken)
            .then((res) => {
                const { data } = res
                setuser(data)
               
        })

            .catch((error) => {

                console.log(error)
            })
        }
        finddata()      
    }

, [])


    return(
    <Mycontext.Provider value={{userdata}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;
