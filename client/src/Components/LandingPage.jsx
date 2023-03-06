import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="neon-Video">Video</div>
      <div className="neon-Games">Games</div>
      <div className="neon-Video2">Video</div>
      <div className="neon-Games2">Games</div>
        <Link to="/home" className="link-button">
          <button className="button-enter">
            <span></span>
            <span></span>
            <span></span>
            <span></span> Lets Go!
          </button>
        </Link>
    </div>
  );
}
