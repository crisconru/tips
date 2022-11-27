interface Props {
  id: string,
  onClick: (e: string) => void
}

export const RemoveTaskButton = ({id, onClick}: Props) => <button onClick={() => onClick(id)}>Eliminar todo</button>

export default RemoveTaskButton
