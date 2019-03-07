import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'
import Loader from 'react-loader';
import 'react-table/react-table.css';
import SchemaTable from './components/SchemaTable';


class Schema extends Component {


  render() {
    return (
      <>
        <h1>Edit Schema</h1>
        <p className="lead">Edit the schema for your package..</p>
        <FileConsumer>
          {({ file, data, errors, step, metadata, updateMetadata, tableSchema, updateTableSchemaType, updateTableSchemaFormat, updateTableSchemaDesc, updateDataFromCell }) => (
            <div>
                {step !== "schema" && (
                  <Redirect to="/" />
                )}
                {file && data && metadata ? (
                  <div>
                    <input id="title" onChange={updateMetadata}  value={metadata.title} type="text" />
                    <p>
                    </p>
                     <SchemaTable
                      tableSchema={tableSchema} 
                      updateTableSchemaFormat={updateTableSchemaFormat}
                      updateTableSchemaType={updateTableSchemaType}
                      updateTableSchemaDesc={updateTableSchemaDesc}
                      updateDataFromCell={updateDataFromCell}
                      data={data.data}
                      errors={errors}
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

export default Schema;
