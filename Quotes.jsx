import React, {Component} from 'react';
import './Quotes.css';

class Quotes extends Component{
    constructor(props){
        super(props);
        this.state = {
          quote: '',
          sQuote: '',
          bQuote: '',
          array: []
        };
      }
      onSubmit = (event) =>{        //store quotes in mongodb
        event.preventDefault();
        fetch('http://localhost:5000/quotes', {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          console.log("Made it back to jsx")
          this.setState({
            bQuote: JSON.stringify(result.quote)
          })
        })
        .catch(error => this.setState({ error: error.message }));
      }

      getQuote = (event) =>{        //show tasks button queries mongodb
        console.log("made it to function");
        event.preventDefault();
        fetch('http://localhost:5000/getquotes', {
          method: 'get',
          headers: { 'content-type': 'application/json' },
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          console.log("Made it back to jsx")
          console.log("sent back quote: " + JSON.stringify(result.result[0].quote))
          this.setState({
            sQuote: JSON.stringify(result.quote),
            array: JSON.stringify(result.result[0].quote)
          })
        })
        .catch(error => this.setState({ error: error.message }));
      }

      render(){
        return(
            <div>
            <div className= "center">
            <h1> Quote Gallery </h1>
            <input className = "button" type = "Submit" name = "Request Quote" value = "Request Quote" onClick = {e=>this.getQuote(e)}/>
            </div>
            <p></p>
          <div className= "left">
          <input placeholder = "Input Quote to Upload" className = "input" type = "Text" name = "Submit Quote" value = "Quote" value = {this.state.quote} onChange = {e => this.setState({quote: e.target.value})} required/>
          <input className = "button" type = "Submit" name = "Request Quotes" value = "Upload Quote" onClick={e => this.onSubmit(e)}/>
          </div>
          <hr></hr>
          <p></p>
          <div className= "left">
          <h2> Quotes </h2>
          <div> {this.state.bQuote} </div>
          <div> {this.state.array}</div>
          </div>
          </div>
          
        )
      }
}

export default Quotes;
