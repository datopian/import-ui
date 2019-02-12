import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SiteName extends React.Component {

  render() {

    return (
      <div className="site-name">
        <a href={this.props.link}>{this.props.site}</a>
        <div className="slogan">{this.props.slogan}</div>
      </div>
    );
  }
}

SiteName.defaultProps = {
    site: "Open Data Catalog",
    slogan: "Place your tag line here.",
    link: "/home"
};

SiteName.propTypes = {
    item: PropTypes.any,
};

export default SiteName;
