import Navbar from './Navbar';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Admin.css';
import Routing from '../routing/Routing';
import { useLocation } from 'react-router-dom';

const AdminHome = () => {
let {pathname}=useLocation()
console.log(pathname)
  return (
    <>
      <Navbar />
 
      <div className="admin-home">
        <Sidebar />

        {pathname=="/admin"?<div style={{width:"100%"}}>

       <MainContent />

        </div>:""}
        <div className="main-content">
           <Routing/>
           </div>     
        
      </div>
    </>
  );
};

export default AdminHome;
