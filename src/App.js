import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SingleCharacter from './pages/SingleCharacter';
import SingleCreator from './pages/SingleCreator';
import SingleCharNew from './pages/SingleCharNew';
import SingleCreatorNew from './pages/SingleCreatorNew';
import Error from './pages/Error';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/character/:id'>
          <SingleCharacter />
        </Route>
        <Route path='/creator/:id'>
          <SingleCreator />
        </Route>
        <Route path='/characters/:id'>
          <SingleCharNew />
        </Route>
        <Route path='/creators/:id'>
          <SingleCreatorNew />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
