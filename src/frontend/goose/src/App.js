import React from "react";
import axios from 'axios';
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
    this.login = this.login.bind(this);
    this.fileInput = React.createRef();

 
    const status = {
      NEW: 0,
      LOGGED: 1,
      GUEST: 2,

    }

    this.state = {
        filename: "",
        content: "",
        error: "",
        cc: "",
        predition: "",

        home_convo: 0,

        open_book: false,
        image_set: false,

        authenticated: status.NEW,
        name: "",

    };
  }

  login(e){

    
    console.log(e)
  }

  updateConvo(e){
    e.preventDefault();
 
    if ((this.state.authenticated === true && this.state.home_convo === 1) || (this.state.image_set === true && this.state.home_convo === 3) || (this.state.home_convo === 0)){
      this.setState({home_convo: this.state.home_convo + 1});
    }
  }
  
  openUpload(e){
    e.preventDefault();
    
    this.setState({open_book: true});
  }

  closeUpload(e){
    e.preventDefault();

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
          filename={this.state.filename} 
          content={this.state.content} 
          action={this.state.open_book}
          authenticated={this.state.authenticated}
          convo_prog={this.state.home_convo} 
          message={home_messages[this.state.home_convo]} 
          submission={this.handleSubmit} 
          change={this.handleChange} 
          convo={this.updateConvo}
          go_upload={this.goToUpload}
          no_upload={this.noUpload}
          login={this.login}
          upload_form={this.openUpload} 
          close_upload={this.closeUpload} 
          />
      </div>
    );
  }
}

export default App;

