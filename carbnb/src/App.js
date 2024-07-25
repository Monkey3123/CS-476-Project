import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import FindCars from "./pages/FindCarsPage";
import CarPage from "./pages/RentCarPage";
import CarDetail from "./pages/CarDetailPage";
import ListACarPage from "./pages/ListACarPage";
import { useUserContext } from "./hooks/useUserContext";
import MyListings from "./pages/MyListingsPage";
import MyBookings from "./pages/MyBookingsPage";
import RedirectPage from "./components/Navigation/RedirectPage";

function App() {
  const { user } = useUserContext();
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="FindCars" element={<FindCars />} />
          <Route path="CarPage" element={<CarPage />} />
          <Route
            path="/ListACarPage"
            element={user ? <ListACarPage /> : <RedirectPage />}
          />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/your-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
