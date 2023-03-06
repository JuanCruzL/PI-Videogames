import React, { useState } from "react";
import "../styles/SearchBar.css"
import { useDispatch } from 'react-redux'
import { getByName } from "../Actions/actions";

export default function SearchBar() {

    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch();

    const [game, setGame] = useState("") 

    function handleInputChange(e) {
        console.log(e)
        // setGame(e)
    }

       function handleInputChange(e) {
        e.preventDefault()
        setGame(e.target.value)
     }
  
     async function handleSubmit(e) {
        e.preventDefault()
        await dispatch(getByName(game))
        game.length && setCurrentPage(1) 
     }

    return (
        <div className="form-container">
            <form onSubmit={e=>handleSubmit(e)}>
              <input type="text" name="text" className="input" placeholder="Search Games..." onChange={e => handleInputChange(e)}></input>
            </form>
        </div>
    )
}