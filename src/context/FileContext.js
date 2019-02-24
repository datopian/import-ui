import React from 'react'
import Papa from 'papaparse';
import {castInteger, castNumber, castBoolean} from './cast';
import {validateDataset} from './validate';
const {Table} = require('tableschema')
//import DataJS from 'data.js';

const FileContext = React.createContext()
const initialState = {
  file: false,
  data: null,
  type: null,
  metadata: {},
  step: "home",
  errors: [],
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
    this.validate(data);
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
    this.validate(this.state.data);
    this.setState({tableSchema});
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
    this.validate(this.state.data);
    this.setState({tableSchema});
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
    this.validate(this.state.data);
    this.setState({tableSchema});
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
        this.tableSchemaData(file, data);
        this.setState({data});
      },
      header: true
    });
  }

  validate(data) {
    const tableSchema = this.state.tableSchema;
    const errors = validateDataset(data, tableSchema);
    this.setState({errors});
  }

  cast(item, type) {
    switch(type) {
      case "integer":
        item = castInteger(type, item);
        break;
      case "number":
        item = castNumber(type, item);
        break;
      case "bolean":
        item = castBoolean(type, item);
        break;
      default:
        break;
    }
    return item;
  }

  castData(unCastData, tableSchema) {
    const data = unCastData.data.map((row) => {
      Object.values(tableSchema).forEach((col) => {
        const type = col.type;
        const item = row[col.name];
        const cast = this.cast(item, type);
        row[col.name] = cast;
      });
      return row;
    });
    this.setState(data);
  }

  async tableSchemaData(file, data) {
    // TODO: We are loading the file twice.
    const table = await Table.load(file, {delimiter: ','});
    await table.infer()
    const tableSchema = table.schema.descriptor.fields;
    this.setState({tableSchema});
    this.validate(data);
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
        // It grabs an extra empty row for some reason.
        data.data.splice(-1,1);
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
        this.tableSchemaData(remoteFile, data);
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
          errors: this.state.errors,
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
