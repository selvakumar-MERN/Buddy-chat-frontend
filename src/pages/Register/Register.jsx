import React,{useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Logo from '../assests/logo.svg'
import './Register.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { registrationApi } from '../../utils/APIroutes';

function Register(props) {
    const navigate= useNavigate()
    const[values,setvalues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
  
 
   const toasterror={
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:'dark',
  }
   const handlevalidation=()=>{
    const{password,confirmPassword,username,email}= values;
    if(password!== confirmPassword){
          toast.error("Password and confirm password should be same", toasterror);
          return false
    }
    else if(username.length<3){
        toast.error("Username should be greater then 3 characters", toasterror);
        return false
    }
    else if(password.length<8){
        toast.error("Password should be equal or greater then 8 characters", toasterror);
        return false
    }
    else if(email===""){
        toast.error("Email is requried", toasterror);
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
       
        const{password,username,email}= values;
         await axios.post(registrationApi,{
            username, email, password
        }).then((res)=>{
            toast.success(res.data)
            navigate('/login')
        })
        .catch((error)=>{
            toast.error(error.response.data,toasterror)
        })
        
            
        
    }
   }
    


    return (
        <div>
            <div className='formcontainer'>
                <form className='formarea' onSubmit={(e)=>handlesubmit(e)}>
                    <div className="brand">
                        <img className='img' src={Logo} alt="" />
                        <h1>buddy</h1>
                    </div>
                    <input className='forminput' type="text" placeholder='Username' name='username' onChange={(e)=>handlechange(e)} />
                    <input className='forminput' type="email" placeholder='Email' name='email' onChange={(e)=>handlechange(e)} />
                    <input className='forminput' type="password" placeholder='Password' name='password' onChange={(e)=>handlechange(e)} />
                    <input className='forminput' type="password" placeholder='confirm Password' name='confirmPassword' onChange={(e)=>handlechange(e)} />
                    <button className='formbutton' type='submit'  >Register</button>
                    <span>Already have an account ? <Link to='/login'>Login</Link></span>
                </form>
                </div>
                <ToastContainer/>
            
        </div>
    );
}

export default Register;