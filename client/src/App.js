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
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import "./App.css";
import Pup from './pages/Pup';
import MoviesDB from './pages/MoviesDB';
import ScrapedData from './pages/Scraping/ScrapedData';
import MoviesList from './pages/Movies/MoviesList';
import Login from './pages/components/Login';
import Signup from './pages/components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {


 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);





  return (
    <ApolloProvider client={client}>
      <Router>
        {!user ? (
          <Switch>
            <LoginScreen />
          </Switch>
        ) : (
          <>
            <Nav />
            <Switch>
              <Route path="/profile" >
                <ProfileScreen />
              </Route>
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
