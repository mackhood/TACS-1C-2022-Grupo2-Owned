import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { IsAuthenticated } from './services/appService';
import {  Routes,  Route, NavLink, useLocation, useNavigate} from "react-router-dom";

import LogIn from './pages/login/index';
import Home from './pages/home/index';
import Dictionary from './pages/dictionary/index';

export function App (){
  
  let location = useLocation();
  let navigate = useNavigate();

  const [auth, setAuth] = useState(IsAuthenticated());
  
  useEffect(() => {
    setAuth(IsAuthenticated());
    if(!auth){
      navigate('log-in');
    }
  }
  , [location])

  return(
      
    <div className="App">
        {
          auth?
          <>
            <Navbar bg="primary" variant="dark" expand="lg">
              <Container>
                <Navbar.Brand as={NavLink} to="/">Wordle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/help">Help</Nav.Link>
                    <Nav.Link as={NavLink} to="/dictionary">Dictionary</Nav.Link>
                    <NavDropdown title="Tournaments" id="basic-nav-dropdown">
                      <NavDropdown.Item  as={NavLink} to="/tournaments">My Tournaments</NavDropdown.Item>
                      <NavDropdown.Item  as={NavLink} to="/public-tournaments">Public Tournaments</NavDropdown.Item>
                      <NavDropdown.Divider></NavDropdown.Divider>
                      <NavDropdown.Item as={NavLink} to="/result">Today's Result</NavDropdown.Item>
                    </NavDropdown>                      
                  </Nav>
                  <Nav>
                    <Nav.Link rel="noopener noreferrer"  href='https://wordle.danielfrg.com/'  target="_bank">Play in English</Nav.Link>
                    <Nav.Link rel="noopener noreferrer"  href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Juega en Español</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
          : 
          <>
          </>
        }        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/log-in' element={<LogIn />} />
          <Route path='dictionary' element={<Dictionary />} />
        </Routes> 
    </div>
  );      
}

export default App;
