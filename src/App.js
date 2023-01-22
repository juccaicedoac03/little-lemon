import React from 'react';
import './App.css';
import './styles/Mobile.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import Logo from './images/Logo.svg';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <header>
        <meta name="description" content="Little Lemon restaurant web page"/>
        <meta name="og:title" content="Little Lemon"/>
        <meta name="og:description" content="Little Lemon restaurant web page"/>
        <meta name="og:image" content={Logo}/>
      </header>
      <Header className="header"/>
      <Nav className="nav"/>
      <Routes>
        <Route path='/' element={<Main className="main"/>}/>
      </Routes>
      <Footer className="footer"/>
    </div>
  );
}

export default App;
