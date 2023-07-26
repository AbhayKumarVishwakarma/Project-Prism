import React from 'react'
import './PortfolioManager.css'
import { Link } from 'react-router-dom';
import Routing from '../routing/Routing';

const Nav = () => {
    return (

        <>
        <div className='nav-cont'>
            <div className='nav-cont-child'>
                <div> <Link to='/deshboard' style={{color:'#000b83', textDecoration: 'none'}}><h5> Home </h5></Link> </div>
                <div> <Link to='/view-portfolio-managers' style={{color:'#000b83', textDecoration: 'none'}}><h5>Manager</h5></Link> </div>
                <div> <Link to='/view-projects' style={{color:'#000b83', textDecoration: 'none'}}><h5>Project</h5></Link> </div>
                <div> <Link to='/view-tasks' style={{color:'#000b83', textDecoration: 'none'}}><h5>Task</h5></Link> </div>
                <div> <Link to='/view-resources' style={{color:'#000b83', textDecoration: 'none'}}><h5>Resource</h5></Link> </div>
            </div>
        </div>
        </>
        
        
    )
}

export default Nav