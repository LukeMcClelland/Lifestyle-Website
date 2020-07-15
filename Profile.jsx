import React, {Component} from 'react';
import './App.css';
import Avatar from 'react-avatar-edit';
import { Redirect } from 'react-router-dom';

class Profile extends Component{
  constructor(props){
    super(props)
    this.state = {
      profile: null,
      src: ""
    }
    this.handleChange = this.handleChange.bind(this)       
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    
  }
  onClose(){          //helper functions
    this.setState({
      profile: null
    })
  }
  onCrop(profile){
    this.setState({
      profile
    })
  }
  
   handleChange(event){
     this.setState({
       profile: this.state.src
     });
   }
   onSubmit = (event) =>{
    event.preventDefault();
    fetch('http://localhost:5000/image', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => this.setState({ error: error.message }));
  }
 
  render() {
    
    return (
      <div className = "create">
          <input type = "file" id = "fileItem" onChange ={(event) => this.handleChange(event)}/>


          <div className = "imageGall">
          <Avatar width={390} height={295} onCrop={this.onCrop} onClose={this.onClose} src={this.state.src}/>
          <img src = {this.state.profile} className = "galleryImages"/>
          <button id = "upload" type = "submit" onClick={e => this.handleChange(e)}/>
      
        </div>
      </div>
      
    );
  }
}

export default Profile;