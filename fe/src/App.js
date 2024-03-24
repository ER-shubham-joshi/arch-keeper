import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LazyLoadingIndicator from './components/LazyLoadingIndicator';

// Lazy-loaded components
const LazyLanding = lazy(() => import('./views/Landing'));
const LazyLogin = lazy(() => import('./views/Login'));
const LazySignup = lazy(() => import('./views/Signup'));
const LazyHome = lazy(() => import('./views/Home'));
const LazyProjects = lazy(() => import('./views/Projects'));
const LazyProjectDetail = lazy(() => import('./views/ProjectDetail'));


// Route configurations
const routes = [
  { path: '/', component: LazyLanding },
  { path: '/login', component: LazyLogin },
  { path: '/signup', component: LazySignup },
  { path: '/home', component: LazyHome },
  { path: '/client/:clientId', component: LazyProjects }, // Add route for Projects component
  { path: '/project/:projectId', component: LazyProjectDetail },
  // Add more routes as needed
];

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LazyLoadingIndicator />}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
