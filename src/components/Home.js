import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Survey from './Survey';

const dummySampleRestaurants = [
  ["restaurant1", "restaurant2", "restaurant3", "restaurant4", "restaurant5"],
  ["restaurant6", "restaurant2", "restaurant3", "restaurant4", "restaurant5"],
  ["restaurant7", "restaurant2", "restaurant3", "restaurant4", "restaurant5"],
  ["restaurant8", "restaurant2", "restaurant3", "restaurant4", "restaurant5"],
  ["restaurant9", "restaurant2", "restaurant3", "restaurant4", "restaurant5"]
]

function Home() {

  const [surveyStarted, setSurveyStarted] = useState(false);

  return (
    <Container className='home'>
      <div>Table for Two</div>
      <div>"The best restaurants, the cleanest bathrooms"</div>
      {
        !surveyStarted
        ? <Button onClick={() => {setSurveyStarted(true)}}>Click here to get started!</Button>
        : null
      }
      {
        surveyStarted
        ? <Survey sampleRestaurants={dummySampleRestaurants} />
        : null
      }
    </Container>
  );
}

export default Home;
