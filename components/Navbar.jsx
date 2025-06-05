import React from 'react'
import { NavLink } from 'react-router';

export default function Navbar() {
const menu = [
{id: 1, name: "Home", to: "/"},
{id: 2, name: "Todo", to: "/todolist"},
{id: 3, name: "Login", to: "/login"},
];

  return (
    <div>
      {menu.map((el)=>(
        <NavLink key={el.id} to={el.to} className="btn">
          {el.name}
        </NavLink>
      ))}
    </div>
  )
}
