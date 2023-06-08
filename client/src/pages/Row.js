import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrlMovie, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrlMovie);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrlMovie]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="ml-20 mr-20 mt-10 text-white">
      <h2 className="title text-4xl py-2 ml-2">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} key={movie.id}>
            <div className="poster relative h-auto ml-2 mr-2">
              <img
                className={`row__poster rounded-xl ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
              />
              <div className="absolute left-0 bottom-0 px-5 py-5 bg-gradient-to-t from-gray-900 to-transparent w-full rounded-xl">
                <h1 className="text-md">{movie.title}</h1>
                <p className="text-xs">{movie.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Row;
