import React from "react";
import axios from 'axios';
import MainPage from './components/Pages/Home'
import MapPage from './components/Map/Map'

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
    this.guestLogin = this.guestLogin.bind(this);
    this.handleAnimalName = this.handleAnimalName.bind(this);
    this.returnConvo = this.returnConvo.bind(this);
    this.fileInput = React.createRef();

 
    this.status = {
      NEW: 0,
      LOGGED: 1,
      GUEST: 2,

    }

    this.state = {
        page: 0,

        filename: "",
        content: "",
        animal_name: "",
        error: "",
        cc: "",
        predition: "",

        home_convo: 0,
        valid_animal: null,

        open_book: false,
        image_set: false,

        authenticated: this.status.NEW,
        name: "",


    };
  }


  guestLogin(name){
    console.log(name)
    this.setState({name: name})
    this.setState({authenticated: this.status.GUEST})
    this.setState({home_convo:this.state.home_convo + 1})
  }

  updateConvo(){ 
    if ((this.state.authenticated === true && this.state.home_convo === 1) || 
    (this.state.image_set === true && (this.state.home_convo === 3 )) || 
    (this.state.home_convo === 0) ||
    (this.state.home_convo === 4) || 
    (this.state.home_convo === 6)
    ){
      this.setState({home_convo: this.state.home_convo + 1});
    }
    if (this.state.home_convo === 5){
      this.setState({page: 1})
    }
    if (this.state.home_convo === 7){
      this.setState({page: 1})
    }
  }
  
  returnConvo(){
    this.setState({home_convo: this.state.home_convo - 1})
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
    this.setState({home_convo: 6});
  }

  handleAnimalName(e){
    e.preventDefault();
    this.setState({animal_name: e.target.value})
  }

  handleChange(e) {
    e.preventDefault();
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
    data.append("animal", this.state.animal_name)
    axios({
      method: "post",
      url: "/uploadImage", 
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) =>{
      console.log(res.data)
      if (res.data[0] == "true"){
        this.setState({prediction: res.data[1]})
        this.setState({valid_animal: true})
        this.setState({home_convo: this.state.home_convo + 1})
        this.setState({open_book: false})
      }
      else{
        this.setState({prediction: res.data[1]})
        this.setState({valid_animal: false})
      }
      
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
      "So "+this.state.name+", seen any geese lately?",
      "Let us see them",
      "Nice photo",
      "Lets set them up in our habitat. Away we go",
      "Thats unfortunate, come see the animals though",
    ];

    let homePage;
    if (this.state.page === 0){
      homePage = 
      <MainPage 
          prediction={this.state.prediction} 
          filename={this.state.filename} 
          content={this.state.content} 
          action={this.state.open_book}
          authenticated={this.state.authenticated}
          convo_prog={this.state.home_convo} 
          message={home_messages[this.state.home_convo]}
          validUpload = {this.state.valid_animal}
          login={this.login}
          submission={this.handleSubmit} 
          change={this.handleChange} 
          convo={this.updateConvo}
          go_upload={this.goToUpload}
          no_upload={this.noUpload}
          return_convo={this.returnConvo}
          upload_form={this.openUpload} 
          close_upload={this.closeUpload}
          guestLogin={this.guestLogin}
          animal_name={this.handleAnimalName}
          />
    }
    
    let mpPage;
    if (this.state.page === 1){
      mpPage=
      <MapPage
        filename={this.state.filename}
        content={this.state.content}

      />
    }
  

    return (
      <div className = 'bg'>
         {homePage}
         {mpPage}
      </div>
    );
  }
}

export default App;

