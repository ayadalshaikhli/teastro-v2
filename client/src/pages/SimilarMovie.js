import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";
import { Link } from "react-router-dom";
const base_url = "https://image.tmdb.org/t/p/original/";

function SimilarMovie({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    // console.log(fetchUrl);
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row mt-16 ml-20 text-white">
      {/* {Title} */}
      <h2 className="title">{title}</h2>

      {/* {Container -> Posters} */}

      <div
        className="row__posters flex mt-10 overflow-x-scroll overflow-y-hidden"
        
      >
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div className="poster flex-grow h-auto w-52 ml-1">
              <img
                key={movie.id}
                // onClick={() => handleClick(movie)}
                className={`row__poster p-3 ${
                  isLargeRow && "row__posterLarge"
                }`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              {/*             
            <div className="onhover" >
            <h1>{movie.title}</h1>
            <h1>{movie.overview}</h1>
            <h1>{movie.media_type}</h1>
            </div> */}
            </div>
          </Link>
        ))}
        {/* {tvs.map((movie) => (
          <Link to={`/details/${movie.id}`}  >
            
            <div className="poster" >
            <img
              key={movie.id}
              
              // onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              
            />
            <div className="onhover" >
            <h1>{movie.title}</h1>
            <h1>{movie.overview}</h1>
            </div>
            

            </div>
            
          </Link>
        )
        )} */}
      </div>

      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default SimilarMovie;
