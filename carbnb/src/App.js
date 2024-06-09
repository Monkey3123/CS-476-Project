import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AsideBar from "./components/Navbar/AsideBar";
import { useState } from "react";

function App() {
  return (
    <div>
      <NavBar />
      <AsideBar />
    </div>
  );
}

export default App;
