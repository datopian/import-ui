import React, { Component } from 'react';
import FileUpload from './components/FileUpload';

import { FileConsumer } from './context/FileContext';

class Home extends Component {

  render() {

    return (
      <>
      <main role="main" className="container-fluid">
        <h1>Welcome</h1>
        <p className="lead">This is the home page.</p>
        <FileConsumer>
          {({ file, fileUpload, type }) => (
            <div>
                {type === "wrong" ? (
                  <div className="alert alert-danger" role="alert">Hey there. We only accept CSVs.</div>
                ) : (
                  <></>
                )}
                {file ? (
                  <div><p>Ready to rock with: {file.name}</p></div>
                ) : (
                  <FileUpload upload={fileUpload} />
                )}
            </div>
          )}
        </FileConsumer>
      </main>
      </>
    );
  }
}

export default Home;
