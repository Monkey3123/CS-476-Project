import React from "react";
import { Link } from "react-router-dom";
import carBanner from "../../images/car-banner.jpg";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-page">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${carBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="banner-content">
                <h1 className="banner-title">Explore the World with CaRnR</h1>
                <p className="banner-text">
                  Find your perfect car rental for any occasion.
                </p>
                <Link to="/FindCars" className="btn fancy-button">
                  Rent a Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About CaRnR</h2>
          <p className="section-text">
            CaRnR is your ultimate platform for renting cars hassle-free. Our
            mission is to provide a seamless experience, offering a wide
            selection of vehicles for any occasion. Whether you're planning a
            road trip or need a special car for an event, CaRnR connects renters
            with a diverse range of rental options globally.
          </p>
          <p className="section-text">
            Start your journey with CaRnR today and experience the freedom of
            choice when it comes to your next ride.
          </p>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-text">
            Have questions or need assistance? Reach out to us at
            contact@carnr.com
          </p>
          <p className="section-text">
            Follow us on social media for updates and news.
          </p>
        </div>
      </section>

      <footer className="bg-body-tertiary">
        <p className="p-3 m-0 text-center">
          &copy; {new Date().getFullYear()} CaRnR. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
