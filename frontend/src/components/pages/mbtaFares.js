import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GridPage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col>
          <Card className="my-2">
            <Card.Header className="text-center">
              <h4>Standard One-Way Fares</h4>
            </Card.Header>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Subway One-Way</Card.Title>
                    <Card.Text>$2.40</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Local Bus One-Way</Card.Title>
                    <Card.Text>$1.70</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Commuter Rail One-Way</Card.Title>
                    <Card.Text>$2.40 - $13.25</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Ferry One-Way</Card.Title>
                    <Card.Text>$2.40 - $9.75</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Card className="my-2">
            <Card.Header className="text-center">
              <h4>Subway and Bus Passes</h4>
            </Card.Header>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>One Day Pass</Card.Title>
                    <Card.Text>$11.00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Seven Day Pass</Card.Title>
                    <Card.Text>$22.50</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Monthly LinkPass</Card.Title>
                    <Card.Text>$90.00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Monthly Local Bus Pass</Card.Title>
                    <Card.Text>$55.00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GridPage;