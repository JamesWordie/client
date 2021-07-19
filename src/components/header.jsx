import React from'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './google-auth';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <Link to="/" className="btn btn-sm btn-outline-light">Streamy</Link>
        <div className="d-flex">
          <Link to="/" className="btn btn-sm btn-outline-light">All Streams</Link>
          <GoogleAuth />
        </div>
      </div>
    </nav>
  );
};

export default Header;
