import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./components/Navbar/LoginModal";

function App() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
