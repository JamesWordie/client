import React from'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <Link to="/" className="btn btn-sm btn-outline-light">Streamy</Link>
        <Link to="/" className="btn btn-sm btn-outline-light">All Streams</Link>
      </div>
    </nav>
  );
};

export default Header;
