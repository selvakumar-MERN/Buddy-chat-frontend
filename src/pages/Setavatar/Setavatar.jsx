import './Setavatar.css'
import React,{useContext, useEffect,useState} from 'react';
import loader from '../assests/loader.gif';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Buffer } from 'buffer';
import axios from 'axios';
import { setavatarApi } from '../../utils/APIroutes';
import Mycontext from '../../Context';

function Setavatar(props) {
    const{userdata}=useContext(Mycontext)
    const api= "https://api.multiavatar.com/45678945"
    const[avatars,setavatars]=useState([])
    const[isLoading,setloading]=useState(true);
    const[selectedavatar,setselectedavatar]=useState(undefined)
    const toasterror={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark',
      }
      const setprofile= async()=>{
             if(selectedavatar===undefined){
                toast.error("Please select an avatar",toasterror)
             }
             else{
                console.log(userdata._id)
                await axios.post(`${setavatarApi}/${userdata._id}`,{
                    image:avatars[selectedavatar],
                }).then((res)=>{
                    if(res){
                        toast.success(res.data)
                        window.location.reload()
                    }
                }).catch((error)=>{
                    toast.error(error.response.data,toasterror)
                })
                
             }
      }
      useEffect( ()=>{
        async function fetchdata(){
        const data=[];
        for(let i=0;i<4;i++){
            const image= await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=whVPSv6DKfzdEi`)
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setavatars(data);
        setloading(false)
    }
    fetchdata()
      },[])
    return (
        <div>
            {
                isLoading ? <div className='container'>
                    <img src={loader} alt='load' className='loader'></img>
                </div> :(
                   <div className="container">
                   <div className="title-container">
                       <h1>Pick an avatar as your profile picture</h1>
                   </div>
                   <div className="avatars">
                       {
                           avatars.map((avatar,index)=>{
                               return(
                               
                                   <div 
                                   key={index}
                                   className={`avatar ${selectedavatar === index ? "selected":""}`}>
                                       <img src={`data:image/svg+xml;base64,${avatar}`}
                                       alt='avatar' onClick={()=>setselectedavatar(index)}/>
                                   </div>
                               )
                           })
                       }
                   </div>
                  <button className='submit-btn' onClick={setprofile}>set as profile picture</button>
               </div>
                )
            }
            
             <ToastContainer/>
            
            
        </div>
    );
}

export default Setavatar;