import React from 'react';
import { BrowserRouter as Router, Route,Navigate, Link, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import './styles.css';

function App() {
  
  return (
    <div className="App">
    <Router> 
      
        <div class= "login_board">          
          <div class="login_title">SHYPHAN</div>
          <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<LoginPage/>} />
          
          </Routes>
            <div class="buttons">        
                  <div><Link to="/login">Login With Google</Link></div>
            </div>
        </div>
    </Router>
    </div>
  );
}

export default App;
