import React, {} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Landingpage = () => {
  
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Card style={{ width: '40rem' }} className="mx-2 my-2 p-4">
        <Card.Body>
          <Card.Title className="mb-4 display-4">RideWise MBTA App</Card.Title>
          <Card.Subtitle className="mb-4 text-muted h4">This is our application that allows users to view a live feed of MBTA as well as routes, alerts, fares and contact.</Card.Subtitle>
          <Card.Link href="/signup" className="h4">Sign Up</Card.Link>
          <span className="h4 mx-4">or</span>
          <Card.Link href="/login" className="h4">Login</Card.Link>
        </Card.Body>
      </Card>
    </Container>
    </div>
  )
  
}

export default Landingpage;