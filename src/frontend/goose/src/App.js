import React, { Component } from "react";
import axios from 'axios';
import ImageUpload from './components/ImageUpload/Index'
import ErrorMessage from './components/Messages/Error'
import MainPage from './components/Pages/Home'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateConvo = this.updateConvo.bind(this);
    this.openUpload = this.openUpload.bind(this);
    this.closeUpload = this.closeUpload.bind(this);
    this.goToUpload = this.goToUpload.bind(this);
    this.noUpload = this.noUpload.bind(this);
    this.fileInput = React.createRef();




    this.state = {
        filename: "",
        content: "",
        error: "",
        cc: "",
        predition: "",
        home_convo: 0,
        open_book: false,
        image_set: false,
    };
  }
  updateConvo(e){
    e.preventDefault();
    console.log(this.state.home_convo)
    if ((this.state.image_set == true && this.state.home_convo == 3) || (this.state.home_convo < 3 && this.state.home_convo != 2)){
      this.setState({home_convo: this.state.home_convo + 1});
    }
  }
  
  openUpload(e){
    e.preventDefault();
    console.log(this.state.open_book);
    this.setState({open_book: true});
  }

  closeUpload(e){
    e.preventDefault();
    console.log(this.state.open_book);
    this.setState({open_book: false});
  }

  goToUpload(e){
    e.preventDefault();
    this.setState({home_convo: 3});
  }

  noUpload(e){
    e.preventDefault();
    this.setState({home_convo: 5});
  }

  handleChange(e) {
    e.preventDefault();
    console.log("piss")
    const content = URL.createObjectURL(e.target.files[0]);
    const cc = e.target.files[0];
    const filename = e.target.files[0].name;
    this.setState({filename: filename});
    this.setState({content: content});
    this.setState({cc: cc});
  }

  handleSubmit(e) {
    e.preventDefault();
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
    const home_messages = [
      "Heya! Welcome to Goose Home",
      "First, tell me who you are",
      "So, seen any geese lately?",
      "Let us see them",
      "Away we go",
      "Thats unfortunate, come see the animals though",
    ];

    return (
      <div className = 'bg'>
        <MainPage 
          prediction={this.state.prediction} 
          submission={this.handleSubmit} 
          change={this.handleChange} 
          filename={this.state.filename} 
          content={this.state.content} 
          action={this.state.open_book} 
          upload_form={this.openUpload} 
          close_upload={this.closeUpload} 
          convo_prog={this.state.home_convo} 
          message={home_messages[this.state.home_convo]} 
          convo={this.updateConvo}
          go_upload={this.goToUpload}
          no_upload={this.noUpload}/>
        {/* <ErrorMessage message={this.error}/>
         <ImageUpload prediction={this.state.prediction} submission={this.handleSubmit} change={this.handleChange} filename={this.state.filename} content={this.state.content}/>

         */}
      </div>
    );
  }
}

export default App;

