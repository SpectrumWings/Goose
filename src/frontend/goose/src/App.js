import React, { Component } from "react";
import axios from 'axios';
import ImageUpload from './components/ImageUpload/Index'
import ErrorMessage from './components/Messages/Error'
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
        error: "",
        cc: "",
        predition: "",
    };
  }

  handleChange(e) {
    e.preventDefault();
    const content = URL.createObjectURL(e.target.files[0]);
    const cc = e.target.files[0];
    const filename = e.target.files[0].name;
    this.setState({filename: filename});
    this.setState({content: content});
    this.setState({cc: cc})
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData()
    data.append("file", this.state.cc)
    axios({
      method: "post",
      url: "/uploadImage", 
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) =>{
      console.log(res.data)
      this.setState({prediction: res.data})
    })
    .catch((err) => {
      console.log(err)
      this.setState({error: err})
    })

   
  }

  render() {
    return (
      <div>
        <ErrorMessage message={this.error}/>
          <ImageUpload prediction={this.state.prediction} submission={this.handleSubmit} change={this.handleChange} filename={this.state.filename} content={this.state.content}/>
      </div>
    );
  }
}

export default App;

