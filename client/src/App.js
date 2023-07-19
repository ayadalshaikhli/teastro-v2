import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
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
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import Pup from './pages/Pup';
import MoviesDB from './pages/MoviesDB';
import ScrapedData from './pages/Scraping/ScrapedData';
import MoviesList from './pages/Movies/MoviesList';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import "./App.css";
import axios from 'axios';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login(user));
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <ApolloProvider client={client}>
      <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
      <Router>
      {!isLoggedIn ? ( // Use 'isLoggedIn' to check if the user is logged in
          <Switch>
            <LoginScreen />
          </Switch>
        ) : (
          <>
            <Nav />
            <Switch>
              <Route path="/profile" component={ProfileScreen} />
              
              <Route path="/movie/:id" component={MovieDetail} />
              <Route path="/movies/:id" component={Pup} />
              <Route path="/tv/:id" component={TvDetail} />
              <Route path="/person/:id" component={PersonDetail} />
              <Route path="/moviesDB/:id" component={MoviesDB} />
              <Route path="/mylist" component={Mylist} />
              <Route path="/puppeteer" component={Puppeteer} />
              <Route path="/scraped" component={ScrapedData} />
              <Route path="/pup" component={Pup} />
              <Route path="/data" component={MoviesList} />
              <Route exact path="/matchup/home" component={Home} />
              <Route exact path="/matchup" component={Matchup} />
              <Route exact path="/matchup/:id" component={Vote} />
              <Route exact path="/delete" component={Delete} />
              <Route exact path="/" component={Home} />
              <Route path="/list" component={List} />
              <Route path="/foobar" component={Foobar} />
              <Route component={NotFound} />
            </Switch>
          </>
        )}
      </Router>
    </ApolloProvider>
  );
}

export default App;
