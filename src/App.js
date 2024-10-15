import logo from './logo.svg';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import React from 'react';
import './scss/app.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';



function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
