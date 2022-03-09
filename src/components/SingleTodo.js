import React from "react";
import "../css/SingleTodo.css"

const SingleTodo = props => {
  return (
    <li key={props.todo.id}>
      {props.todo.todo}
      <div className="buttons">
        <button onClick={() => props.update(props.todo)}>Edit</button>
        <button onClick={() => props.delete(props.todo.id)}>Delete</button>
      </div>
    </li>
  );
}
export default SingleTodo;
