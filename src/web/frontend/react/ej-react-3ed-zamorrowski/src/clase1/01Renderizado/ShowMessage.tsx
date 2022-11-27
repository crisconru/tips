interface Props {
    showMessage: boolean
}

const ShowMessage = ({showMessage}: Props) => <p>ShowMessage: {showMessage ? 'Ahora puedes leer esto': ''}</p>
export default ShowMessage