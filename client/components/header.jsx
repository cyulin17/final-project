import React from 'react';

export default function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="#">
            GotoJapan
          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link sign-up" href="#">Sign Up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link log-in" href="#login">Log In</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
