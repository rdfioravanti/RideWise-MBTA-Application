import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/routes',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Row>
        {alerts.map(alert => (
          <Col sm={6} md={3} key={alert.id}>
            <Card
              body
              outline
              color="success"
              className="mx-1 my-2"
            >
              <Card.Body>
                <Card.Title>Route</Card.Title>
                <Card.Subtitle>{alert.attributes.description}</Card.Subtitle>
                <Card.Text>{alert.relationships.line.data.id}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Alerts;
