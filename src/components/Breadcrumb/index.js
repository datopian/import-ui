import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { FileConsumer } from '../../context/FileContext';

export default class NavBar extends React.Component {

  step(file, step, stepChange) {
    let breadcrumb = (<div/>);
    if (step === "home" && file === false) {
      breadcrumb = (<li className="breadcrumb-item">Home</li>);
    }
    else if (step === "home") {
      breadcrumb = (
        <>
        <li className="breadcrumb-item">Home</li>
        </>
      );
    }
    else if (step === "preview") {
      breadcrumb = (
        <>
        <li className="breadcrumb-item"><Link data="home" onClick={stepChange} to="/">Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Preview</li>
        </>
      );
    }
    else if (step === "publish") {
      breadcrumb = (
        <>
        <li className="breadcrumb-item"><Link data="home" onClick={stepChange} to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link data="preview" onClick={stepChange} to="/preview">Preview</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Publish</li>
        </>
      );
    }
    return breadcrumb;
  }
  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <FileConsumer>
            {({ file, stepChange, step }) => (
              <>
              {this.step(file, step, stepChange)}
              </>
            )}
          </FileConsumer>
        </ol>
      </nav>
    );
  }
}
