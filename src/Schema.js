import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'
import 'react-table/react-table.css';
import SchemaTable from './components/SchemaTable';
import filesize from 'filesize';

class Schema extends Component {


  render() {
    return (
      <>
        <h1>Edit Schema</h1>
        <p className="lead">Edit the schema for your package..</p>
        <FileConsumer>
          {({ file, data, metadata, updateMetadata }) => (
            <div>
                {file && data ? (
                  <div>
										<input id="title" onChange={updateMetadata} value={metadata.title} type="text" />
										<p>
                    </p>
										 <SchemaTable
											data={data.data}
											defaultPageSize={5}
											columns={data.cols} />
									</div>
                ) : (
                  <Redirect to="/"/>
                )}
            </div>
          )}
        </FileConsumer>
      </>
    );
  }
}

export default Schema;
