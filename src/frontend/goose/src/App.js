import React from "react";
import { useState } from "react";
import axios from 'axios'


import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState('')


  const fileSelectedHandler = event => {
    setSelectedFile(event)
  }

  const fileUploadHandler = (event) => {
    console.log(selectedFile.target.files[0])
  }

  return (
    
      <div>
        <input type="file" onChange={fileSelectedHandler}/>
        <button onClick={fileUploadHandler}>Upload</button>
        
        
      </div>
  );
}

export default App;

