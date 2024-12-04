import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="container">
        <h1>THE BUZZ</h1>
        <h2>LOUNGE</h2>
        <button className="menu-button">
          <Link to="/categories">Voir Le Menu</Link>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
