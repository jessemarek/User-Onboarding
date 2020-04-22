import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'

//Import Components
import Form from './components/Form'

//Import Styles
import './App.css';

function App() {
  return (
    <div className="container">
      <header><h1>My App</h1></header>
    
      <Form />

    </div>
  );
}

export default App;
