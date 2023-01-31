import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
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
      {alerts.map(alert => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>Route</Card.Title>
        <Card.Subtitle>{alert.attributes.description}</Card.Subtitle>
        <Card.Text>{alert.relationships.line.data.id}</Card.Text>
        </Card.Body>
      </Card>
      ))}

        <h1>Routes!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.relationships.line.data.id}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;