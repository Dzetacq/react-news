import React from 'react';
import News from './Components/News'
import Details from './Components/Details'
import Add from './Components/Add'
import Edit from './Components/Edit'
import About from './Components/About'
import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap';
import './styles/News.css';

const Header = () => (
  <Navbar className='App-header'>
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand href="/">React-News</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='me-auto'>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/add">
            <Nav.Link>Add</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

const Main = () => (
  <main className="news">
    <Routes>
      <Route path='/' element={<News/>} /> 
      <Route exact path='/news/:page' element={<News/>} /> 
      <Route path='/details/:id' element={<Details/>} /> 
      <Route path='/add' element={<Add/>} /> 
      <Route path='/edit/:id' element={<Edit/>} /> 
      <Route path='/about' element={<About/>} /> 
    </Routes>
  </main>
  
)

function App() {
  return (
    <BrowserRouter className="App">
      <Header />
      <Main />
    </BrowserRouter>
  );
}

export default App;
