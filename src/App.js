import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { UserProvider } from './config';
import { Footer, TopBar } from './layouts';
import Routes from './Routes';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <TopBar />
          <Routes />
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
