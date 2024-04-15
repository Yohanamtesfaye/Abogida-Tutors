import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#4a154b] rounded-t-3xl text-white overflow-hidden py-8">
      <div className="container lg:flex mx-3 justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>Email: Abogida@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: AASTU, Addis Ababa, Ethiopia</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-square fa-lg"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter-square fa-lg"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram-square fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 Abogida. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;