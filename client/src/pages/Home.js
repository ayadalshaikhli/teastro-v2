import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MATCHUPS } from "../utils/queries";
import { DELETE_MATCHUP } from "../utils/mutations";
import {useLocation} from "react-router-dom";
import React from "react";
import "../App.css";
import requests from "./requests";
import Banner from "./Banner";
import Row from "./Row";
import TvRow from "./TvRow";


const Home = () => {
  const { data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache",
  });

  // const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

  const matchupList = data?.matchups || [];
  console.table(matchupList);

  const location = useLocation();
  const email = location.state && location.state.email;

  return (
    <div className="home__page overflow-hidden">
      <h1 className="text-white"> Hello {email} Me </h1>
     
      <Banner />
      <Row
        title="Movie Trending"
        fetchUrlMovie={requests.fetchMovieTrending}
        isLargeRow
      />
      <TvRow
        title="Tv Trending"
        fetchUrlTv={requests.fetchTvTrending}
        isLargeRow
      />
     

    </div>
  );
};

export default Home;
