import React from 'react'
import './Style.css';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            email: "",
            pass: "",
            confPass: "",
            regMode: "",
            name: "",
        };
        
    }
    

    
    
    confirmPassword (e){
 
        this.setState({confPass: e.target.value})
        if (this.state.pass === this.state.confPass){
            return true
        }
        else{
            return false
        }
    }

    handleLogin(e){
        
        alert("ss");
        e.preventDefault();
    }

    
    // let confirmPass;
    // let logButton;

    // if (regMode === true){
    //     confirmPass = 
    //     <div className='row'>
    //         <p className='ent'>Confirm Password</p>
    //         <input onChange={(e) => confirmPassword} className='authForm' type="password" placeholder="Confirm Password" name="pass" required/>
    //     </div>
    //           <div className='row'>
    //                 <p className='ent'>Name</p>
    //                 <input onChange={(e) => this.setState({name: e.target.value})} className='authForm' type="text" placeholder="Enter Name" name="name" />
    //     </div>
    // }
  

    render() {

        
    return (
        <div className='regRow'>

            <form className='guestLog'>  
                <div className='guestRow'>
                    
                        <p className='guest'>New watcher?</p>
                        <input className='guestForm' type="text" placeholder="Whats your name?" name="guest" required/>
                        <button className="registerButton">Go</button>
                    
                </div>
            </form>


            <form className='log' onSubmit={(e) => {alert("ss")}}>
                
                <div className='row'>
                    <p className='ent'>Email</p>
                    <input onChange={(e) => this.setState({email: e.target.value})} className='authForm' type="text" placeholder="Enter Email" name="email" />
                </div>
          
                <div className='row'>
                    <p className='ent'>Password</p>
                    <input onChange={(e) => this.setState({pass: e.target.value})} className='authForm' type="password" placeholder="Enter Password" name="psw" />
                </div>
                {/* {confirmPass} */}
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
