import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [isTokenSave, setIsTokenSave] = useState()
  useEffect(() => {
    if (window) {
      const item = window.localStorage.getItem("token")
      if (item) {
        setIsTokenSave(true)
      }
    }
  }, [])
  return (
    <div >
      {isTokenSave ? <p>You Logged In</p> : <button id="connect">Connect your Google Account</button>}
    </div>
  );
};

export default Popup;
