import React from 'react'
import axios from 'axios';
import './Style.css';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleGuest = this.handleGuest.bind(this);


        this.state = {
            email: "",
            pass: "",
            confPass: "",
            regMode: "",
            name: "",
            guest: "",
        };
        
    }

    handleLogin(e){
        e.preventDefault();
        
        
        
        axios({
            method: "post",
            url: "/login", 
            auth:{
                username: this.state.email,
                password: this.state.pass
            }
          })
          .then((res) =>{
            console.log(res.data)
      
          })
          .catch((err) => {
            console.log(err)
      
          })
    }


    handleGuest(e){
        e.preventDefault()
        this.props.guestLogin(this.state.guest)
    }
 

    render() {
        let confirmPass;
        if (this.state.regMode){
        confirmPass = 
            <div>
                <div className='row'>
                    <p className='ent'>Confirm Password</p>
                    <input onChange={(e) => this.setState({confPass: e.target.value})} className='authForm' type="password" placeholder="Confirm Password" name="pass" required/>
                </div>
                <div className='row'>
                    <p className='ent'>Name</p>
                    <input onChange={(e) => this.setState({name: e.target.value})} className='authForm' type="text" placeholder="Enter Name" name="name" />
                </div>
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
            <form className='log' onSubmit={this.handleLogin}>
                
                <div className='row'>
                    <p className='ent'>Email</p>
                    <input onChange={(e) => this.setState({email: e.target.value})} className='authForm' type="text" placeholder="Enter Email" name="email" required/>
                </div>
          
                <div className='row'>
                    <p className='ent'>Password</p>
                    <input onChange={(e) => this.setState({pass: e.target.value})} className='authForm' type="password" placeholder="Enter Password" name="psw" required/>
                </div>
                {confirmPass}
                <div className='logrow'>
                    <button onClick={(e) => this.setState({regMode: true})}className="registerButton">Register</button>
                    <input className="registerButton" type="submit"/>

                </div> 
            </form>
        </div>
        );
    }
}

export default Login
