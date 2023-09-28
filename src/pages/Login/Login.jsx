import React,{useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Logo from '../assests/logo.svg'
import '../Register/Register'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { loginApi } from '../../utils/APIroutes';
function Login(props) {
    const navigate= useNavigate()
    const[values,setvalues]=useState({
        username:"",
        password:"",
        
    })
  
 
   const toasterror={
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:'dark',
  }
   const handlevalidation=()=>{
    const{password,username}= values;
    if(password===""){
          toast.error("Email and Password is required", toasterror);
          return false
    }
    else if(username.length ===""){
        toast.error("Email and Password is required", toasterror);
        return false
    }
    return true;
       
   }

   
   const handlechange=(e)=>{
       const{name,value}=e.target;
       setvalues({...values,[name]:value})
   }

   const handlesubmit= async (e)=>{
   
    e.preventDefault();
    if(handlevalidation()){
       
        const{password,username}= values;
         await axios.post(loginApi,{
            username, password
        }).then((res)=>{
            window.localStorage.setItem('chattoken',res.data.token)
            navigate('/')
        })
        .catch((error)=>{
            toast.error(error.response.data,toasterror)
        })
        
            
        
    }
   }
    


    return (
        <div>
            <div className='formcontainer'>
                <form onSubmit={(e)=>handlesubmit(e)} className='formarea'>
                    <div className="brand">
                        <img className='img' src={Logo} alt="" />
                        <h1>buddy</h1>
                    </div>
                    <input type="text" className='forminput' placeholder='Username' name='username' min="3" onChange={(e)=>handlechange(e)} />
                    <input type="password" className='forminput' placeholder='Password' name='password' onChange={(e)=>handlechange(e)} />
                    <button type='submit' className='formbutton' >Login</button>
                    <span>Don't have an account ? <Link to='/register'>Register</Link></span>
                </form>
                </div>
                <ToastContainer/>
            
        </div>
    );
}

export default Login;