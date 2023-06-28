import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function MoviesList() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('/api/data')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error retrieving data:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>Data</h1>
        <ul>
          {data.map(item => (
            <li key={item._id}>
              {item.name} - {item.age} - {item.email}
            </li>
          ))}
        </ul>
      </div>
    );
}
