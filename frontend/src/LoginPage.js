// frontend/src/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = async() => {
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful');
      } catch (error) {
        setMessage(error.response.data.message);
      }
  };

  return (
      <div class="login-page">
      
        <h2>Login</h2>
      <input id= "login-Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input id="login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button class="login-button" onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
