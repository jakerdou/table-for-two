import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Survey({ setSurveyCompleted }) {
  console.log('in survey');

  const [sampleRestaurants, setSampleRestaurants] = useState([])

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

  const getRecommendations = () => {
    fetch(`http://localhost:5000/get_recommendations`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sampleRestaurants)
        // body: {sample_ratings: {rest1: 5, rest2: 3, rest3: 1}}
    })
    .then(res => res.text())
    .then(res => console.log(JSON.parse(res)))
    .catch(err => err);
  }

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
    console.log('in restaurant list');
    return sampleRestaurants.map((sampleRestaurant, idx) => {
      console.log(sampleRestaurant);
      return (
        <Card>
          {sampleRestaurant.name}
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
        ? restaurantList()
        : 'Loading...'
      }
      <Button onClick={() => {setSurveyCompleted(true)}}>Submit</Button>
    </Container>
  );
}

export default Survey;
