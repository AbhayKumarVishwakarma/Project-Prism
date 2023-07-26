import React from 'react';
import './Admin.css';
import Routing from '../routing/Routing';
import image from '../image/home.jpg';

const MainContent = () => {
  return (
    <div className="main-content">
      <img src={image} alt="Home" style={{width:'100%', height:'100%'}}/>
      
      {/* <Routing/> */}

    </div>
  );
};

export default MainContent;
