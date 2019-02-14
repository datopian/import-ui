import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'

class Publish extends Component {

  fileUpload() {
    return (
      <div>No file</div>
    );
  }

  render() {

    return (
      <>
      <main role="main" className="container-fluid">
        <h1>Publish</h1>
        <p className="lead">This is the publish page.</p>
        <FileConsumer>
          {({ file }) => (
            <div>
                {file ? (
                  <div><p>We still have a file!</p></div>
                ) : (
                  <Redirect to="/"/>
                )}
            </div>
          )}
        </FileConsumer>

      </main>
      </>
    );
  }
}

export default Publish;
