import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="container">
        <h1>OUR</h1>
        <h2>Coffee Shop</h2>
        <button className="menu-button">
          <Link to="/menu">Voir Le Menu</Link>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
