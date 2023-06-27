import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


export default function ScrapedData() {
  const [scrapedData, setScrapedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:5000/api/scraped');
      setScrapedData(res.data);
      setLoading(false);
    }
    fetchData();
  }, []);
      

  // Pagination logic
  const applySearchFilter = (data, query) => {
    if (query.trim() === '') {
      return data;
    } else {
      return data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
    }
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = applySearchFilter(scrapedData, searchQuery).slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (indexOfLastRow < scrapedData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-full bg-white pt-20">
      <h1 className="text-3xl text-center">Scraped Data</h1>
      
      {loading ? (
        <div className="loading animate-bounce">Loading...</div>
      ) : (
        <>
          <div>
            <input
              type="text"
              placeholder="Search by title"
              className="border border-gray-400 rounded px-2 py-1 my-2"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />

            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">SRC</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map(movie => (
                  <Link  to={`/moviesDB/${movie._id}`} key={movie._id}>
                    <td className="border px-4 py-2">{movie.title}</td>
                    <td className="border px-4 py-2">{movie.src}</td>

                  </Link>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
              disabled={indexOfLastRow >= scrapedData.length}
            >
              Next Page
            </button>
          </div>

        </>
      )}
    </div>
  );
}
