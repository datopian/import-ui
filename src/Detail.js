import React, { Component } from 'react';
import { FileConsumer } from './context/FileContext';
import { Redirect } from 'react-router'
import dataset from './schemas/simple/dataset.json';
import uiSchema from './schemas/simple/UISchema.json';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);

class Publish extends Component {

  render() {

    return (
      <>
        <h1>Detail</h1>
        <p className="lead">Time to add metadata.</p>
        <FileConsumer>
          {({ file, updateMetadata, metadata }) => (
            <div>
                {file ? (
                  <div>
										<Form schema={dataset}
											formData={metadata}
											uiSchema={uiSchema.dataset}
											onChange={updateMetadata}
											onSubmit={log("submitted")}
											onError={log("errors")}>
											<br/>
										</Form>
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

export default Publish;
