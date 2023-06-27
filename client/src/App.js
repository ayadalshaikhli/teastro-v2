// App.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Delete from './pages/Delete';
import Foobar from './pages/Foobar';
import Home from './pages/Home'; // REE and TEATRO
import List from './pages/List';
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import PersonDetail from "./pages/PersonDetail";
import LoginScreen from "./pages/HomeScreen/LoginScreen";
import Matchup from './pages/Matchup';
import Mylist from "./pages/Mylist"; // BASE
import Puppeteer from "./pages/Puppeteer";
import Nav from "./pages/Nav"; // BASE
import React from 'react';
import requests from "./pages/requests"; // BASE
import Signin from "./pages/Signin"; // BASE
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import "./App.css"; // BASE
import Pup from './pages/Pup';
import MoviesDB from './pages/MoviesDB';
import ScrapedData from './pages/Scraping/ScrapedData';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <LoginScreen />
        <Nav fetchUrl={requests.fetchSearch} />
        <div>
          <Switch>
            {/* BASE COMPONENTS */}
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/movies/:id" component={Pup} />
            <Route path="/tv/:id" component={TvDetail} />
            <Route path="/person/:id" component={PersonDetail} />
            <Route path="/moviesDB/:id" component={MoviesDB} />
            <Route path="/signin" component={Signin} />
            <Route path="/mylist" component={Mylist} />
            <Route path="/puppeteer" component={Puppeteer} />
            <Route path="/scraped" component={ScrapedData} />
            {/* BASE END */}
            {/* MATCHUP COMPONENTS */}
            <Route exact path="/matchup/home" component={Home} />
            <Route exact path="/matchup" component={Matchup} />
            <Route exact path="/matchup/:id" component={Vote} />
            <Route exact path="/delete" component={Delete} />
            {/* REE COMPONENTS */}
            <Route exact path="/" component={Home} />
            <Route path="/list" component={List} />
            <Route path="/foobar" component={Foobar} />
            {/* REE END */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
