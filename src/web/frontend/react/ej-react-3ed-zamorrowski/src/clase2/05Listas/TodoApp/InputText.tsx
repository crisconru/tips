import { ChangeEvent } from "react"

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string
}

const InputText = ({onChange, value}: Props) => <input onChange={onChange} value={value}/>

export default InputText