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
      <div className="tft-header">
        <div className="tft-title">Table for Two</div>
        <div>"The best food, the cleanest bathrooms"</div>
      </div>
      <div className="mt-4">
        {
          !surveyStarted
          ? <div className="padding-bottom">
            <Button onClick={handleGetStartedClick} className="mid-page">
              Click here to get started!
            </Button>
          </div>
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
      </div>
    </Container>
  );
}

export default Home;
