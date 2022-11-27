import ListItem from "./ListItem"

interface Props {
  items: string[],
  onClick: (e: string) => void
}

const List = ({items, onClick}: Props) => {
  return <>
    { items.map(item => <ListItem key={item} content={item} onClick={onClick}/>) }
  </>
}

export default List