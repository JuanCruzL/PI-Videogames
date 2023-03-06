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
        <div>
          <select onChange={(e) => handleFilterApiorDatabase(e)}>
            <option value="ALL">all</option>
            <option value="DB">data base</option>
            <option value="API">api</option>
          </select>
          <select onChange={(e) => handleSortName(e)}>
            <option value="-">-</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select onChange={(e) => handleSortRating(e)}>
            <option value="-">-</option>
            <option value="Higher">Higher</option>
            <option value="Lower">Lower</option>
          </select>
          <select className='select'  onChange={e => handleFilterByGenre(e)}>
                  <option value="All">All</option>
               {
                  genres.map(g => (
                     <option key={g.id} value={g.name}>{g.name}</option>
                     ))
               }
               </select>
        </div>
        <div className="card-containerBig">
          <div className="card-container">
            {currentVideogames.map((e) => {
              return (
                <Card
                  name={e.name}
                  image={e.image}
                  genres={e.genres}
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
