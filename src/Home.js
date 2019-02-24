import React, { Component } from 'react';
import { Redirect } from 'react-router'
import FileUpload from './components/FileUpload';

import { FileConsumer } from './context/FileContext';

class Home extends Component {

  render() {

    return (
      <>
        <h1>Welcome</h1>
        <p className="lead">This is the home page.</p>
        <FileConsumer>
          {({ file, fileUpload, type, loadDefault, cancelUpload, step }) => (
            <div>
                {type === "wrong" ? (
                  <div className="alert alert-danger" role="alert">Hey there. We only accept CSVs.</div>
                ) : (
                  <></>
                )}
                {file ? (
                  <>
                  { step === "preview" ? (
                    <>
											<Redirect to="/preview"/>
                    </>
                  ) :
                  (
                    <div id="file-desc">
                      <p>You have selected:</p>
                      <div id="file-name">{file.name}</div>
                      <button id="file-close" type="button" onClick={cancelUpload} className="close btn btn-outline-warning" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                  </>
                ) : (

                  <>
                  <FileUpload upload={fileUpload} />
                  <p>or</p>
                  <p><button onClick={loadDefault} >Click here to use an example file.</button></p>
                  </>
                )}
            </div>
          )}
        </FileConsumer>
      </>
    );
  }
}

export default Home;
