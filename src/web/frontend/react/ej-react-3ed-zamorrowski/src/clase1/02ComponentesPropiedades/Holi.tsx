interface Props {
    callback: (e: any) => void
}

const Holi = ({callback}: Props) => <button onClick={callback}>Holi button</button>
export default Holi