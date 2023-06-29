import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Delete from './pages/Delete';
import Foobar from './pages/Foobar';
import Home from './pages/Home';
import List from './pages/List';
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import PersonDetail from "./pages/PersonDetail";
import Matchup from './pages/Matchup';
import Mylist from "./pages/Mylist";
import Puppeteer from "./pages/Puppeteer";
import Nav from "./pages/Nav";
import requests from "./pages/requests";
import Signin from "./pages/Signin";
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import "./App.css";
import Pup from './pages/Pup';
import MoviesDB from './pages/MoviesDB';
import ScrapedData from './pages/Scraping/ScrapedData';
import MoviesList from './pages/Movies/MoviesList';
import Login from './pages/components/Login';
import Signup from './pages/components/Signup';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = {
    name: 'John Doe',
  };
  useEffect(() => {
    // Check if the user is logged in from localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store the login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove the login status from localStorage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        {!user ? (
            <Switch>
            <Route path="/signup" component={Signup} />
            <Route component={() => <Login onLogin={handleLogin} />} />
          </Switch>  
        ) : (
          <>
          <Nav fetchUrl={requests.fetchSearch} />
          <Switch>
            {/* BASE COMPONENTS */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/movies/:id" component={Pup} />
            <Route path="/tv/:id" component={TvDetail} />
            <Route path="/person/:id" component={PersonDetail} />
            <Route path="/moviesDB/:id" component={MoviesDB} />
            <Route path="/signin" component={Signin} />
            <Route path="/mylist" component={Mylist} />
            <Route path="/puppeteer" component={Puppeteer} />
            <Route path="/scraped" component={ScrapedData} />
            <Route path="/pup" component={Pup} />
            <Route path="/data" component={MoviesList} />
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
        </>
        )}
      </Router>
    </ApolloProvider>
  );
}

export default App;
