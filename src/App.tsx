
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import TaskManager from './components/TaskManager';
import './styles/components.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700">
        <Routes>
          <Route path="/" element={<TaskManager />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
