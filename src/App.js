import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/layout/Nav";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/homepage/Homepage";
import LoginPage from "./components/loginpage/LoginPage";
import Admin from "./components/admin/Admin";
import ContactPage from "./components/contact/ContactPage";
import AccommodationPage from "./components/dashboard/accommodation/AccommodationPage";
import HotelDetails from "./components/dashboard/accommodation/hotels/HotelDetails";
import HotelPage from "./components/dashboard/accommodation/hotels/HotelPage";
import GhPage from "./components/dashboard/accommodation/guesthouses/GhPage";
import GuesthouseDetails from "./components/dashboard/accommodation/guesthouses/GhDetails";
import BabPage from "./components/dashboard/accommodation/bab/BabPage";
import BabDetails from "./components/dashboard/accommodation/bab/BabDetails";
import Footer from "./components/layout/Footer";
import Booking from "./components/booking/Bookings";
import BookingConfirmation from "./components/confirmation/BookingConfirmation";
import ContactConfirmation from "./components/confirmation/ContactConfirmation";
import AddHotel from "./components/admin/admintools/AddHotels";
import AddGhs from "./components/admin/admintools/AddGhs";
import AddBabs from "./components/admin/admintools/AddBabs";
import EditHotel from "./components/admin/admintools/EditHotel";
import EditGuesthouse from "./components/admin/admintools/EditGhs";
import EditBab from "./components/admin/admintools/EditBabs";
import About from "./components/about/About";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/bookingconfirmation">
            <BookingConfirmation />
          </Route>
          <Route path="/contactconfirmation">
            <ContactConfirmation />
          </Route>
          <Route path="/accommodation">
            <AccommodationPage />
          </Route>
          <Route path="/hotels">
            <HotelPage />
          </Route>
          <Route path="/hoteldetails/:id">
            <HotelDetails />
          </Route>
          <Route path="/guesthouses">
            <GhPage />
          </Route>
          <Route path="/guesthousedetails/:id">
            <GuesthouseDetails />
          </Route>
          <Route path="/bab">
            <BabPage />
          </Route>
          <Route path="/babdetails/:id">
            <BabDetails />
          </Route>
          <Route path="/addhotels">
            <AddHotel />
          </Route>
          <Route path="/addghs">
            <AddGhs />
          </Route>
          <Route path="/addbabs">
            <AddBabs />
          </Route>
          <Route path="/edithotel/:id">
            <EditHotel />
          </Route>
          <Route path="/editguesthouse/:id">
            <EditGuesthouse />
          </Route>
          <Route path="/editbab/:id">
            <EditBab />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
