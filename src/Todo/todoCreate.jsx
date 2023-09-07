import React, { useState } from "react";
import "./todoCreate.css";
import TodoList from "./todoList";
import { createList, getList,deleteList,updateList } from "../utils/api/Todo";
import { useMutation, useQuery } from "react-query";
function TodoCreate() {
  const [isEdit, setEditMode] = useState(false);
  const [todoName, setTodoName] = useState({id:"",name:""}); //Enter value in input
  const { mutateAsync: details } = useMutation("createList", createList);
  const { mutateAsync: deleteDetails } = useMutation("deleteList", deleteList);
  const { mutateAsync: editDetails } = useMutation("updateList", updateList);
  const { data: dataTodo,refetch:fetchlist } = useQuery("getList", getList);
  const inputChange = (event) => {
    setTodoName((oldData)=> ({...oldData, [event.target.name] : event.target.value}) );
  };


  const submit = async (event) => {
    event.preventDefault();
    if (todoName.id !==  "") {
      editDetails(todoName,{onSuccess:(x)=>{
        if(x.data==='OK'){
          alert('Value is success')
        }
        fetchlist();
      }})
     
      setTodoName({id:"",name:""});
      setEditMode(false)
    } 
    else {
      await details({ listName: todoName.name },{onSuccess:()=>{fetchlist()}});
      setTodoName({id:"",name:""});
    }
  };
  // console.log(data, "value of check");


  const deleteItems = (id) => {
    deleteDetails(id,{onSuccess:()=>{fetchlist()}});
  };
  const editItems = (selectedData) => {
    setTodoName({id:selectedData.id,name:selectedData.text})
    setEditMode(true)
  
  };
  return (
    <>
      <div className="text-center">
        <h2>Todo List</h2>
        <form onSubmit={submit} className="site-search single-block-form">
          <input
            type="text"
            name="name"
            value={todoName.name}
            id="search-site"
            placeholder="Enter Name"
            className="sbf__input"
            onChange={inputChange}
          />

          <input
            type="submit"
            value={isEdit === true ? "Update" : "Add"}
            className="sbf__button button"
          />
        </form>
      </div>
      <h2>List of Todo Records</h2>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataTodo?.map((itemsval) => {
              return (
                <TodoList
                  id={itemsval._id}
                  key={itemsval._id}
                  text={itemsval.listName}
                  icon={"x"}
                  iconEdit={"i"}
                  onSelect={deleteItems}
                  onEdit={editItems}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodoCreate;
