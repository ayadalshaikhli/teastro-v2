import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link, useHistory } from "react-router-dom";

function Nav({ fetchUrl }) {
  const [show, handleShow] = useState(false);
  // const [searchTerm, setSearchTeam] = useState();
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

  const history = useHistory();

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   fetch(fetchUrl + searchTerm)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       searchTerm(data.results);
  //     });
  // };

  // const handleOnChange = (e) => {
  //   setSearchTeam(e.target.value);
  // };

  return (
    <div className={`nav ${show && "nav__black"} px-20`}>
      <div className="logo__links text-white">
        <img
          onClick={() => history.push("/")}
          className="website-logo"
          src="https://fontmeme.com/permalink/210902/ea52f9be615d012bb9369788bfdc977f.png"
          alt="netflix-font"
          border="0"
        />

        <ul>
          <li
            className="text-decoration-none"
            onClick={() => history.push("/")}
          >
            TOP CAST
          </li>
          <li
            className="text-decoration-none"
            onClick={() => history.push("/mylist")}
          >
            MOVICES
          </li>
          <li
            className="text-decoration-none"
            onClick={() => history.push("/mylist")}
          >
            TV SHOWS
          </li>
          <li
            className="text-decoration-none"
            onClick={() => history.push("/scraped")}
          >
            SCRAPED
          </li>
        </ul>
      </div>
      <div className="flex">
        <div className="px-4 py-2 bg-red-700 text-white rounded-2xl">
          Login/ Sign in
        </div>
        <div>
          {/* Profile Avatar */}
          <img
            onClick={() => history.push("/profile")}
            className="nav__avatar w-10 h-10 rounded-full cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix Avatar"
          />

        </div>
      </div>
    </div>
  );
}

export default Nav;
