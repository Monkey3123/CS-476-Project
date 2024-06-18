import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./components/Home/Home"; // Adjust the path as per your project structure
import RentalDetails from "./components/RentalDetails/RentalDetails";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental-details" element={<RentalDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
