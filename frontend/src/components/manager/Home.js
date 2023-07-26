import React from 'react'
import Nav from './Nav'
import homeImage from '../image/home.jpg'
import './PortfolioManager.css'
import Routing from '../routing/Routing'
import ProjectViewByManager from '../project/ProjectViewByManager'
import TaskViewByProject from '../task/TaskViewByProject'
import TaskAdd from '../task/TaskAdd'
import TaskUpdate from '../task/TaskUpdate'
import ResourceViewByTask from '../resource/ResourceViewByTask'
import ResourceAdd from '../resource/ResourceAdd'
import ResourceUpdate from '../resource/ResourceUpdate'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const PortfolioManagerHome = () => {
  return (
    <>
      <Nav />
      {/* <div>Home</div> */}

      <div className='card__img'>
        <img src={homeImage} alt="" sizes="" srcset="" />
        <div style={{ width: '90%', margin: 'auto' }}>

          {/* <Routes>

            <Route exact path='/view-project/:managerId' element={<ProjectViewByManager />} />

            <Route exact path='/view-task/:projectId' element={<TaskViewByProject />} />
            <Route exact path='/add-task/:projectId' element={<TaskAdd />} />
            <Route exact path='/update-task/:taskId' element={<TaskUpdate />} />

            <Route exact path='/view-resource/:taskId' element={<ResourceViewByTask />} />
            <Route exact path='/add-resource/:taskId' element={<ResourceAdd />} />
            <Route exact path='/update-resource/:resourceId' element={<ResourceUpdate />} />

          </Routes> */}

          <Routing/>

        </div>
      </div>
    </>

  )
}

export default PortfolioManagerHome