import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


function CommentForm() {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8081/rating/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        rating: rating,
        comment: comment
      })
    });
   
    if (response.ok) {
      setShowModal(true);
      setModalMessage("Comment added successfully!");
      setUsername("");
      setRating("");
      setComment("");
    }
  };


  const handleCloseModal = () => setShowModal(false);


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>


        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="text" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </Form.Group>


        <Form.Group controlId="formComment">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        </Form.Group>


        <Button variant="primary" type="submit">Submit</Button>
      </Form>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comment Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CommentForm;


