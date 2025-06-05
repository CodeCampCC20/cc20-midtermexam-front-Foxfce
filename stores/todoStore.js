import { create } from "zustand";
import todoListApi from "../api/todoListApi";

const useTodoStore = create((set) => ({
  todoList: [
    //     {
    //   "todos": [
    //     //example of data server stored
    //     {
    //       "id": 1,
    //       "taskName": "Buy milk",
    //       "completed": false,
    //       "userId": 1,
    //       "createdAt": "2025-05-22T14:30:00",
    //       "updatedAt": "2025-05-22T15:00:00"
    //     }
    //   ],
    //   "success": true
    // },

    //example initial data
    // {
    //     "todos": [],
    //     "success": true
    // },

  ],
  actionFetchTodoList: async (token) => {
    try {
      const res = await todoListApi.getAllTodoListByToken(token);
      // console.log('res',res);
      // console.log('res',res.data);
      console.log('res', res.data.todos);

      set({ todoList: res.data.todos });

    } catch (err) {
      console.log(err);
    }
  },
  markTodoList: async (input,todoId,token)=>{
    try{
      console.log('input', input)
      const res=await todoListApi.updateTodoList(input,todoId,token);
      console.log('res',res.data);
      console.log('res',res.data.todo);

      set(prev => prev.todoList.map( item => item.id === res.data.todo.id ? res.data.todo : item ));
    }catch(err){
      console.log(err);
    }
  }

}));

export default useTodoStore