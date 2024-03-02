import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LazyLoadingIndicator from './components/LazyLoadingIndicator';

// Lazy-loaded components
const LazyLanding = lazy(() => import('./components/Landing'));
const LazyLogin = lazy(() => import('./components/Login'));
const LazySignup = lazy(() => import('./components/Signup'));
const LazyHome = lazy(() => import('./components/Home'));
const LazyProject = lazy(() => import('./views/Project'));

// Route configurations
const routes = [
  { path: '/', component: LazyLanding },
  { path: '/login', component: LazyLogin },
  { path: '/signup', component: LazySignup },
  { path: '/home', component: LazyHome },
  { path: '/project', component: LazyProject },
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
