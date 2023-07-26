import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import Routing from '../routing/Routing';

const Sidebar = ({ setActiveMenu }) => {
  return (
      <div className="sidebar">

        <div> <Link to='/deshboard' style={{ color: 'white', textDecoration: 'none' }}><h5> Dashboard </h5></Link> </div>
        <div> <Link to='/view-portfolio-managers' style={{ color: 'white', textDecoration: 'none' }}><h5>Manager</h5></Link> </div>
        <div> <Link to='/view-projects' style={{ color: 'white', textDecoration: 'none' }}><h5>Projects</h5></Link> </div>
        <div> <Link to='/view-tasks' style={{ color: 'white', textDecoration: 'none' }}><h5>Task</h5></Link> </div>
        <div> <Link to='/view-resources' style={{ color: 'white', textDecoration: 'none' }}><h5>Resource</h5></Link> </div>

      </div>
  );
};

export default Sidebar;
