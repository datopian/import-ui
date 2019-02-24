import React from 'react'
import Papa from 'papaparse';
import Ajv from 'ajv';
import {castInteger} from './cast';
const ajv = new Ajv({schemaId: 'id', meta: false});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
const {Table} = require('tableschema')
//import DataJS from 'data.js';

const FileContext = React.createContext()
const initialState = {
  file: false,
  data: null,
  type: null,
  metadata: {},
  step: "home",
	jsonSchema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "array",
    "items": {}
	},
  tableSchema: {}
}
class FileProvider extends React.Component {
  state = initialState;

  constructor() {
    super();
    this.fileUpload = this.fileUpload.bind(this);
    this.stepChange = this.stepChange.bind(this);
    this.updateMetadata = this.updateMetadata.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.updateTableSchemaType = this.updateTableSchemaType.bind(this);
    this.updateTableSchemaFormat = this.updateTableSchemaFormat.bind(this);
    this.updateTableSchemaDesc = this.updateTableSchemaDesc.bind(this);
    this.updateDataFromCell = this.updateDataFromCell.bind(this);

  }

  updateDataFromCell(e, cellInfo) {
    const value = e.target.innerHTML;
		const data = Object.assign(this.state.data, {});
	  data.data[cellInfo.index][cellInfo.column.id] = value;
    this.validate(this.state.jsonSchema, data);
    this.setState({data});
  }

  updateTableSchemaType(e) {
    const column = e.target.dataset.tag;
    const value = e.target.value;
    const tableSchema = this.state.tableSchema.map((r) => {
      if (r.name === column) {
        r.type = value;
        r.format = "default";
      }
      return r;
    });
    const jsonSchema = this.tableToJsonSchema(tableSchema);
    this.validate(jsonSchema, this.state.data);
    this.setState({tableSchema, jsonSchema});
  }

  updateTableSchemaFormat(e) {
    const column = e.target.dataset.tag;
    const value = e.target.value;
    const tableSchema = this.state.tableSchema.map((r) => {
      if (r.name === column) {
        r.format = value;
      }
      return r;
    });
    const jsonSchema = this.tableToJsonSchema(tableSchema);
    this.validate(jsonSchema, this.state.data);
    this.setState({tableSchema, jsonSchema});
  }

  updateTableSchemaDesc(e) {
    const column = e.target.dataset.tag;
    const value = e.target.value;
    const tableSchema = this.state.tableSchema.map((r) => {
      if (r.name === column) {
        r.desc = value;
      }
      return r;
    });
    const jsonSchema = this.tableToJsonSchema(tableSchema);
    this.validate(jsonSchema, this.state.data);
    this.setState({tableSchema, jsonSchema});
  }

  fileData(file) {
    return Papa.parse(file, {
      complete: (data) => {
         data.cols = data.meta.fields.map((key) => {
          key = key ? key : ' ';
          return {
            Header: key,
            accessor: key,
          }
        });
        this.setState({data});
      },
      header: true
    });
  }

  validate(jsonSchema, data) {
    console.log(data.data);
    console.log(JSON.stringify(jsonSchema));

    const valid = ajv.compile(jsonSchema);
    const val = valid(data.data);
    console.log(valid.errors, val);
  }

  castData(data, tableSchema) {

  }

	tableToJsonSchema(tableSchema) {
    const jsonSchema = Object.assign(this.state.jsonSchema, {});
    const items = tableSchema.reduce((r, i) => {
      r[i.name] = {
        type: i.type,
      //  format: i.format
      }
      return r;
    }, {});
    jsonSchema.items = {
      type: "object",
      properties: items
    }
    return jsonSchema;
	}

  async tableSchemaData(file) {
    // TODO: We are loading the file twice.
    const table = await Table.load(file, {delimiter: ','});
    await table.infer()
    const tableSchema = table.schema.descriptor.fields;
    const jsonSchema = this.tableToJsonSchema(tableSchema);
    this.setState({tableSchema, jsonSchema});
  }

  cancelUpload() {
    this.setState(initialState);
  }

  updateMetadata(e) {
    // This means we are using the json schema form.
    if ('edit' in e) {
      const metadata = e.formData;
      this.setState({metadata});
    }
    else {
      const metadata = this.state.metadata;
      metadata.title = e.target.value
      this.setState({metadata});
    }
  }

  loadDefault(e) {
    const remoteFile = "https://s3.amazonaws.com/dkan-default-content-files/files/Polling_Places_Madison_0.csv";
    Papa.parse(remoteFile, {
      download: true,
      complete: (data) => {
        data.cols = data.meta.fields.map((key) => {
          key = key ? key : ' ';
          return {
            Header: key,
            accessor: key,
          }
        });
        const file = {
          name: "Polling_Places_Madison.csv",
          size: 17653
        }
        this.tableSchemaData(remoteFile);
        // Start with the file name if we don't have a title yet.
        const metadata = 'title' in this.state.metadata ? this.state.metadata : {title: file.name};
        this.setState({data, metadata, file, step: "preview"});
      },
      header: true
    });
  }

  async fileUpload(e) {
    const file = e.target.files[0];
    if (file.type === 'text/csv') {
      await this.tableSchemaData(file);
      this.fileData(file);
      // Start with the file name if we don't have a title yet.
      const metadata = 'title' in this.state.metadata ? this.state.metadata : {title: file.name};
      this.setState({ file, metadata, type: null, step: "preview" });
    } else {
      this.setState({ type: "wrong"});
    }
  }

  stepChange(e) {
    const step = e.target.attributes.getNamedItem('data').value;
    this.setState({step: step});
  }

  render() {
    if (!('title' in this.state.metadata) && this.state.file && 'name' in this.state.file) {
      //this.state.metadata.title = this.state.file.name; // eslint-disable-line react/no-direct-mutation-state
    }

    return (
      <FileContext.Provider
        value={{
          file: this.state.file,
          fileUpload: this.fileUpload,
          data: this.state.data,
          loadDefault: this.loadDefault,

          step: this.state.step,
          type: this.state.type,
          stepChange: this.stepChange,
          cancelUpload: this.cancelUpload,

          metadata: this.state.metadata,
          updateMetadata: this.updateMetadata,

          tableSchema: this.state.tableSchema,
          updateTableSchemaType: this.updateTableSchemaType,
          updateTableSchemaFormat: this.updateTableSchemaFormat,
          updateTableSchemaDesc: this.updateTableSchemaDesc,
          updateDataFromCell: this.updateDataFromCell

        }}
      >
        {this.props.children}
      </FileContext.Provider>
    )
  }
}

const FileConsumer = FileContext.Consumer

export { FileProvider, FileConsumer }
