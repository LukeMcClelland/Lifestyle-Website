import React, {Component} from 'react';
import './Create.css';

class Create extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',     //set initial states for info needed
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }
  handleFormSubmit= (event) =>{
    this.setState({
      username: this.state.username,
      password: this.state.password
    })
  }
  onSubmit = (event) =>{
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    console.log("state values: " + data)
    fetch('http://localhost:5000/create', {         //communicate with backend express
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      console.log("Made it back to jsx")
    })
    .catch(error => this.setState({ error: error.message }));
  }

  // html/css design and setting states for inputed info
  render(){
    return(
      <div>
        <form className = "center">
        <div className = "container, center">           
        <h2> Username </h2>
        <input className = "userCreate" type = "text" name = "username" placeholder = "Enter Username" value = {this.state.username} onChange = {e => this.setState({username: e.target.value})} required />
        <h2> Password </h2>
        <input className = "passCreate" type = "text" name = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {e => this.setState({password: e.target.value})} required />
        <p></p>
        <button type = "Submit" value = "Login" onClick={e => this.onSubmit(e)}> Create Account </button>
        </div>
        </form>
        </div>
        
      
    )
  }
}

export default Create;
