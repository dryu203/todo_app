import React from 'react'
import Todo from './Todo'

export default function TodoList({ todoList, onCheckBtnClick, onDeleteBtnClick, onEditBtnClick }) {
  return (
    <>
    {
        todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} onDeleteBtnClick={onDeleteBtnClick} onEditBtnClick={onEditBtnClick} />
        ))
    }
    </>
  )
}
