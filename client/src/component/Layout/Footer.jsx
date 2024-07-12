import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h1 className="text-center">Kerala Food Stuff</h1>
        <div className="text-center">
          <p>
            <Link to="/about" className="me-2">
              About
            </Link>
            <Link to="/contact" className="me-2">
              Contact
            </Link>
            <Link to="/policy" className="me-2">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
