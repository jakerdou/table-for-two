import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Recommendations({ sampleRestaurants }) {
  console.log('in reco');

  const [recommendations, setRecommendations] = useState([])

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
    .then(res => setRecommendations(JSON.parse(res)))
    .catch(err => err);
  }

  useEffect(() => {
    getRecommendations();
  }, [])

  const recommendationList = () => {
    console.log('in reco list');
    return recommendations.map((recommendation, idx) => {
      // console.log(recommendation);
      return (
        <Card>
          {recommendation.name}
        </Card>
      )
    })
  }

  return (
    <Container className='recommendations'>
      {
        recommendations.length > 0
        ? recommendationList()
        : 'Loading...'
      }
    </Container>
  );
}

export default Recommendations;
