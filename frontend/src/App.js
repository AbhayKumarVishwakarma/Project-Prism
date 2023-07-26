import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import Signup from './components/signup/Signup';
import PortfolioManagerHome from './components/manager/Home';
import SignupSuccess from './components/signup/SignupSuccess';


function App() {

  const [flag, setFlag] = useState(false)

  return (

    <Router>
      <Routes>


         <Route exact path="/" element={<Signup setFlag={setFlag} />} /> 
         <Route path='/admin' element={<SignupSuccess/>} />


         {/* <Route path='/admin' element={<AdminHome/>} /> 
         <Route path='/home' element={<PortfolioManagerHome/>} /> */}

      </Routes>


       {flag && <AdminHome/>}

    </Router>



  );
}

export default App;
