import React from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Nav() {
  return (
    <div className="nav-container">
    <div className="links-container">

      <Link to="/home" className="home-link">
        <div >
          <h1 className="nav-h1">Home</h1>
        </div>
      </Link>
      <Link to="/form" className="create-videogame-link">
      <h1 className="create-h1">Create Videogame</h1>
      </Link>
      <div className="search-container-div">

      <SearchBar></SearchBar>
      </div>
    </div>
    </div>
  );
}
