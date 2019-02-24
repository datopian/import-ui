import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'


import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Pager from './components/Pager';
import Footer from './components/Footer';

import Home from './Home'
import Preview from './Preview'
import Schema from './Schema'
import Detail from './Detail'
import Publish from './Publish'

import { FileProvider } from './context/FileContext';

library.add(faIgloo);

class App extends Component {
  render() {
    const home =   <Home />
    const preview = <Preview />
    const schema =   <Schema />
    const detail =   <Detail />
    const publish =   <Publish />
    return (
      <div>
        <div className='App'>
          <Router basename={process.env.PUBLIC_URL}>
            <FileProvider>
							<Header />
							<Breadcrumb />
							<main role="main" className="container-fluid">
								<Route exact={true} path='/' render={()=>(home)} />
								<Route exact={true} path='/preview' render={()=>(preview)} />
								<Route exact={true} path='/schema' render={()=>(schema)} />
								<Route exact={true} path='/detail' render={()=>(detail)} />
								<Route exact={true} path='/publish' render={()=>(publish)} />
								<Pager />
							</main>
              <Footer />
            </FileProvider>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
