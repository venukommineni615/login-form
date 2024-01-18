import React from 'react';

import classes from './Navigation.module.css';
import { useContext } from 'react';
import { LoggingContext } from '../../App';
const Navigation = () => {
  const {isLoggedIn,onLogout}=useContext(LoggingContext)
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
