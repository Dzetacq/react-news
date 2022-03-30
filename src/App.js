import React from 'react';
import News from './Components/News'
import Details from './Components/Details'
import Add from './Components/Add'
import Edit from './Components/Edit'
import About from './Components/About'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap';
import './styles/News.css';

const Header = () => (
  <Navbar className='App-header'>
    <Container>
      <LinkContainer to="/ebert/">
        <Navbar.Brand href="/ebert/">React-News</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='me-auto'>
          <LinkContainer to="/ebert/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/ebert/add">
            <Nav.Link>Add</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/ebert/about">
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
      <Route exact path='/ebert/news/:page' element={<News/>} /> 
      <Route path='/ebert/details/:id' element={<Details/>} /> 
      <Route path='/ebert/add' element={<Add/>} /> 
      <Route path='/ebert/edit/:id' element={<Edit/>} /> 
      <Route path='/ebert/about' element={<About/>} /> 
      <Route path='/ebert/*' element={<News/>} /> 
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
