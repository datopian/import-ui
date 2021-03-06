import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'
import 'react-table/react-table.css';
import ReactTable from 'react-table';

class Preview extends Component {


  render() {
    return (
      <>
      <main role="main" className="container-fluid">
        <h1>Preview</h1>
        <p className="lead">This is the preview page.</p>
        <FileConsumer>
          {({ file, data, metadata, updateMetadata }) => (
            <div>
                {file && data ? (
                  <div>
										<input id="title" onChange={updateMetadata} value={metadata.title} type="text" />
										<p>
										 <ReactTable
											data={data.data}
											defaultPageSize={5}
											columns={data.cols} />
                    </p>
									</div>
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

export default Preview;
