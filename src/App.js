import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import Setavatar from './pages/Setavatar/Setavatar';
import Protectedroutes from './utils/Protectedroutes';
import UserProvider from './Userprovider';

function App(props) {
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<Protectedroutes/>}>
      <Route path='/' element={<Chat/>}/>
      <Route path='/setavatar' element={<Setavatar/>}/>
      </Route>
      
      
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
