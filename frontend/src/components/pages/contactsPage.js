import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ContactList = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col>
          <Card className="my-2">
            <Card.Header className="text-center">
              <h4>Contact List</h4>
            </Card.Header>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Information & Support</Card.Title>
                    <Card.Text>	617-222-3200</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Emergency Contacts: Transit Police</Card.Title>
                    <Card.Text>617-222-1212</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="m-0">
              <Col>
                <Card className="my-2">
                  <Card.Body>
                    <Card.Title>Report a railroad crossing gate issue</Card.Title>
                    <Card.Text>800-522-8236</Card.Text>
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


export default ContactList;