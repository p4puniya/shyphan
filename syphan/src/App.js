import React, { useState } from 'react';
import axios from 'axios';

function App() {
  //for Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  //for signup
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  //handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  //handle signup
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { email: signupEmail, password: signupPassword, username: signupUsername });
      setSignupMessage('Signup successful');
    } catch (error) {
      setSignupMessage(error.response.data.message);
    }
  };
  

  return (
    <div>
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
    <div>
    <h2>Signup</h2>
    <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
    <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
    <button onClick={handleSignup}>Signup</button>
    {signupMessage && <p>{signupMessage}</p>}
    </div>
    </div>
  );
}

export default App;
