import React, {Component} from 'react';
import './Todo.css';
import axios from 'axios';
var test = [];
class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
          newTask: '',
          addedTask: [],
          tasks: '',
          newArray: [],
          test: '',
          user: localStorage.getItem("currentUser"),
          deleteTask: ''
        };
        this.showTasks = this.showTasks.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        
      }
        onSubmit = (event) =>{        //store tasks in db
          event.preventDefault();
          fetch('http://localhost:5000/todo', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(result => {
            console.log(result.item);
            console.log("Made it back to jsx (onSubmit)")
            this.setState({
              tasks: result.item,
              addedTask: [...this.state.addedTask, JSON.stringify(result.item)]
            })
            this.showTasks();
          })
          .catch(error => this.setState({ error: error.message }));
        }

        showTasks = (event)=>{        //show all current tasks associated with user
          console.log("showTasks")
          event.preventDefault();
          fetch('http://localhost:5000/fetchtasks', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            console.log("Made it back to jsx: " + JSON.stringify(result.result))
            console.log(result.result);
            this.setState({
              newArray: [...this.state.newArray, ...result.result]
              // tasks: result.task.task
            })
            console.log(this.state.newArray);
          })
          .catch(error => this.setState({ error: error.message }));
        }

        deleteItem = (event)=>{       //delete tasks from todo list
          event.preventDefault();
          console.log("delete task: " + JSON.stringify(this.state.deleteTask));
          console.log("delete item")
          fetch('http://localhost:5000/deletetasks', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(result => {
            console.log("made it back")
            // console.log(result);
            this.setState({
              // addedTask: [],
              tasks: result.task.task
            })
            console.log("RESULT>TASK: " + JSON.parse(result.task));
            var temp = [...this.state.addedTask];
            var index = temp.indexOf(JSON.parse(result.task));
            console.log("INDEX: " + index)
              temp.splice(index, 1);
              this.setState({addedTask: temp});
              this.showTasks();
          })
          .catch(error => this.setState({ error: error.message }));
        }
        delete = (event, task) => {       //helper functions for delete tasks
          console.log("here!!!!");
          this.setState({deleteTask: task}, () => this.deleteItem(event));
          
         // console.log("state delete: " + this.state.deleteTask);
          // this.deleteItem(event);
        }
        delete1 = (event, task) => {
          console.log("here!!!!");
          this.setState({deleteTask: task}, () => this.deleteShow(event));
        }

        deleteShow= (event)=>{
          event.preventDefault();
          console.log("delete task: " + JSON.stringify(this.state.deleteTask));
          console.log("delete item")
          fetch('http://localhost:5000/deleteshow', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(result => {
            console.log("made it back to deletShow: " + result.task);
            // console.log(result);
            this.setState({
              // addedTask: [],
              tasks: result.task.task
            })
            var array = [...this.state.newArray];
            var index = array.indexOf(result.task);
              array.splice(index, 1);
              this.setState({newArray: array});
              this.showTasks();

            console.log("test");
          })
          .catch(error => this.setState({ error: error.message }));
        }
    render(){
        return(
            //code from https://medium.com/@atingenkay/creating-a-todo-app-with-node-js-express-8fa51f39b16f
            <div class = "left">
           <title> To-Do App </title>
            <div className="container">
            <input className = "todoInput" type= "text" name= "newtask" placeholder="New Task" value = {this.state.newTask} onChange = {event => this.setState({newTask: event.target.value})} required/>        
            
            <button className = "addButt" onClick={e => this.onSubmit(e)}> Add Tasks </button>
            <button className = "showButt" onClick={e => this.showTasks(e)}> Show Tasks </button>
           <div> 
           {this.state.newArray.map((item, x) =>
           <li key = {x}> {item.task} <button className = "deleteItem" onClick={event => this.delete1(event, item.task)}> X </button></li>
           )}
              </div>
            <div>
            {this.state.addedTask.map((tasks, index) =>
            <li key = {index}> {tasks} <button className = "deleteItem" onClick={event => this.delete(event, tasks)}> X </button></li>
        )}
        </div>
            <hr></hr>
            </div>
            </div>
        )
      }
}

export default Todo;