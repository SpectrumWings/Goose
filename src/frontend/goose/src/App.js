import React from "react";
import { useState } from "react";
import axios from 'axios'


import './App.css';

function Display(props) {
  return (
    <p>
      Filename: {props.filename}
    </p>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      filename: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const filename = this.fileInput.current.files[0].name;
    this.setState({filename: filename});
    console.log(filename);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" ref={this.fileInput}/>
          <button type="submit">Upload</button>
          <Display
            filename={this.state.filename}
          />
        </form>
      </div>
    );
  }
}

export default App;

