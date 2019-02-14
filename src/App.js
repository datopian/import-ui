import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Pager from './components/Pager';

import Home from './Home'
import Preview from './Preview'
import Publish from './Publish'

import { FileProvider } from './context/FileContext';

class App extends Component {
  render() {
    const home =   <Home />
    const publish =   <Publish />
    const preview = <Preview />
    return (
      <div>
        <div className='App'>
          <Router basename={process.env.PUBLIC_URL}>
            <FileProvider>
              <Header />
              <Breadcrumb />
              <Route exact={true} path='/' render={()=>(home)} />
              <Route exact={true} path='/preview' render={()=>(preview)} />
              <Route exact={true} path='/publish' render={()=>(publish)} />
              <Pager />
            </FileProvider>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
