import { X } from "lucide-react"

export default function TodoCard(box) {
const {props} = box;
// console.log(box);
// console.log(props.id);
// console.log(props.taskName);

  return (
    <div className='flex flex-row justify-between items-center'>
      <input type="checkbox" className="checkbox checkbox-md" />
      <span className='grow'>{props.taskName}</span>
      <button className="btn btn-square" onClick={null}><X /></button>
    </div>
  )
}
