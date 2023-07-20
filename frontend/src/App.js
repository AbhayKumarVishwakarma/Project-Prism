import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PortfolioManagerView from './components/manager/PortfolioManagerView';
import PortfolioManagerAdd from './components/manager/PortfolioManagerAdd';
import PortfolioManagerUpdate from './components/manager/PortfolioManagerUpdate';

function App() {
  return (
    <div className="App">
      <h1> Happy Hacking </h1>
      <Router>
        <div> <Link to='/view-portfolio-managers'><h3> view-portfolio-managers </h3></Link> </div>
        <div> <Link to='/add-portfolio-manager'><h3> add-portfolio-manager </h3></Link> </div>
        <Routes>
          <Route exact path="/view-portfolio-managers" element={<PortfolioManagerView />} />
          <Route exact path="/add-portfolio-manager" element={<PortfolioManagerAdd />} />
          <Route exact path="/update-portfolio-manager/:managerId" element={<PortfolioManagerUpdate />} />
          <Route path="/" component={PortfolioManagerView} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
