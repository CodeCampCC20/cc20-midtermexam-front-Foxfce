import { X } from "lucide-react"
import useTodoStore from "../stores/todoStore";

export default function TodoCard(box) {
const {props,hdlChecked,index,hdlDelete} = box;
const test = useTodoStore((state) => state.todoList[index]);
// console.log('test',test);
// console.log(box);
// console.log(props.id);
// console.log(props.taskName);

  return (
    <div className='flex flex-row justify-between items-center'>
      {/* <input 
      id={props.id} 
      type="checkbox" 
      className="checkbox checkbox-md" 
      checked={props.completed ? true : false}
      onChange={(e)=>hdlChecked(e,props)} /> */}
        <input 
      id={props.id} 
      type="checkbox" 
      className={`checkbox checkbox-md`}
      // checked = {test.completed}
      checked={props.completed}
      onChange={(e)=>hdlChecked(e,props)} />
      <span className={`grow ${(props.completed? 'line-through' :null)}`}>{props.taskName}</span>
      <button className="btn btn-square" onClick={(e)=>hdlDelete(e,props.id)}><X /></button>
    </div>
  )
}
