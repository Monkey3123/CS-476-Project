import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./components/Home/Home"; // Adjust the path as per your project structure
import RentalDetails from "./components/RentalDetails/RentalDetails";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import FindCars from "./components/Date/FindCars";
import CarPage from "./components/CarsPage/CarPage";
import CarDetail from './components/CarsPage/CarDetail';
import ListACarPage from "./components/ListACarPage/ListACarPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental-details" element={<RentalDetails />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="FindCars" element={<FindCars />} />
          <Route path="CarPage" element={<CarPage />} />
          <Route path="/ListACarPage" element={<ListACarPage />} />
          <Route path="/car/:id" element={<CarDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
