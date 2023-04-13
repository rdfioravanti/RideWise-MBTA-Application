import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import './Navbar.css';

export default function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <ReactNavbar bg="dark" variant="dark" className="navbar">
      <Nav className="flex-column">
        <Nav.Link href="/" className="nav-link">Start</Nav.Link>
        <Nav.Link href="/home" className="nav-link">Home</Nav.Link>
        <Nav.Link href="/mbtaAlerts" className="nav-link">Alerts</Nav.Link>
        <Nav.Link href="/mbtaRoutesPage" className="nav-link">Routes</Nav.Link>
        <Nav.Link href="/mbtaLiveMap" className="nav-link">Live Map</Nav.Link>
        <Nav.Link href="/mbtaFares" className="nav-link">Fares</Nav.Link>
        <Nav.Link href="/contactsPage" className="nav-link">Contact</Nav.Link>
        <Nav.Link href="/ratingPage" className="nav-link">Rate Us!</Nav.Link>

        <Nav.Link href="/privateUserProfile" className="nav-link">Profile</Nav.Link>
      </Nav>
    </ReactNavbar>
  );
}