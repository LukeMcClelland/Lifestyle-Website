import React, {Component} from 'react';
import './Logout.css';
import { Redirect } from 'react-router-dom';
class Logout extends Component{
  constructor(props){
    super(props)
    this.state = {
      loggedOut: false
    }
  }
  onSubmit = (event) =>{
    event.preventDefault();         //remove current user data
    fetch('http://localhost:5000/logout', {
      method: 'post',
    })
    .then(res => res.json)
    .then(result => {
      console.log(result);
      console.log("Made it back to jsx: Logged out")
      localStorage.clear()
      console.log(this.state.username)
      this.setState({
        loggedOut: true
      })
    })
    .catch(error => this.setState({ error: error.message }));
  }
    render(){
      if(this.state.loggedOut == true){
        return <Redirect to ={{
          pathname: "Home",
        }}/>
       }
        return(
            <div>
              <h1 className = "center"> Logout Page </h1>
              <h2 className = "center"> Are you sure you wish to logout? </h2> 
              <div className = "extra">
              <button value = "Logout" onClick={e => this.onSubmit(e)}> Logout </button>
              </div>
            </div>
        )
      }
}

export default Logout;