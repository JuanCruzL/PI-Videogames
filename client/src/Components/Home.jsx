/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllVideogames,
  getAllGenres,
  sortVideogameByRating,
  sortByName,
  filterApiDb,
  filterByGenre,
  clearVideogamesId
} from "../Actions/actions.js";
import Card from "./Card.jsx";
import "../styles/Home.css";
import Page from "./Page.jsx";
import Loader from "./Loader.jsx";
import Nav from "./Nav.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const allvideogames = useSelector((state) => state.videogames);
  const genres = useSelector(state => state.genres)

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [order, setOrder] = useState("");

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allvideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const page = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    dispatch(GetAllVideogames());
    dispatch(clearVideogamesId())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(GetAllVideogames());
  }

  function handleSortRating(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(sortVideogameByRating(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleFilterApiorDatabase(e) {
    e.preventDefault();
    dispatch(filterApiDb(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  const handleFilterByGenre = (e) => {
    e.preventDefault()
    dispatch(filterByGenre(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
 }

  if (allvideogames.length) {
    return (
      <div className="home-container">
        <Nav></Nav>
        <button onClick={(e) => handleClick(e)}>
          Volver a cargar los videojuegos
        </button>
        <div className="filters-container">
          <div className="filterstext"> filter api/db
          <select onChange={(e) => handleFilterApiorDatabase(e)} className="filterdbapiselect">
            <option value="ALL" className="option">all</option>
            <option value="DB" className="option">data base</option>
            <option value="API" className="option">api</option>
          </select>
          </div>
          <div className="filterstext">alphabetical order
          <select onChange={(e) => handleSortName(e)} className="select">
            <option value="-" className="option">-</option>
            <option value="A-Z" className="option">A-Z</option>
            <option value="Z-A" className="option">Z-A</option>
          </select>
          </div>
          <div className="filterstext"> sort by rating
          <select onChange={(e) => handleSortRating(e)} className="select">
            <option value="-" className="option">-</option>
            <option value="Higher" className="option">Higher</option>
            <option value="Lower" className="option">Lower</option>
          </select>
          </div>
          <div className="filterstext"> filter by genre
          <select onChange={e => handleFilterByGenre(e)} className="select">
                  <option value="All" className="option">All</option>
               {
                  genres.map(g => (
                     <option key={g.id} value={g.name} className="option">{g.name}</option>
                     ))
               }
               </select>
          </div>
        </div>
        <div className="card-containerBig">
          <div className="card-container">
            {currentVideogames.map((e) => {
              return (
                <Card
                  name={e.name}
                  image={e.image}
                  genres={e.genres}
                  rating={e.rating}
                  id={e.id}
                  key={e.id}
                  createdInDb={e.createdInDb ? true : false}
                />
              );
            })}
          </div>
        </div>
        <div className="page-container">
          <Page
            allvideogames={allvideogames.length}
            videogamesPerPage={videogamesPerPage}
            page={page}
          />
        </div>
      </div>
    );
  } else return <Loader></Loader>;
}
