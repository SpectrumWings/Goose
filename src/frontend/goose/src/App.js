import React from "react";
import axios from 'axios';


import './App.css';

function Display(props) {
  return (
    <p>
      Filename: {props.filename}
    </p>
  );
}

function Render(props) {
  return (
    <img src={props.content}>
    </img>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    
    this.state = {
      filename: "",
      content: ""
    };
  }

  handleChange(event) {
    event.preventDefault();
    const content = URL.createObjectURL(this.fileInput.current.files[0]);
    this.setState({content: content});
  }

  handleSubmit(event) {
    event.preventDefault();
    const filename = this.fileInput.current.files[0].name;
    this.setState({filename: filename});
    
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
        <form 
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit}
        >
          <input type="file" ref={this.fileInput}/>
          <button type="submit">Upload</button>
          
          <Display
            filename={this.state.filename}
          />
          <Render content={this.state.content}/>
          
        </form>
      </div>
    );
  }
}

export default App;

