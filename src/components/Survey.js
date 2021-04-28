import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Survey({ sampleRestaurants, setSampleRestaurants, setSurveyCompleted }) {
  // console.log('in survey');

  const getRestaurants = () => {
    fetch(`http://localhost:5000/get_restaurants`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.text())
    .then(res => setSampleRestaurants(JSON.parse(res)))
    .catch(err => err);
  }

  useEffect(() => {
    getRestaurants();
  }, [])



  const handleRatingChange = e => {
    // console.log(e.target.value, e.target.id);
    // const rest = sampleRestaurants.find(rest => rest.name == e.target.id)
    // console.log(rest);
    const restIndex = sampleRestaurants.findIndex(rest => rest.name === e.target.id)
    let updatedRestaurants = [...sampleRestaurants];
    updatedRestaurants[restIndex].rating = parseInt(e.target.value)
    // console.log('updatedRestaurants', updatedRestaurants);
    setSampleRestaurants(updatedRestaurants);
  }

  const restaurantList = () => {
    // console.log('in restaurant list');
    return sampleRestaurants.map((sampleRestaurant, idx) => {
      // console.log(sampleRestaurant);
      return (
        <Card>
          <div className="card-title">{sampleRestaurant.name}</div>
          <label>
            Rating:
            <select id={sampleRestaurant.name} value={sampleRestaurants[idx].rating} onChange={handleRatingChange} className="ml-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </Card>
      )
    })
  }

  return (
    <Container className='survey'>
      {
        sampleRestaurants.length > 0
        ? (
          <div>
            <div className="info-text">
              Please rate the following restaurants based on how much you think you would like them (with 5 being the highest and 1 being the lowest). This will help us build your profile and recommend the perfect restaurant for you.
            </div>
            {restaurantList()}
            <Button onClick={() => {setSurveyCompleted(true); window.scrollTo(0,0);}} className="my-3">
              Submit
            </Button>
          </div>
        )
        : <div className="mid-page padding-bottom animate">Loading...</div>
      }
    </Container>
  );
}

export default Survey;
