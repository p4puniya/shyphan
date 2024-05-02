import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Layout } from 'antd';
import loginBackground from './login_background.svg'; // Import the image
import './LoginPage.css';

const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  height: '100vh',
  width: '100%',
};
const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  height: '100%',
  backgroundColor: 'white',
  backgroundImage: `url(${loginBackground})`, // Use the imported image
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '40px',
  color: 'black',
  backgroundColor: 'white',
};
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful');
        navigate('/navigation-page');

      } catch (error) {
        setMessage(error.response.data.message);
      }
  };
  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        <div class= "login_board">
        <div class="login_title">SHYPHAN</div>
        <div class="login-page">
          <h2>Login</h2>
          <div class="login-form" />
            <input class="input" id= "login-Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input class="input" id="login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button class="login-button" onClick={handleLogin}>Login</button>
            {message && <div class="error-text">{message}</div>}
        </div>
        </div>
      </Sider>
      <Layout>
        <Content style={contentStyle}></Content>
      </Layout>
    </Layout>
  );
};
export default LoginPage;
