import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from '../layout/MainLayout'
import TodoList from '../pages/TodoList';
import LoginPage from '../pages/LoginPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TodoList />} />
        <Route path="todolist" element={<TodoList />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="*" element={<p>Page not Found</p>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
