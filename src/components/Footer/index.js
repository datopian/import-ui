import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="page-footer font-small black pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Import UI Demo</h5>
              <p>The journey from data to insight.</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="http://viderum.com">Viderum</a>
                  </li>
                  <li>
                    <a href="#!">CivicActions</a>
                  </li>
                  <li>
                    <a href="#!">CKAN</a>
                  </li>
                  <li>
                    <a href="#!">DKAN</a>
                  </li>
                  <li>
                    <a href="#!">Frictionless Data</a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
