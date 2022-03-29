import React from 'react';
import News from './Components/News'
import Details from './Components/Details'
import Add from './Components/Add'
import Edit from './Components/Edit'
import About from './Components/About'
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom'

const Header = () => (
  <header className="App-header">
    <ul className="menu">
      <li><NavLink to="/" exact activeClassName='active'>Home</NavLink></li>
      <li><NavLink to="/add" activeClassName='active'>Add</NavLink></li>
      <li><NavLink to="/about" activeClassName='active'>About</NavLink></li>
    </ul>
  </header>
)

const Main = () => (
  <main className="news">
    <Switch>
      <Route exact path='/' component={News} /> 
      <Route exact path='/news/:page' component={News} /> 
      <Route path='/details/:id' component={Details} /> 
      <Route path='/add' component={Add} /> 
      <Route path='/edit/:id' component={Edit} /> 
      <Route path='/about' component={About} /> 
    </Switch>
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
