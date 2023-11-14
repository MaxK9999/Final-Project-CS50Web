import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BlogPosts from './components/BlogPosts';
import Navbar from './components/Navbar';
import Destinations from './components/Destinations';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogposts" element={<BlogPosts />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;