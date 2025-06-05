/** @format */

export default function InputForm({
  error,
  text,
  hdlChange,
  value,
  placeholder,
  type = text,
  id,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label" htmlFor={id}>{text}</label>
        <input
          id={id}
          // type={type}
          className={`input ${error ? "outline-1 outline-red-500" : "outline-0"}`}
          placeholder={placeholder}
          value = {value}
          onChange={hdlChange} />
          {error &&<p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}