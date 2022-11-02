import './App.css';
import { Login, Dashboard, Blog, Contact, ProtectedRoute } from './Components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <Login></Login>
            } />
          <Route path='/' element={
           <ProtectedRoute >
              <Dashboard />
           </ProtectedRoute>
          } />
          <Route
            path="blog"
            element={
             <ProtectedRoute >
                <Blog />
            </ProtectedRoute>
            } />
          <Route
            path="contact"
            element={
              <ProtectedRoute >
                <Contact />
              </ProtectedRoute>
            } />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
