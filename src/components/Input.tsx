import { useId } from "react"

export default function Input({
    label,
    type
}:{
    label:string,
    type:string
}){
    const id = useId();
return (
    <div className="flex flex-col">
        <label htmlFor={id} >{label}</label>
        <input id={id} type={type} className="border p-2 rounded-md border-gray-400"/>
    </div>
)
}