import React, {Component} from 'react';
import './Gallery.css';
import { Redirect } from 'react-router-dom';

//code from https://malcoded.com/posts/react-file-upload/
class Gallery extends Component{
  constructor(props){
    super(props)
    this.state = {
      file: null,
      fileArray: [],
      upload: ''
    }
    this.handleChange = this.handleChange.bind(this)
    
  }
  handleChange(event){
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),       //setting states for photos to display properly
      fileArray: [...this.state.fileArray, URL.createObjectURL(event.target.files[0])],
      upload: this.state.file
    });
  }
  
  render() {
    return (
      <div className = "title">
          <input type = "file" id = "fileItem" onChange ={(event) => this.handleChange(event)}/>

          <div className = "imageGall">
{/* mapping elements to array to display like a collage */}
          {this.state.fileArray.map((file) =>
        <img src = {file} className = "galleryImages" key={file}/>
        )}
        </div>
      </div>
      
    );
  }
}


export default Gallery;
