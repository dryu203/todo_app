import './App.css';
import TodoList from './components/TodoList';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from 'react';
import { todoApi } from './services/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todoApi.getAll();
        setTodoList(todos.slice().reverse());
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos(); // Lấy lần đầu

    const interval = setInterval(fetchTodos, 200);

    return () => clearInterval(interval); // Clear khi unmount
  }, []);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(async () => {
    try {
      const newTodo = await todoApi.create(textInput);
      setTodoList(prevTodoList => [newTodo, ...prevTodoList]);
      setTextInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }, [textInput]);

  const onCheckBtnClick = useCallback(async (id) => {
    try {
      const updatedTodo = await todoApi.update(id);
      setTodoList(prevState => 
        prevState.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }, []);

  const onDeleteBtnClick = useCallback(async (id) => {
    try {
      await todoApi.delete(id);
      setTodoList(prevState => prevState.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, []);

  const onEditBtnClick = useCallback(async (id, newName) => {
    try {
      const updatedTodo = await todoApi.edit(id, newName);
      setTodoList(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button appearance="primary" isDisabled={!textInput} onClick={onAddBtnClick}>
            Thêm
          </Button>
        }
        css={{ padding: '2px 4px 2px' }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} onDeleteBtnClick={onDeleteBtnClick} onEditBtnClick={onEditBtnClick} />
    </>
  );
}

export default App;
