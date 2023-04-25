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
        'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
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
                <Card.Title>Alert</Card.Title>
                <Card.Text>{alert.attributes.header} {alert.attributes.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Alerts;
