import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'
import Loader from 'react-loader';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import filesize from 'filesize';

class Preview extends Component {


  render() {
    return (
      <>
        <h1>Preview</h1>
        <p className="lead">This is the preview page.</p>
        <FileConsumer>
          {({ file, data, step, metadata, updateMetadata }) => (
            <div>
                {step !== "preview" && (
                  <Redirect to="/" />
                )}
                {file && data ? (
                  <div>
                    <input id="title" onChange={updateMetadata} value={metadata.title} type="text" />
                    <p>
                      <strong>Name:</strong> {file.name}<br/>
                      <strong>Size:</strong> {filesize(file.size)}
                    </p>
                    <p>
                    </p>
                     <ReactTable
                      data={data.data}
                      defaultPageSize={5}
                      columns={data.cols} />
                  </div>
                ) : (
                  <Loader />
                )}
            </div>
          )}
        </FileConsumer>
      </>
    );
  }
}

export default Preview;
