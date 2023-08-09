import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";

import RoutesList from "./components/RoutesList.js";
import Timetable from "./components/Timetable.js";

import './App.css';

function App() {
  return (
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
              <Nav.Link as={Link} to="/routes">
                Tickets
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
      </Routes>
    </div>
  );
}

export default App;
