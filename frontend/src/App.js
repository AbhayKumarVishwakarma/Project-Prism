import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PortfolioManagerView from './components/manager/PortfolioManagerView';
import PortfolioManagerAdd from './components/manager/PortfolioManagerAdd';
import PortfolioManagerUpdate from './components/manager/PortfolioManagerUpdate';
import ProjectView from './components/project/ProjectView';
import ProjectAdd from './components/project/ProjectAdd';
import ProjectUpdate from './components/project/ProjectUpdate';
import ResourceView from './components/resource/ResourceView';
import ResourceAdd from './components/resource/ResourceAdd';
import ResourceUpdate from './components/resource/ResourceUpdate';
import TaskView from './components/task/TaskView';
import TaskAdd from './components/task/TaskAdd';
import TaskUpdate from './components/task/TaskUpdate';


function App() {
  return (
    <div className="App">
      <h1> Happy Hacking </h1>
      <Router>
        <div> <Link to='/view-portfolio-managers'><h3> view-portfolio-managers </h3></Link> </div>
        <div> <Link to='/add-portfolio-manager'><h3> add-portfolio-manager </h3></Link> </div>
        <div> <Link to='/view-projects'><h3> view-project </h3></Link> </div>
        <div> <Link to='/add-project'><h3> add-project </h3></Link> </div>
        {/* <div> <Link to='/view-tasks'><h3> view-task </h3></Link> </div>
        <div> <Link to='/add-task'><h3> add-task </h3></Link> </div>
        <div> <Link to='/view-resources'><h3> view-resource </h3></Link> </div>
        <div> <Link to='/add-resource'><h3> add-resource </h3></Link> </div> */}

        <Routes>
          {/* Portfolio manager */}
          <Route exact path="/view-portfolio-managers" element={<PortfolioManagerView />} />
          <Route exact path="/add-portfolio-manager" element={<PortfolioManagerAdd />} />
          <Route exact path="/update-portfolio-manager/:managerId" element={<PortfolioManagerUpdate />} />
          <Route path="/" component={PortfolioManagerView} />

          {/* Project */}
          <Route exact path='/view-projects' element={<ProjectView />} />
          <Route exact path='/add-project' element={<ProjectAdd />} />
          <Route exact path='/update-project/:projectId' element={<ProjectUpdate />} />

          {/* Task */}
          <Route exact path='/view-task/:projectId' element={<TaskView />} />
          <Route exact path='/add-task' element={<TaskAdd />} />
          <Route exact path='/update-task/:taskId' element={<TaskUpdate />} />

          {/* Resource */}
          <Route exact path='/view-resources' element={<ResourceView />} />
          <Route exact path='/add-resource' element={<ResourceAdd />} />
          <Route exact path='/update-resource/:resourceId' element={<ResourceUpdate />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
