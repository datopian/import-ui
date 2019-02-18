import React from 'react';
import logo from '../../assets/images/datopian-logo.png';

class Header extends React.Component {

    render() {
      return (
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <div className="branding">
              <img alt="logo" src={logo}/>
            </div>
          </div>
        </header>
      );
    }
}

export default Header;
