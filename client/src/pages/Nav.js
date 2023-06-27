import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav({ fetchUrl }) {
  const [show, handleShow] = useState(false);
  const [searchTerm, setSearchTeam] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, [fetchUrl]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(fetchUrl + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        searchTerm(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTeam(e.target.value);
  };

  return (
    <div className={`nav ${show && "nav__black"} px-20`}>
      <div className="logo__links">
        <Link to="/">
          <img
            className="website-logo"
            src="https://fontmeme.com/permalink/210902/ea52f9be615d012bb9369788bfdc977f.png"
            alt="netflix-font"
            border="0"
          />
        </Link>
        <ul>
          <li>
            <a className="text-decoration-none" href="/">
              TOP CAST
            </a>
          </li>
          <li>
            <a className="text-decoration-none" href="/mylist">
              MOVICES
            </a>
          </li>
          <li>
            <a className="text-decoration-none" href="/mylist">
              TV SHOWS
            </a>
          </li>
          <li>
            <a className="text-decoration-none" href="/scraped">
              SCRAPED
            </a>
          </li>

        </ul>
      </div>
      <div>
        
        <div className="px-4 py-2 bg-red-700 text-white rounded-2xl">
          Login/ Sign in
        </div>
        {/* <form className="bn" onSubmit={handleOnSubmit}>
          <input
            className="search__bar "
            type="search"
            placeholder="Search-bar"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form> */}
      </div>
    </div>
  );
}

export default Nav;
