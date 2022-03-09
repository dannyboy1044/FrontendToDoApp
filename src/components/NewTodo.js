import React, {Component} from "react";
import "../css/NewTodo.css"

class NewTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      newTodo: {todo: ""}
    }
  }

  async componentDidMount(){
      const newTodo = await(await fetch('/api/todos/'+this.props.updateTodo.id)).json();
      this.setState({newTodo: newTodo});
  }

  onEditInputChange = e => {
    this.setState({ newTodo: {todo: e.target.value }});
  }


  render(){
    return (
      <div>
        <h2>Edit List Item</h2>
        <br />
        <input className="input-field" value={this.state.newTodo.todo}
          onChange={this.onEditInputChange}
          placeholder="Edit Item"
          onKeyDown={this.props.pressedEdit}
          size="30"/>
          <button className="newtodo-btn" onClick={() => this.props.update(this.state.newTodo)} >Confirm</button>
          </div>
      );
    }
}

export default NewTodo;
