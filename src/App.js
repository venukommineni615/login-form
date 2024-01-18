import React, { useState,createContext, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
export const LoggingContext=createContext(null)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    
      <LoggingContext.Provider value={{
        isLoggedIn:isLoggedIn,
        onLogin:loginHandler,
        onLogout:logoutHandler
      }}>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
      </LoggingContext.Provider>
    
  );
}

export default App;
