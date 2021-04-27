import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Survey from './Survey';
import Recommendations from './Recommendations';

function Home() {

  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [sampleRestaurants, setSampleRestaurants] = useState([])

  const handleGetStartedClick = () => {
    setSurveyStarted(true);
  }

  return (
    <Container className='home'>
      <div>Table for Two</div>
      <div>"The best restaurants, the cleanest bathrooms"</div>
      {
        !surveyStarted
        ? <Button onClick={handleGetStartedClick}>Click here to get started!</Button>
        : null
      }
      {
        surveyStarted && !surveyCompleted
        ? <Survey
          sampleRestaurants={sampleRestaurants}
          setSampleRestaurants={setSampleRestaurants}
          setSurveyCompleted={setSurveyCompleted}
        />
        : null
      }
      {
        surveyCompleted
        ? <Recommendations sampleRestaurants={sampleRestaurants} />
        : null
      }
    </Container>
  );
}

export default Home;
