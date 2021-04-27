import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Survey({sampleRestaurants}) {

  const [currentStep, setCurrentStep] = useState(0);

  const restaurantList = () => {
    return sampleRestaurants[currentStep].map((sampleRestaurant, idx) => {
      console.log(sampleRestaurant);
      return (
        <Card onClick={() => {setCurrentStep(currentStep + 1)}}>{sampleRestaurant}</Card>
      )
    })
  }

  return (
    <Container className='survey'>
      {restaurantList()}
    </Container>
  );
}

export default Survey;
