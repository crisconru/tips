import RemoveTaskButton from './RemoveTaskButton'

interface Props {
  content: string,
  onClick: (e: string) => void
}

export const ListItem = ({content, onClick}: Props) => <>
  <span>{content}</span><RemoveTaskButton id={content} onClick={onClick}/>
  <br />
</>

export default ListItem
