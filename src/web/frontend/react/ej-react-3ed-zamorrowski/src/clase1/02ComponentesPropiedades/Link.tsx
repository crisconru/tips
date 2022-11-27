interface Props {
  to: string,
  openInNewTab?: boolean,
  text: string
}

const Link = ({to, openInNewTab = false, text}: Props) => <a href={to} target={openInNewTab ? '_blank' : '_self'}>{text}</a>
export default Link