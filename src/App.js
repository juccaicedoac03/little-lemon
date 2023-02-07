import React from 'react';
import './App.css';
import './styles/Mobile.css';
import './styles/Booking.css';
import './styles/BookingMobile.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import Footer from './components/Footer';
import { Route,Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { submitAPI } from "./api/api";

function App() {
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
        navigate("/confirmation", { state: { reservations: formData } });
    }
  }

  const redirectBooking = () => {
    navigate("/reservation");
  }

  const redirectHome = () => {
    navigate("/");
  }

  const redirectReservation = () => {
    navigate("/reservation");
  }
  return (
    <div className='container'>
      <Header className="header" handleClick={redirectHome}/>
      <Nav className="nav"/>
      <Routes>
        <Route path='/' element={<Main className="main" handleClick={redirectBooking}/>}/>
        <Route path='/reservation' element={<BookingPage className="main" submitForm={submitForm}/>}/>
        <Route path='/confirmation' element={<ConfirmedBooking handleClick={redirectHome} redirectReservation={redirectReservation}/>}/>
      </Routes>
      <Footer className="footer"/>
    </div>
  );
}

export default App;
