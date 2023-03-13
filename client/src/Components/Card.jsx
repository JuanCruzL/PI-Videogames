import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

export default function Card({ id, image, name, genres, rating,createdInDb }) {
  let genres2 = genres.map(e => e.name ? e.name : e)
      return (
        <div className="Big-container">
          <div className="card2">
          <Link className="Link" to={`/videogames/${id}`}>
            <div className="container">
              <div>
                <div className="image-container">
                  <img className="game-image" src={image} alt={`${name}`} />
                </div>
                <div className="game-name-genres">
                  <h1 className="game-name">{name}</h1>
                  <div className="genres">
                    {genres2.map((e) => {
                      return <p key={e}>{e}</p>;
                    })}
                  </div>
                  Rating: {rating}
                </div>
              </div>
            </div>
          </Link>
          </div>
        </div>
      );
    }
