import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MoviesDB(props) {
  const [moviesDB, setMoviesDB] = useState([]);

  const params = props.match.params.id;
  console.log(params);
 
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/api/moviesDB/${params}`);
      setMoviesDB(res.data);
    
    }
    fetchData();
  }, [params]);

  console.log(moviesDB);
  
  // const links = moviesDB.movieLinks;
  

  return (
    <>
    <div className='h-screen text-white bg-black p-20'>
    <h1>Movie Database</h1>
    <h1>{
        moviesDB.title
      }</h1>
      

   
    </div>
    </>
  )
}
