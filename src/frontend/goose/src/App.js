import React from "react";
import axios from 'axios';
import MainPage from './components/Pages/Home';
import MapPage from './components/Map/Map';
import Cookies from 'universal-cookie';
import './App.css';

import title from './images/title.png';


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
    this.setTokenLogin = this.setTokenLogin.bind(this)
    this.checkLoggedin = this.checkLoggedin.bind(this)
    this.continueLogin = this.continueLogin.bind(this)
    this.userDropdown = this.userDropdown.bind(this)
    this.logout = this.logout.bind(this)
    this.purgeState = this.purgeState.bind(this)
    this.fileInput = React.createRef();

    this.cookies = new Cookies();


    this.state = {
        page: 0,

        filename: "",
        content: "",
        animalName: "",
        error: "",
        cc: "",
        predition: "",

        dropdown: false,
        confirmLogout: false,

        homeConvo: 0,
        validAnimal: null,

        openBook: false,
        imageSet: false,

        token: "",
        authenticated: false,
        email: "",
        isGuest: false,
        name: "",
    };
  }

  logout(){
    if (!this.state.confirmLogout){
      this.setState({confirmLogout: true})
    }
    else if (this.state.confirmLogout){
      this.purgeState()
      if (this.state.homeConvo !== 1){
        this.setState({homeConvo: 0});
      }
      this.setState({page: 0});
      this.cookies.remove("Goose Session", {path: "/"});
    }
  }

  purgeState(){
    this.setState({authenticated: false});
    this.setState({isGuest: false});
    this.setState({email: ""})
    this.setState({name: ""});
    this.setState({filename: ""});
    this.setState({content: ""});
    this.setState({animalName: ""});
    this.setState({error: ""});
    this.setState({cc: ""});
    this.setState({predition: ""});
    this.setState({error: ""});
    this.setState({dropdown: false});
    this.setState({validAnimal: null});
    this.setState({openbook: false});
    this.setState({imageSet: false});
    this.setState({confirmLogout: false});
    this.setState({token: ""});
  }

  userDropdown(){
    this.setState({dropdown: !this.state.dropdown});
    this.setState({confirmLogout: false})
  }

  checkLoggedin(){
    let token = this.cookies.get("Goose Session");
    axios({
      method: "post",
      url: "/checkCookie",
      headers: {'Content-Type': 'application/json' },
      data:{
          token: token,
      }
    })
    .then((res) =>{

      if (res.data[0] === "true"){
        this.setState({authenticated: true});
        this.setState({name: res.data[1]});
        this.setState({token: res.data[2]});
        this.setState({email: res.data[3]});
      }
    })
    .catch((err) => {
      console.log(err)
      this.setState({error: err})
    })
  }

  setTokenLogin(token, name, email){
    this.setState({token: token})
    this.setState({name: name})
    this.setState({authenticated: true})
    this.setState({email: email})
    this.setState({homeConvo:this.state.homeConvo + 1})
  }
  

  guestLogin(name){

    this.setState({name: name})
    this.setState({authenticated: true})
    this.setState({isGuest: true})
    this.setState({homeConvo:this.state.homeConvo + 1})
  }

  updateConvo(){ 
    if (this.state.authenticated === true && this.state.homeConvo == 0){

      this.setState({homeConvo: 2});
    }
    else if (((this.state.authenticated === true) && this.state.homeConvo === 1) || 
    (this.state.imageSet === true && (this.state.homeConvo === 3 )) || 
    (this.state.homeConvo === 0) ||
    (this.state.homeConvo === 4) || 
    (this.state.homeConvo === 6)
    ){
      this.setState({homeConvo: this.state.homeConvo + 1});
    }
    else if (this.state.homeConvo === 5){
      this.setState({page: 1})
    }
    else if (this.state.homeConvo === 6){
      this.setState({page: 1})
    }
  }

  continueLogin(){
    this.updateConvo()
  }
  
  returnConvo(){
    this.setState({homeConvo: this.state.homeConvo - 1})
  }

  openUpload(e){
    e.preventDefault();
    
    this.setState({openBook: true});
  }

  closeUpload(e){
    e.preventDefault();

    this.setState({openBook: false});
  }

  goToUpload(e){
    e.preventDefault();
    this.setState({homeConvo: 3});
  }

  noUpload(e){
    e.preventDefault();
    this.setState({homeConvo: 6});
  }

  handleAnimalName(e){
    e.preventDefault();
    this.setState({animalName: e.target.value})
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
    data.append("animal", this.state.animalName)
    data.append("guest", this.state.isGuest)
    data.append("guestName", this.state.name)
    data.append("email", this.state.email)
    axios({
      method: "post",
      url: "/uploadImage", 
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) =>{

      if (res.data[0] === "true"){
        this.setState({prediction: res.data[1]})
        this.setState({validAnimal: true})
        this.setState({homeConvo: this.state.homeConvo + 1})
        this.setState({openBook: false})
      }
      else{
        this.setState({prediction: res.data[1]})
        this.setState({validAnimal: false})
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
          action={this.state.openBook}
          authenticated={this.state.authenticated}
          convo_prog={this.state.homeConvo} 
          message={home_messages[this.state.homeConvo]}
          validUpload = {this.state.validAnimal}
          name = {this.state.name}
          login={this.login}
          submission={this.handleSubmit}
          continueLogin={this.continueLogin}
          change={this.handleChange} 
          convo={this.updateConvo}
          go_upload={this.goToUpload}
          no_upload={this.noUpload}
          return_convo={this.returnConvo}
          upload_form={this.openUpload} 
          close_upload={this.closeUpload}
          guestLogin={this.guestLogin}
          animalName={this.handleAnimalName}
          setTokenLogin={this.setTokenLogin}
          />
    }
    
    let mpPage;
    if (this.state.page === 1){
      mpPage=
      <MapPage
        filename={this.state.filename}
        content={this.state.content}
        authenticated={this.state.authenticated}
        name = {this.state.name}
        email = {this.state.email}

      />
    }

    let headerDisplay;
    let userDropdown;
    
    if (this.state.dropdown){
        userDropdown = 
        <div className="userSelection">
              <button className="userOptions"> My Account</button>
              <button onClick={this.logout} className="userOptions"> {this.state.confirmLogout ? "Are you sure?": "Logout"}</button>
          </div>
    }
    
    if (!this.state.authenticated){
        headerDisplay =
        <header>
            <div className="titleRow">
              <p className="gooseText">GOOSE</p>
              <p className="HomeText">HOME</p>
            </div>
            <div className="headerOptions">
              <button className='header_button'>
                  Filler
              </button>
              <button className='header_button'>
                  About
              </button>
              <button className='header_button'>
                  Login
              </button>
             
            </div>
            
        </header>
    }
    if (this.state.authenticated){
        headerDisplay = 
        <header>
            <div className="titleRow">
              <p className="gooseText">GOOSE</p>
              <p className="HomeText">HOME</p>
            </div>

            <button onClick={this.userDropdown} className="headerUser">{this.state.name}</button>
            
        </header>
    }

    return (
      <div className = 'bg' onLoad={this.checkLoggedin}>
         {headerDisplay}
         {userDropdown}
         {homePage}
         {mpPage}
      </div>
      
    );
  }
}

export default App;

