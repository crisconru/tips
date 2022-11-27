import { MouseEvent } from "react"

interface Props {
  onClick: (e:MouseEvent<HTMLButtonElement>) => void
}


const AddTaskButton = ({onClick}: Props) => <button type="button" onClick={onClick}>Añadir todo</button>

export default AddTaskButton
