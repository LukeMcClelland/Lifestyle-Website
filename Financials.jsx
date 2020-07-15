import React, {Component} from 'react';
import './Financials.css';
import axios from 'axios';
class Financials extends Component{
    constructor(props){
        super(props);
        this.state = {      //setting states
          income: '',
          rent: '',
          food: '',
          misc: '',
          savings: '',
          help: '',
          rPercent: 0,
          fPercent: 0,
          mPercent: 0,
          sPercent: 0,
          rHelp: '',
          fHelp: '',
          sHelp: '',
          good: ''
        };
        this.getPercent = this.getPercent.bind(this);
      }
      onSubmit = (event) =>{          //communicate with backend 
        event.preventDefault();
        fetch('http://localhost:5000/financials', {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          console.log("Made it back to jsx")
          this.setState({ 
            income: result.income,        //set results of mongodb communication
            rent: result.rent, 
            food: result.food,
            misc: result.misc,
            savings: result.savings
          })
          this.getPercent();
          
        })
        .catch(error => this.setState({ error: error.message }));
      }

      help = (event)=>{
        if(this.state.rPercent > 30){       //helper functions for giving suggestions
          this.setState({
          rHelp: "Rent should be less than 30% of your income"
          })
        }
        if(this.state.fPercent > 15){
          this.setState({
            fHelp: "You spend way too much money on food (spend less than 15% of monthly income)"
          })
        }
        if(this.state.sPercent < 30){
          this.setState({
            sHelp: "You need to save more homie. At least 30% into savings"
          })
        }
        if(this.state.rPercent < 30 && this.state.fPercent < 15 && this.state.sPercent > 30){
          this.setState({
            good: "No suggestions. You're doing great!"
          })
        }
      }

     getPercent = () => {
       let rp = parseFloat((this.state.rent)/(this.state.income) * 100)       //helper function for calculating percents
       let fp = parseFloat((this.state.food)/(this.state.income) * 100)
       let mp = parseFloat((this.state.misc)/(this.state.income) * 100)
       let sp = parseFloat((this.state.savings)/(this.state.income) * 100)
        console.log("RP: " + rp)
          this.setState({
            rPercent: rp,
            fPercent: fp,
            mPercent: mp,
            sPercent: sp
          })
     }
    //html input data area
      render(){
        return(
            <div>
        <form onSubmit = {this.onSubmit}>
        <div className = "center">
        <h1> Financials Page </h1>
        </div>
        <div className = "left">
          <h2> Log Financial Data </h2>
        <input className = "input" type = "text" name = "income" placeholder = "Monthly Income" value = {this.state.income} onChange = {e => this.setState({income: e.target.value})}required /> Monthly Income
        <p></p>
        <input className = "input" type = "text" name = "rent" placeholder = "Monthly Rent" value = {this.state.rent} onChange = {e => this.setState({rent: e.target.value})}required /> Monthly Rent
        <p></p>
        <input className = "input" type = "text" name = "food" placeholder = "Food Expenses" value = {this.state.food} onChange = {e => this.setState({food: e.target.value})}required /> Food Expenses
        <p></p>
        <input className = "input" type = "text" name = "misc" placeholder = "Miscellaneous Expenses" value = {this.state.misc} onChange = {e => this.setState({misc: e.target.value})}required /> Miscellaneous Expenses
        <p></p>
        <input className = "input" type = "text" name = "savings" placeholder = "Monthly Savings" value = {this.state.savings} onChange = {e => this.setState({savings: e.target.value})}required /> Monthly Savings
        <p></p>
        <input type = "Submit" value = "Log Data" className = "button" onClick={e => this.onSubmit(e)}/>
        </div>
        </form>
        <hr></hr>
        <p></p>
        <p></p>
        <div className = "left">
        <h2> Budget Breakdown </h2>
        <h2> Financials </h2>
        <div> Income: ${this.state.income} </div>   
        <div> Rent: ${this.state.rent} </div>
        <div> Food: ${this.state.food} </div>
        <div> Misc: ${this.state.misc} </div>
        <div> Savings: ${this.state.savings} </div>
        <h3> Financials Breakdown</h3>
        <div> Income Total: {this.state.income}</div>
        <div> Rent Percentage: {this.state.rPercent}%</div>
        <div> Food Percentage: {this.state.fPercent}%</div>
        <div> Misc Percentage: {this.state.mPercent}%</div>
        <div> Savings Percentage: {this.state.sPercent}%</div>
        <hr></hr>
      <h2> Request Budget Help </h2>
        <button type = "Submit" value = "Request Advice" className = "button" onClick={e => this.help(e)} > Request Financial Advice </button>
        <p> </p>
        <div> {this.state.rHelp} <p> </p>{this.state.fHelp}<p></p> {this.state.sHelp} <p></p>{this.state.good}</div>
        </div>
        </div>
        
        )
      }
    }

export default Financials;
