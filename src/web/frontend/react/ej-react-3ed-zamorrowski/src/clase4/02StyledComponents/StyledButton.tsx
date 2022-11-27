import styled, {css} from 'styled-components'


const Button = styled.button`
  background-color: grey;
  color: white;
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `};
`

const StyledButton = () => {
  return (
    <>
      <Button >jelowis</Button>
      <Button primary>jelowis</Button>
    </>
  )
}
export default StyledButton
