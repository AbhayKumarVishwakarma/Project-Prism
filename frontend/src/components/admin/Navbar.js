import React from 'react'
import './Admin.css'
import MainContent from './MainContent';
import { Link } from 'react-router-dom';

const Navbar = () => {
  function adminImage(){
    console.log('ddsafd')
    return <MainContent/>
  }
    return (
        <nav className="navbar">
          <div className="navbar-left">
            <span className="company-name"> <Link to='/adminImage' style={{ color: 'white', textDecoration: 'none', fontWeight:'bold' }}>Project-Prism</Link>  </span>
          </div>
          <div className="navbar-middle">
            <input className='navbar-search' type="text" placeholder="Search..." />
            {/* <button type="submit"> 🔍 </button> */}
          </div>
          <div className="navbar-right">
            <span className="admin-name"> Admin </span>
          </div>
        </nav>
      );
}

export default Navbar