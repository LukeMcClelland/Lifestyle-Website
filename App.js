import React, {Component} from 'react';
import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Financials from './Financials';
import Login from './Login';
import Quotes from './Quotes';
import Gallery from './Gallery';
import Create from './Create';
import Todo from './Todo';            //import other jsx files to use
import Profile from './Profile';
import Logout from './Logout';
import Home from './Home';

class App extends Component{
render(){
  return (
      <div>
      <div className="header">
        <h1 >Lifestyle</h1>
      </div>


        {/* Creates the side bar */}
        {/* create links to other pages for proper redirects */}
        <Router>
        <div className = "sidebar">
        <button id = "home" value = "Home"> <Link to = "/Home"> Home </Link></button>
        <button id= "createActBtn" type = "submit"> <Link to = "/Create"> Create Account</Link></button>        
        <button id= "loginBtn" type = "submit"> <Link to = "/Login"> Login</Link></button> 
        <button id = "logout" type = "submit"> <Link to = "/Logout"> Logout </Link></button>
        <button id = "profile" value = "Upload Profile Pic"> <Link to = "/Profile"> Upload Profile Pic </Link></button>
        <a> <Link to = "/Financials"> Financials</Link> </a> 
        <a> <Link to = "/Quotes"> Quotes</Link> </a> 
        <a> <Link to = "/Todo"> Todo</Link> </a> 
        <a> <Link to = "/Gallery"> Photo Gallery </Link> </a> 
        </div>

        {/* Creates Paths to navigate through different pages */}
        <Switch>
          <Route path = "/Home" component = {Home}/>
          <Route path = "/Logout" component = {Logout}/>
          <Route path = "/Financials" component = {Financials} />
          <Route path = "/Login" component = {Login} />
          <Route path = "/Quotes" component = {Quotes}/>
          <Route path = "/Gallery" component = {Gallery}/>
          <Route path = "/Todo" component = {Todo}/>
          <Route path = "/Create" component = {Create}/>
          <Route path = "/Profile" component = {Profile}/>
        </Switch>
        </Router>
        </div>
  );
}
}
export default App;
