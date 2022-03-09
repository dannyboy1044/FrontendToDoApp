import React, { Component } from 'react';
import './css/App.css';
import SingleTodo from "./components/SingleTodo";
import NewTodo from "./components/NewTodo";

class App extends Component {

  constructor(){
    super();
    this.state = {
      todos: [],
      todo: {todo: ""},
      isEditing: false
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/todos');
    const body = await response.json();
    this.setState({todos:body});
  }

  onInputChange = e => {
    this.setState({ todo: {todo: e.target.value }});
  }


//.slice() does a shallow copy of the list.

  async addItem() {
    await fetch('/api/todos', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.todo)
    });
    this.setState({todo: {todo:""}});
    const response = await fetch('/api/todos');
    const body = await response.json();
    this.setState({todos:body});
  }

  pressedEnter = e => {
    if(e.keyCode === 13){
      this.addItem();
    }
  }

  pressedEditEnter = e => {
    if(e.keyCode === 13){
      this.update();
    }
  }

  async deleteItem(id) {
    await fetch('/api/todos/'+id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(
      () => {
        let updatedTodos = [...this.state.todos].filter(i => i.id !== id);
        this.setState({todos: updatedTodos});
      });
  }

  updateItem = pTodo => {
    this.setState({ todo: pTodo, isEditing: true });
  }

  async update(newTodo) {
    await fetch('/api/todos/'+this.state.todo.id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });
    const response = await fetch('/api/todos');
    const body = await response.json();
    this.setState({todos:body, todo: {todo: ""}, isEditing: false});
  }



  render() {
    let bulletedTodos = this.state.todos.map(todo => {
      return (
        <SingleTodo todo={todo} delete={this.deleteItem.bind(this)} update={this.updateItem} />
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="Main-title">Simple CRUD ToDo App</h1>
        </header>
        {this.state.isEditing ? (
          <div>
            <NewTodo
              updateTodo={this.state.todo}
              onInputChange={this.onInputChange.bind(this)}
              update={this.update.bind(this)}
              pressedEdit = {this.pressedEditEnter}
            />
          </div>
        ) : (
          <div>
            <div className="item-input-button">
            <input className="input-field" placeholder="Enter Item" value={this.state.todo.todo}
              onChange={this.onInputChange.bind(this)} onKeyDown={this.pressedEnter} size="30"/>
            <br />
            <button className="BUTTON_NWO" onClick={this.addItem.bind(this)} >Add Item</button>
            </div>

            <div className="list-items">
              { this.state.todos.length === 0 ? "List Currently Empty" : <div className="listItems col-12"><ul className="todo">{bulletedTodos}</ul></div> }
            </div>
          </div>
        )}
      </div>
    );
  }

}

export default App;
