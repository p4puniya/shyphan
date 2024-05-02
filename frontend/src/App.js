import React from 'react';
import { 
  BrowserRouter as 
  Router, Route,Navigate, Routes 
} from 'react-router-dom';
import LoginPage from './components/loginPage/LoginPage.js';
import NavigationPage from './components/navigationPage/NavigationPage.js';

function App() {
  return (
    <Router> 
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/navigation-page" element={<NavigationPage />} />
          </Routes>
    </Router>
  );
}

export default App;
