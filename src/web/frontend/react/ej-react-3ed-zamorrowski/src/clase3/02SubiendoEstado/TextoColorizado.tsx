interface Props {
  color: string
}

const TextoColorizado = ({color}: Props) => <p style={{color: color}}>Texto coloreado</p>

export default TextoColorizado