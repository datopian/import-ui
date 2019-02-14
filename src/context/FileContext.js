import React from 'react'
import Papa from 'papaparse';

const FileContext = React.createContext()

class FileProvider extends React.Component {
  state = {
    file: false,
    data: null,
    type: null,
    step: "home"
  }

  constructor() {
    super();
    this.fileUpload = this.fileUpload.bind(this);
    this.stepChange = this.stepChange.bind(this);
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

  fileUpload(e) {
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
    return (
      <FileContext.Provider
        value={{
          file: this.state.file,
          fileUpload: this.fileUpload,
          step: this.state.step,
          data: this.state.data,
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
