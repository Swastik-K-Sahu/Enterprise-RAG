import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-container h-screen flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 flex flex-col">
          <div className="bg-blue-300">
            <Header />
          </div>

          <div className="flex-grow overflow-y-auto">
            <div className="content-container p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<KnowledgeBase />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;