import React, { Component } from "react";
import axios from 'axios';
import ImageUpload from './components/ImageUpload/Index'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    
    this.state = {
        filename: "",
        content: "",
    };
  }

  handleChange(e) {
    e.preventDefault();
    const content = URL.createObjectURL(e.target.files[0]);
    const filename = e.target.files[0].name;
    this.setState({filename: filename});
    this.setState({content: content});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    axios.post("/uploadImage", this.state.content, {
      headers:{
        'Content-Type': `imageFile.type`,
      }

    })
    .then((res) =>{

    })
    .catch((err) => {

    })

   
  }

  render() {
    return (
      <div>
          <ImageUpload refs={this.fileInput} submission={this.handleSubmit} change={this.handleChange} filename={this.state.filename} content={this.state.content}/>
      </div>
    );
  }
}

export default App;

