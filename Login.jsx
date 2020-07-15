import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {      //setting states
      username: '',
      password: '',
      currentUser: '',
      loggedIn: '',
      checkLogin: false
    };
  }

  onSubmit = (event) =>{        //backend communication to check if user and pass exist
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      console.log("Made it back to jsx")
      console.log("RESULT CUR USER: " + result.currentUser);
      this.setState(
        {
          currentUser: result.currentUser,
          checkLogin: true
        })
      console.log(this.state.username)
      localStorage.setItem("currentUser", this.state.currentUser);
    })
    .catch(error => this.setState({ error: error.message }));
  }
 

  render(){
    if(this.state.checkLogin == true){      //redirect to homepage after login and display username
    return <Redirect to ={{
      pathname: "Home",
      state: {
        currentUser: this.state.currentUser,
      }
      
    }}/>
   }

    return(
        
      <form className = "center" onSubmit = {this.onSubmit}>
        <div>
        <div className = "center">
        <h1> Login Page </h1>
        </div>
        <div className = "container, center">
        <h2> Username </h2>
        <input className = "userLogin"type = "text" name = "username" placeholder = "Enter Username" value = {this.state.username} onChange = {e => this.setState({username: e.target.value})} required />
        <h2> Password </h2>
        <input className = "passLogin" type = "text" name = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {e => this.setState({password: e.target.value})} required />
        <p></p>
        <button type = "Submit" value = "Login" onClick={e => this.onSubmit(e)}> Login </button>
        </div>
        <div className = "center">
        <h2> Current User: {this.state.currentUser}</h2>
        </div>
        </div>
      </form>
    )
  }
}

export default Login;
