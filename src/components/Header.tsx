import React from 'react';
import SCTSLogo from '../assets/SCTS-Logo-White.svg';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container">
          <div className="logo-container">
            <a href="/">
              <img src={SCTSLogo} alt="Scottish Courts and Tribunals Service" className="logo" />
            </a>
          </div>
        </div>
      </div>
      <div className="main-nav-bar">
        <div className="container"></div>
      </div>
    </header>
  );
};
