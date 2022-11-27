import { ChangeEvent } from "react"

interface Props {
  value: string,
  items: string[],
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}


const Select = ({value, items, onChange}: Props) => {
  return <select value={value} onChange={onChange}>
    {items.map(item => <option key={item} value={item}>{item}</option>)}
  </select>
}

export default Select