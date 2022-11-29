import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Puppeteer() {
    const [queryResult, setQueryResult] = useState("");
    const [queryStatus, setQueryStatus] = useState("GET MOVIE");
 

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
      const formatYear = (str, n) => {
        return str?.length > n ? str.slice(0, 4) + "" : str;
      };
      const formatHyphen = (punctuatedString) => {
        // var s = ", -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
        var s = punctuatedString;
        var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        var finalString = punctuationless.replace(/\s{2,}/g, " ");
        var hyphenedString = finalString.replaceAll(" ", "-").toLowerCase();
        return hyphenedString;
      };
    
    const fetchQuery = async (movie) => {
        setQueryStatus("GETTING...");
        const theFilm = await fetch(
          `/posts/`
        );
    
        const film = await theFilm.json();
        setQueryResult(film);
        // console.log(film, "film");
        setQueryStatus("ENJOY");
   
       
      };
    // Query when the page loads
    useEffect(() => {
        fetchQuery();
        }, []);
        
        return (
    <div className='h-screen bg-black text-white mt-20'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold'>Puppeteer</h1>
        </div>

        {/* Cards for all movies*/}
        <div>
            <div className='grid grid-cols-3 justify-center'>
                {queryResult &&
                    queryResult.map((movie) => (
                      <Link to={`/movies/${movie._id}`}>
                        <div
                            className='m-2 p-2 bg-gray-800 rounded-lg shadow-lg'
                        >
                            <h1 className='text-lg font-bold'>
                                {movie.title}
                            </h1>
                        
                        </div>
                      </Link>
                    ))}
             </div>
        </div>
    


    </div>
  )
}

export default Puppeteer