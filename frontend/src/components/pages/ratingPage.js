import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, Form, Button, Modal, Row, Col, Container } from 'react-bootstrap';

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      const result = await axios.get('http://localhost:8081/rating/getAll');
      setRatings(result.data);
    };
    fetchRatings();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:8081/rating/add', {
      username: username,
      rating: rating,
      comment: comment,
    });
    if (response.status === 200) {
      setModalMessage('Rating added successfully!');
      setShowModal(true);
      setUsername('');
      setRating('');
      setComment('');
      const result = await axios.get('http://localhost:8081/rating/getAll');
      setRatings(result.data);
    } else {
      setModalMessage('Error adding rating');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <h2>Add Rating</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
  
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
  
        <Col xs={12} md={6}>
          <h2>Previous Ratings</h2>
          <ListGroup>
            {ratings.map((rating) => (
              <ListGroupItem key={rating.id}>
                <h5>{rating.username}</h5>
                <p>Rating: {rating.rating}</p>
                <p>{rating.comment}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default RatingList;
