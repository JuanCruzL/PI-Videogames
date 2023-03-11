/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameById } from "../Actions/actions";
import "../styles/Details.css";
import Loader from "./Loader";
import Nav from "./Nav";

export default function Details(prop) {
  const dispatch = useDispatch();
  const imageref = useRef(null);
  useEffect(() => {
    dispatch(getGameById(prop.match.params.id));
  }, []);

  const videogame = useSelector((state) => state.videogameID);

  const styles = {
    poster: {
      background: `url(${videogame.image}) no-repeat center`,
      backgroundSize: "cover",
      transition: "box-shadow .1s, transform",
      transform: "perspective(500px) scale(1) rotateX(0) rotateY(0)",
    },
  };

  function calculate(event) {
    let { clientX, clientY, target } = event;
    

    let height = event.clientY ;
    let width = event.clientX ;

    const yRotation = ((clientX - width / 2) / width) * 20;

    const xRotation = ((clientY - height / 2) / height) * 20;

    const string = `
    perspective(500px)
    scale(1,1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)`;
    event.target.style.transform = string;
  }

  if (!videogame.hasOwnProperty("name")) {
    return <Loader></Loader>;
  } else {
    return (
      <>
        <Nav></Nav>
        <div className="details-container-big">
          <div className="details-container">
            <div className="detailsbackground">
              <div className="detailsandimage">
                <div
                  ref={imageref}
                  id="poster"
                  className="videogameimage"
                  style={styles.poster}
                  onMouseOut={(e) =>
                    (e.target.style.transform = `
                            perspective(500px)
                            scale(1)
                            rotateX(0)
                            rotateY(0)`)
                  }
                  onMouseMove={(e) => calculate(e)}
                ></div>
                <div className="videogamename">{videogame?.name}</div>
                <div className="divider"></div>
                <div className="detailtitle">Genres:</div>
                <div className="detailcontentcontainer">
                  {videogame?.genres?.map((e) => (
                    <div className="detailcontent" key={e}>{`${e}`}</div>
                  ))}
                </div>
                <div className="detailtitle">Platforms:</div>
                <div className="detailcontentcontainer">
                  {videogame?.platforms?.map((e) => (
                    <div className="detailcontent" key={e}>{`${e}`}</div>
                  ))}
                </div>
                <div className="detailtitle">Release Date:</div>
                <div className="detailcontentcontainer">
                  <div className="detailcontent">{videogame?.released}</div>
                </div>
                <div className="detailtitle">Rating:</div>
                <div className="detailcontentcontainer">
                  <div className="detailcontent">{videogame?.rating}</div>
                </div>
              </div>
              <div className="verticaldividercontainer">
                <div className="verticaldivider"></div>
              </div>
              <div className="descriptioncontainer">
                <div className="description">
                  {videogame?.description?.replace(/<[^>]*>?/g, "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
