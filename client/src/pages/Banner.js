import axios from "./axios";
import React, { useState, useEffect} from "react";
import requests from "./requests";
import "./Banner.css";
import gsap from "gsap";
import { Link } from "react-router-dom";
import StarRating from "./Helpers/StarRating";

const base_image_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  // let tl = gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchMovieTrending);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length)
        ]
      );
      console.log("+++");
      console.log(request);
      console.log("+++");
      return request;
    }
    fetchData();
  }, []);


  //   tl.from(
  //     background,
  //     2,
  //     {
  //       opacity: 1,

  //       ease: Expo.easeInOut,
  //     },
  //     "-=1"
  //   );
  //   tl.to(
  //     title,
  //     3,
  //     {
  //       y: "10",
  //       opacity: 1,

  //       ease: Expo.easeInOut,
  //     },
  //     "-=2"
  //   );
  //   tl.to(button, 3, {
  //     y: "-10",
  //     opacity: 1,

  //     ease: Expo.easeInOut,
  //   });
  //   tl.to(
  //     button1,
  //     3,
  //     {
  //       y: "-10",
  //       opacity: 1,

  //       ease: Expo.easeInOut,
  //     },
  //     "-=3"
  //   );
  //   tl.to(
  //     description,
  //     3,
  //     {
  //       y: "-10",
  //       opacity: 1,

  //       ease: Expo.easeInOut,
  //     },
  //     "-=4"
  //   );
  //   tl.to(
  //     stars,
  //     3,
  //     {
  //       y: "-10",
  //       opacity: 1,

  //       ease: Expo.easeInOut,
  //     },
  //     "-=5"
  //   );
  // });

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function year(str, n) {
    return str?.length > n ? str.slice(0, 4) + "" : str;
  }
  const [rating, setRating] = useState(Math.floor(movie?.vote_average / 2));

  function handleRatingChange(newRating) {
    setRating(newRating);
  }

  return (
    <div
      className="banner text-white hidden w-full bg-cover h-screen bg-center bg-no-repeat md:relative md:block lg:flex md:bg-cover md:h-screen md:bg-center-center"
      style={{
        backgroundImage: `url(${base_image_url}${movie?.backdrop_path}
        )`,
      }}
    >
      <div className="all-details text-sm pb-10 md:absolute md:bottom-0 md:text-3xl z-20 md:px-20 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="banner__contents  ">
          <h1 className="banner__title text-sm md:text-6xl">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="start__details mt-10" >
            <div className="reviews flex">
              <h1 className="banner_stars ">
                <StarRating value={rating} onChange={handleRatingChange} />
              </h1>
              <div className="flex gap-x-10">
                <h1>{Math.floor(movie?.vote_average / 2)}</h1>
                <h1>{movie?.vote_count} Reviews</h1>
                <h1> {year(movie.release_date, 4)}</h1>
              </div>
            </div>
          </div>
        </div>

        <p
          className="banner__description text-base w-full overflow-hidden mb-10 pb-9 h-auto md:w-1/2"

        >
          {truncate(movie?.overview, 250)}
        </p>
        <div className="banner__buttons space-x-10">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <button
              className="banner__button  bg-red-600 rounded-lg text-white px-16 py-3 "
            >
              Play
            </button>
          </Link>
          <button
            className="banner__button  bg-red-600 rounded-lg text-white px-16 py-3"
          >
            My List
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
