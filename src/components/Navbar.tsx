import React from 'react';
import '../index.css';

export const Navbar: React.FC = () => {
  return (
      <nav className="bg-gray-900 shadow-lg rounded">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a className="text-white text-lg font-bold hover:text-gray-300 transition-colors" href="/">
            SignalWire CF Client Beta
          </a>
          <ul className="flex space-x-6">
            <li>
              <a
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  href="/subscriber"
              >
                Subscriber Signin/Signup
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
};