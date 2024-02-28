// App.js

// const LazyLogin = lazy(() => import('./components/Login'));
// const LazySignup = lazy(() => import('./components/Signup'));
// const LazyDashboard = lazy(() => import('./components/Dashboard'));


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      {/* Use the <Routes> component to define your routes */}
      <Routes>
        {/* 
          Define a Route for the Home component.
          When the path is '/', render the Home component.
          This is your landing page.
        */}
        <Route path="/" element={<Home />} />

        {/* 
          Define a Route for the Login component.
          When the path is '/login', render the Login component.
          This is where users will navigate to log in.
          Note: The Login component will receive location information, including state.
        */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
