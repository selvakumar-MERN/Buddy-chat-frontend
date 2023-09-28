import React, { useState } from 'react';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs';
import './Chatinput.css'

function Chatinput({handlesendmsg}) {
    const [msg, setMsg] = useState("");
     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
     const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handlesendmsg(msg);
      setMsg("");
    }
  };
    return (
        <div className='input-container'>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
                </div>
            
            <form className='input-form' onSubmit={(e) => sendChat(e)}>
                
                <input type='text' id='input' placeholder='type your message here' 
                 onChange={(e) => setMsg(e.target.value)}
                 value={msg} ></input>
                
                <button className='input-button'>
                    <IoMdSend/>
                </button>
            </form>
            </div>
    );
}


export default Chatinput;