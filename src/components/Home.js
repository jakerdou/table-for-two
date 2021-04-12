import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Home() {
  console.log('in home');

  return (
    <Container className='home'>
        <Row>
            <Col>
                Table For Two
            </Col>
        </Row>
    </Container>
  );
}

export default Home;
