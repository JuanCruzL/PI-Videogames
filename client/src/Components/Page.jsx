import React from "react"
import "../styles/Page.css"


export default function Page({ videogamesPerPage, allvideogames, page }) {
  const pageNum = [];
  window.scrollTo({
    top:0,
    behavior:"smooth",
  })

  for (let i = 1; i <= Math.ceil(allvideogames / videogamesPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <div className="page-container">
      <nav className="numbers-nav">
        <ul className="ul-numbers">
          {pageNum.map((n) => (
            <li className="number" key={n}>
              <button className="pagebutton" onClick={() => page(n)}>
                {n}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
