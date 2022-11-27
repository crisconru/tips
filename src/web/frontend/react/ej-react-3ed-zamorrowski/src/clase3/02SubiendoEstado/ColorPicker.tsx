import { ChangeEvent } from "react"

interface Props {
  color: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ColorPicker = ({color, onChange}: Props) => <input type='color' value={color} onChange={onChange}/>

export default ColorPicker