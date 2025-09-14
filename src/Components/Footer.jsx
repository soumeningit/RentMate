import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGit,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-indigo-600 mb-4">RentMate</h2>
          <p className="text-gray-600 text-sm">
            Empowering communities to share and rent items sustainably and
            securely. Build trust, save money, and make a difference with
            RentMate.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-indigo-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-indigo-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-indigo-600">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Info
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="cursor-pointer">
              <a href="mailto:support@rentmate.com">
                Email: support@rentmate.com
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="tel:+919876543210">Phone: +91-9876543210</a>
            </li>
            <li>Location: Kolkata, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl text-indigo-600">
            <a
              href="https://www.linkedin.com/in/soumenpal01/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/soumeningit"
              target="_blank"
              aria-label="Facebook"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/spal0_1/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a href="#" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-6 border-t">
        © {new Date().getFullYear()} RentMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
