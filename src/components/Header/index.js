import React from 'react';
import logo from '../../assets/images/datopian-logo.png';
import { NavLink as Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
      return (
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <div className="branding">
              <Link className='logo' to="/"><img alt="logo" src={logo}/></Link>
            </div>
          </div>
        </header>
      );
    }
}

export default Header;
