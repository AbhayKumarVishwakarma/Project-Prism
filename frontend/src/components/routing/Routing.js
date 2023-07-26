import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AdminDeshboard from '../admin/AdminDeshboard';
import PortfolioManagerView from '../manager/PortfolioManagerView'
import PortfolioManagerAdd from '../manager/PortfolioManagerAdd'
import PortfolioManagerUpdate from '../manager/PortfolioManagerUpdate'
import ProjectViewAll from '../project/ProjectViewAll'
import ProjectViewByManager from '../project/ProjectViewByManager'
import ProjectAdd from '../project/ProjectAdd'
import ProjectUpdate from '../project/ProjectUpdate'
import TaskViewByProject from '../task/TaskViewByProject'
import TaskAdd from '../task/TaskAdd'
import TaskUpdate from '../task/TaskUpdate'
import ResourceViewAll from '../resource/ResourceViewAll'
import ResourceViewByTask from '../resource/ResourceViewByTask'
import ResourceAdd from '../resource/ResourceAdd'
import ResourceUpdate from '../resource/ResourceUpdate'
import TaskViewAll from '../task/TaskViewAll';
import MainContent from '../admin/MainContent';

const Routing = () => {
  return (
    

        

        

        <Routes>

          <Route path='/adminImage' element={<MainContent/>} />
          <Route exact path='/deshboard' element={<AdminDeshboard/>} />

          {/* Portfolio manager */}
          <Route exact path="/view-portfolio-managers" element={<PortfolioManagerView />} />
          <Route exact path="/add-portfolio-manager" element={<PortfolioManagerAdd />} />
          <Route exact path="/update-portfolio-manager/:managerId" element={<PortfolioManagerUpdate />} />
          {/* <Route path="/" component={PortfolioManagerView} /> */}

          {/* Project */}
          <Route exact path='/view-projects' element={<ProjectViewAll />} />
          <Route exact path='/view-project/:managerId' element={<ProjectViewByManager />} />
          <Route exact path='/add-project' element={<ProjectAdd />} />
          <Route exact path='/update-project/:projectId' element={<ProjectUpdate />} />

          {/* Task */}
          <Route exact path='/view-tasks' element={<TaskViewAll />} />
          <Route exact path='/view-task/:projectId' element={<TaskViewByProject />} />
          <Route exact path='/add-task/:projectId' element={<TaskAdd />} />
          <Route exact path='/update-task/:taskId' element={<TaskUpdate />} />

          {/* Resource */}
          <Route exact path='/view-resources' element={<ResourceViewAll />} />
          <Route exact path='/view-resource/:taskId' element={<ResourceViewByTask />} />
          <Route exact path='/add-resource/:taskId' element={<ResourceAdd />} />
          <Route exact path='/update-resource/:resourceId' element={<ResourceUpdate />} />

        </Routes>
    
  )
}

export default Routing