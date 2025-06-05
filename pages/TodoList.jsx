import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import TodoCard from './TodoCard'
import useAuthStore from '../stores/authStore';
import useTodoStore from '../stores/todoStore';
import todoListApi from '../api/todoListApi';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { schemaTooList } from '../validator/schemaTodoList';

const initialInput = {
  taskName: "",
  userId: 21
}

export default function TodoList() {
  const token = useAuthStore((state) => state.token);

  const todoList = useTodoStore((state) => state.todoList);
  const actionFetchTodoList = useTodoStore((state) => state.actionFetchTodoList);

  const [inputError, setInputError] = useState(initialInput);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

  useEffect(() => {
    actionFetchTodoList(token);
  }, []);

  const hdlDelete = async (todoId) => {
    try {
      setIsLoadingDel(true);
      await todoListApi.deleteTodoList(todoId, token);
      await actionFetchTodoList(token);

      toast.success("Delete success !!");
    } catch (error) {
      console.log("TodoPage error", error);
      toast.error("Delete invalid!!");
    } finally {
      setIsLoadingDel(false);
    }
  };

  const hdlChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  }

  const hdlKeyDownSave = async (e) => {
    if (e.key === 'Enter') {
      // console.log('Enter Keypress');
      try {
        schemaTooList.validateSync(input, {abortEarly: false});

        console.log('todoId', todoId);
        console.log('input TodoList', input);
        setIsLoading(true);
        await todoListApi.updateTodoList(input, token);
        await actionFetchTodoList(token);

        toast.success("Add todo list success!!");
      } catch (error) {
        console.log("TodoPage error", error);
        toast.error("Add todo invalid!!");
        if(error instanceof Yup.ValidationError){
          const err = error.inner.reduce((acc,cur)=>{
            acc[cur.path] = cur.message;
            return acc;
          },{});
          setInputError(err);
        }
      }finally{
        setIsLoading(false);
      }
    }
  };

  const hdlClickCheckTodo =async () =>{
    await actionFetchTodoList(token);
    console.log(todoList);
  }

  return (
    <div className='flex justify-center items-center'>
      <div>
        <h1>My Todo</h1>

        <div className='flex flex-row justify-between items-center'>
          <input type="text" placeholder="Type here" className={`input ${inputError.taskName ? "outline-1 outline-red-500" : "outline-0"}`} onChange={hdlChange} onKeyDown={hdlKeyDownSave} />
          <button type="submit" className="btn" onClick={hdlClickCheckTodo}>Check</button>
        </div>
        {inputError.taskName &&<p className="text-red-500 text-xs">{inputError.taskName}</p>}

        <div>

          {todoList.map((el)=>{
            return <TodoCard key={el.id} props={el} />
          })}
          {/* fetch data map to do card */}
          {/* <TodoCard /> */}
          {/* <TodoCard /> */}
          {/* <TodoCard /> */}
        </div>
      </div>
    </div>
  )
}
