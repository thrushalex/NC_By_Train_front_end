import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import { GoogleOAuthProvider } from '@react-oauth/google';

import RoutesList from "./components/RoutesList.js";
import Timetable from "./components/Timetable.js";
import Ticket from "./components/Ticket.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login";
import Logout from "./components/Logout";

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Navbar className="navbar" expands="lg" sticky="top" variant = "light">
          <Container className="container-fluid">
            <Navbar.Brand href="/">
              <img src="/images/train_icon.svg" alt="train logo" className="trainLogo"/>
              NC By Rail
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/routes">
                  Routes
                </Nav.Link>
                {/* Update links when working on this functionlity */}
                <Nav.Link as={Link} to="/timetable">
                  Timetables
                </Nav.Link>
                <Nav.Link as={Link} to="/tickets">
                  Tickets
                </Nav.Link>
                { user && (
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                                    )}
              </Nav>
            </Navbar.Collapse>
            { user ? (
                  <Logout setUser={setUser} clientId={clientId}/>
                ) : (
                  <Login setUser={setUser}/> 
              )}
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={
            <RoutesList />}
          />
          <Route exact path="/routes" element={
            <RoutesList />}
          />
          <Route exact path="/timetable" element={
            <Timetable />}
          />
          <Route exact path="/tickets" element={
            <Ticket user={ user }/>}
          />
          <Route exact path="/tickets" element={
            <Ticket />}
          />
          <Route exact path="/profile" element={
            <Profile user={ user }/>}
          />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
