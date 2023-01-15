import React from 'react';
import logo from './images/test.png';
import './App.css';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#23252C' }} >
      <img className="center-image" src={logo} alt="Logo" />
      <h1 style={{ textAlignment: 'center' }} >Hello World</h1>
      <h1>Hello World2</h1>
    </div>
  );
}