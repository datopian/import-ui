import React from 'react'
import Papa from 'papaparse';
//import DataJS from 'data.js';

const FileContext = React.createContext()

class FileProvider extends React.Component {
  state = {
    file: false,
    data: null,
    type: null,
    metadata: {},
    step: "home"
  }

  constructor() {
    super();
    this.fileUpload = this.fileUpload.bind(this);
    this.stepChange = this.stepChange.bind(this);
    this.updateMetadata = this.updateMetadata.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
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

  cancelUpload() {
    const file = null;
    this.setState({file});
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
    Papa.parse("http://demo.getdkan.com/sites/default/files/PropertyCrimesByCity_3.csv", {
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
          name: "PropertyCrimesByCity.csv"
        }
        this.setState({data, file});
      },
      header: true
    });
  }

  async fileUpload(e) {
    const file = e.target.files[0];
    if (file.type === 'text/csv') {
      this.fileData(file);
      this.setState({ file, type: null });
    } else {
      this.setState({ type: "wrong"});
    }
  }

  stepChange(e) {
    const step = e.target.attributes.getNamedItem('data').value;
    this.setState({step: step});
  }

  render() {
    // Start with the file name if we don't have a title yet.
    if (!('title' in this.state.metadata) && this.state.file && 'name' in this.state.file) {
      this.state.metadata.title = this.state.file.name; // eslint-disable-line react/no-direct-mutation-state
    }

    return (
      <FileContext.Provider
        value={{
          file: this.state.file,
          fileUpload: this.fileUpload,
          step: this.state.step,
          data: this.state.data,
          metadata: this.state.metadata,
          updateMetadata: this.updateMetadata,
          loadDefault: this.loadDefault,
          cancelUpload: this.cancelUpload,
          type: this.state.type,
          stepChange: this.stepChange
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    )
  }
}

const FileConsumer = FileContext.Consumer

export { FileProvider, FileConsumer }
