import React from "react";
import "./todoCreate.css";
// import TodoCreate from "./todoCreate";
function TodoList(props) {
  // const name = TodoCreate.value;

  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td onClick={()=>{props.onEdit(props)}} className="delete-icon">{props.iconEdit}</td>
        <td onClick={()=>{props.onSelect(props.id)}} className="delete-icon">{props.icon}</td>
      </tr>
    </>
  );
}

export default TodoList;
