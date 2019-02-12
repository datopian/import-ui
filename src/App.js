import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';

import Home from "./Home"

class App extends Component {
  render() {
    const home =   <Home />
    return (
      <div>
        <div className="App">
          <Header/>
          <Router>
            <div>
              <Route exact={true} path='/' render={()=>(home)} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
