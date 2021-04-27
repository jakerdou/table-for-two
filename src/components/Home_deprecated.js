import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Home() {

  const handleSubmit = e => {
    e.preventDefault()
    console.log('city', e.target[0].value);
    console.log('food type', e.target[1].value);
  }
  const [city, setCity] = useState('Dallas')
  const handleSetCity = e => {
    setCity(e.target.value)
  }
  const [foodType, setFoodType] = useState('Tex-Mex')
  const handleSetFoodType = e => {
    setFoodType(e.target.value)
  }
  const inputForm = (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Pick your city:
            <select value={city} onChange={handleSetCity} className="ml-2">
              <option value="dallas">Dallas</option>
              <option value="houston">Houston</option>
              <option value="austin">Austin</option>
              <option value="san-antonio">San Antonio</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Pick your kind of food:
            <select value={foodType} onChange={handleSetFoodType} className="ml-2">
              <option value="tex-mex">Tex-Mex</option>
              <option value="fast-food">Fast Food</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
            </select>
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )

  return (
    <Container className='home'>
        <h3>
          Table for Two
        </h3>
        {inputForm}
    </Container>
  );
}

export default Home;
