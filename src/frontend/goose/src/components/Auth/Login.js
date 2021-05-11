import React from 'react'
import axios from 'axios';
import './Style.css';
import Cookies from 'universal-cookie';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleGuest = this.handleGuest.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);


        this.state = {
            email: "",
            pass: "",
            confPass: "",
            regMode: false,
            name: "",
            guest: "",
            errors: {},
        };
        
    }
    validateLogin(){
        let valid = true;
        let error = {};

        if (this.state.email === ""){
            valid = false;
            error["email"] = "Please enter your email";
        }

        if (typeof this.state.email !== "undefined"){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)){
                valid = false;
                error["email"] = "Please enter a valid email"
            }
        }

        if (this.state.pass === ""){
            valid = false;
            error["password"] = "Please enter a password"
        }

        this.setState({errors: error})
        return valid;
    }

    validateRegister(){
        let valid = true;
        let error = {}

        if (this.state.email === ""){
            valid = false;
            error["email"] = "Please enter your email";
        }

        if (this.state.name === ""){
            valid = false;
            error["name"] = "Please enter your name";
        }

        if (typeof this.state.email !== "undefined"){
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)){
            
                valid = false;
                error["email"] = "Please enter a valid email"
            }
        }

        if (this.state.pass === ""){
            valid = false;
            error["password"] = "Please enter a password"
        }

        if (typeof this.state.pass !== "undefined" && typeof this.state.confPass !== "undefined") {
            if (this.state.pass !== this.state.confPass){
                valid = false;
                error["password"] = "Passwords don't match"
            }
        }

        this.setState({errors: error})
        return valid;
    }


    handleRequest(e){
        e.preventDefault();
        if (this.state.regMode === true){
           
            this.handleRegister();
        }
        else{
            this.handleLogin();
        }

    }

    handleLogin(){
        let error = {}
        if (this.validateLogin()){
            axios({
                method: "post",
                url: "/login", 
                withCredentials: true,
                headers: { crossDomain: true, 'Content-Type': 'application/json' },
                data:{
                    email: this.state.email,
                    password: this.state.pass
                }
              })
              .then((res) =>{
                console.log(res.data)
                
                if (res.data[0] === "true"){
                    this.props.setTokenLogin(res.data[1], res.data[2])
                }
                else if (res.data[0] === "false"){
                    error["login"] = "Login Failed. Check your credentials"
                }
                this.setState({errors: error})
              })
              .catch((err) => {
                console.log(err)
          
              })
        }
        
    }

    handleRegister(){
  
        if (this.validateRegister()){
            console.log("registered")
            axios({
                method: "post",
                url: "/register", 
                withCredentials: true,
                data:{
                    email: this.state.email,
                    password: this.state.pass,
                    name: this.state.name,
                }
              })
              .then((res) =>{
                console.log(res.data)
                if (res.data[0]){
                    this.props.setTokenLogin(res.data[1], this.state.name)
                }
              })
              .catch((err) => {
                console.log(err)
          
              })
        }
    }


    handleGuest(){
        this.props.guestLogin(this.state.guest)
    }
 

    render() {
        let confirmPass;
        let loginButtonText = "Login";
        let regButtonText = "Register"
        if (this.state.regMode === true){
            loginButtonText = "Register"
            regButtonText = "Back"
            confirmPass = 
            <div>
                <div className='row'>
                    <p className='ent'>Confirm Password</p>
                    <input onChange={(e) => this.setState({confPass: e.target.value})} className='authForm' type="password" placeholder="Confirm Password" name="pass" required/>
                </div>
                <div className="error">{this.state.errors.password}</div>
                <div className='row'>
                    <p className='ent'>Name</p>
                    <input onChange={(e) => this.setState({name: e.target.value})} className='authForm' type="text" placeholder="Enter Name" name="name" />
                </div>
                <div className="error">{this.state.errors.name}</div>
            </div>
        }

    return (

        <div className='regRow'>

            <form className='guestLog' onSubmit={this.handleGuest}>  
                <div className='guestRow'>
                    
                        <p className='guest'>New watcher?</p>
                        <input className='guestForm' onChange={(e) => this.setState({guest: e.target.value})} type="text" placeholder="Whats your name?" name="guest" pattern="[a-zA-Z0-9]+" required/>
                        <button className="registerButton" type="submit">Go</button>
                    
                </div>
            </form>
            <form className='log'  onSubmit={this.handleRequest}>
                <div className="error">{this.state.errors.login}</div>
                <div className='row'>
                    <p className='ent'>Email</p>
                    <input onChange={(e) => this.setState({email: e.target.value})} className='authForm' type="text" placeholder="Enter Email" name="email" required/>
                </div>
                <div className="error">{this.state.errors.email}</div>
                <div className='row'>
                    <p className='ent'>Password</p>
                    <input onChange={(e) => this.setState({pass: e.target.value})} className='authForm' type="password" placeholder="Enter Password" name="psw" required/>
                </div>
                <div className="error">{this.state.errors.password}</div>
                {confirmPass}
                <div className='logrow'>
                    <button onClick={(e) => this.setState({regMode: !this.state.regMode})}className="registerButton">{regButtonText}</button>
                    <button  className="registerButton" type="submit">{loginButtonText}</button>

                </div> 
            </form>
        </div>
        );
    }
}

export default Login
