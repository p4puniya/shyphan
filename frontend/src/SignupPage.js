import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

// Define a schema using Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

function SignupPage() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignup = async () => {
    try {
      // Validate input fields against the schema
      schema.parse({ email: signupEmail, password: signupPassword, username: signupUsername });

      // If validation succeeds, send the request
      await axios.post('http://localhost:5000/signup', { email: signupEmail, password: signupPassword, username: signupUsername });
      setSignupMessage('Signup successful');
    } catch (error) {
      // If validation fails, set an appropriate error message
      setSignupMessage('Invalid input. Please check your email, password(minimum 6 characters), and username(minimum 3 characters).');
    }
  };

  return (
    <div class="login-page">
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      {signupMessage && <p>{signupMessage}</p>}
    </div>
  );
}

export default SignupPage;
