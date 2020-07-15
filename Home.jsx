import React, {Component} from 'react';
import './App.css';
import Img from './Img/Collage.jpg';
import { Redirect } from 'react-router-dom';
import Avatar from 'react-avatar-edit';
import Profile from './Profile';
var test = false;
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
          username: localStorage.getItem("currentUser"),
          name: '',
          fCommand: '',
          fBool: '',
          gBool: '',
          qBool: '',
          pBool: '',
          logoutBool: '',
          loginBool: '',
          cBool: '',
          tBool: '',
          src : null
        };
      }
      onSubmit = (event) =>{      //type command creative portion
        event.preventDefault();
        if(this.state.fCommand === "Financials"){
        this.setState(
          {
            fBool: true
          })
        }
        if(this.state.fCommand === "Gallery"){
          this.setState(
            {
              gBool: true
            })
          }
          if(this.state.fCommand === "Profile"){
            this.setState(
              {
                pBool: true
              })
            }
            if(this.state.fCommand === "Login"){
              this.setState(
                {
                  loginBool: true
                })
              }
              if(this.state.fCommand === "Logout"){
                this.setState(
                  {
                    logoutBool: true
                  })
                }
                if(this.state.fCommand === "Quotes"){
                  this.setState(
                    {
                      qBool: true
                    })
                  }
                  if(this.state.fCommand === "Create"){
                    this.setState(
                      {
                        cBool: true
                      })
                    }
                    if(this.state.fCommand === "Todo"){
                      this.setState(
                        {
                          tBool: true
                        })
                      }
        console.log("here");
      }
    render(){
      if(this.state.fBool === true){        //redirect functions for type commands
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Financials",
        }}/>
      }
      if(this.state.gBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Gallery",
        }}/>
      }
      if(this.state.qBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Quotes",
        }}/>
      }
      if(this.state.loginBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Login",
        }}/>
      }
      if(this.state.logoutBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Logout",
        }}/>
      }
      if(this.state.pBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Profile",
        }}/>
      }
      if(this.state.cBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Create",
        }}/>
      }
      if(this.state.tBool === true){
        console.log("inside");
        test = false;
        return <Redirect to ={{
          pathname: "Todo",
        }}/>
      }
        console.log("username: " + this.state.username)
        console.log("name: " + this.state.name)
        console.log("local: " + JSON.stringify(localStorage))
        return(
            <div className = "center">
              <h1 className = "center"> Homepage </h1>
              <input type = "text" id = "command" placeholder = "User Command" value = {this.state.fCommand} onChange = {event => this.setState({fCommand: event.target.value})}/> 
              <button id = "userCommand" type = "submit" onClick={event => this.onSubmit(event)}> Commmand</button>
              <h3 className = "left"> Current User: {this.state.username}</h3>
              
              <img src = {Img} className = "picture"></img>
            </div>
            
            
        )
      }
}

export default Home;