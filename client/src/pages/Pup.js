import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Pup({ match }) {
    const params = match.params.id;
    // console.log(params);
    const [queryResult, setQueryResult] = useState("");
    const [queryStatus, setQueryStatus] = useState("GET MOVIE");
    const fetchQuery = async (movie) => {
        // console.log(movie, "movie");
        setQueryStatus("GETTING...");
        const theFilm = await fetch(
          `/posts/api/movies?movieid=${movie}`
        );
           
        const film = await theFilm.json();
        setQueryResult(film);
        console.log(film, "film");
        setQueryStatus("ENJOY");
   
       
      };
    // Query when the page loads
    useEffect(() => {
        fetchQuery(params);
        }, []);
        
    
  return (
    <>
    <div>
        <button className="mt-56 rounded-md bg-white p-10" onClick={() => fetchQuery()}>Click</button>
    </div>
    <div>
        <h1>{queryResult.title}</h1>
        <h1>{queryResult.src}</h1>
    </div>
    </>
  )
}

export default Pup