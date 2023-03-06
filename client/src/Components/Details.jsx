import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameById } from "../Actions/actions";
import "../styles/Details.css";
import Loader from "./Loader";
import Nav from "./Nav";

export default function Details(prop) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameById(prop.match.params.id));
  }, [dispatch]);

  const videogame = useSelector((state) => state.videogameID);

  let genres = [];
  let platforms = [];

  if (videogame) {
    genres = videogame?.genres?.map((e) => (e.name ? e.name : e)).join(", ");
    platforms = videogame?.platforms
      ?.map((e) => (e.name ? e.name : e))
      .join(", ");
  }
  if (videogame.hasOwnProperty("name")) {
    return (
      <>
      <Nav></Nav>
      <div className="details-container-big">
        <div className="details-container">
          <div className="card1-details1">
            <div className="card2-details2">
              <div className="details-image-container">
                <img src={videogame.image} className="details-image"></img>
              </div>
              <div className="details-things">
                <h1 className="details-name">{videogame.name}</h1>
                <h2 className="genres-h2">Genres:</h2>
                <p className="genres-p">{genres}</p>
                <h2 className="platforms-h2">Platforms:</h2>
                <p className="platforms">{platforms}</p>
                <h2 className="release-h2">Release Date:</h2>
                <p className="release">{videogame.released}</p>
                <h2 className="rating-h2">Rating:</h2>
                <p className="rating">{videogame.rating}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="card1-details1">
            <div className="card2-details2">
              <p className="details-description">{videogame.description ? videogame.description.replace(/<[^>]*>?/g, "") : "there is no description"}</p>
            </div>
              
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return <Loader></Loader>;
  }
}
