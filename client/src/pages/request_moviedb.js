import React, { useEffect, useState } from 'react';
import axios from 'axios';

const requestMovieDB = {
    fetchById : async (id) => {
        const res = await axios.get(`http://localhost:5000/api/moviesDB/${id}`);
        return res.data;
    }

}



export default requestMovieDB;