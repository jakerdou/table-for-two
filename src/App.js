import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './components/Home';

import './App.css';

const config = require('./frontend-config.json');

function App() {

  const getRestaurants = () => {
    fetch(`http://localhost:5000/get_restaurants`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.text())
    .then(res => console.log(JSON.parse(res)))
    .catch(err => err);
  }

  const getRecommendations = () => {
    fetch(`http://localhost:5000/get_recommendations`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sample_ratings: {rest1: 5, rest2: 3, rest3: 1}})
        // body: {sample_ratings: {rest1: 5, rest2: 3, rest3: 1}}
    })
    .then(res => res.text())
    .then(res => console.log(JSON.parse(res)))
    .catch(err => err);
  }

  /* root page route
  <Route path="/">
    <Button onClick={testAPI}>Hit Backend</Button>
    <Link to='/home'><Button>Go to Home Page</Button></Link>
  </Route>
  */

  return (
    <Router>
      <div className='app h-100'>
        <div className="mt-4">
          <Button onClick={getRestaurants}>Get Restaurants</Button>
          <Button onClick={getRecommendations}>Get Recommendations</Button>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
