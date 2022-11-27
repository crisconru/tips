const users = ['sergio', 'victoria', 'iván', 'liviu']

const PintarUsuarios = () => <ul>{users.map((user) => <li key={user}>{user}</li>)}</ul>

export default PintarUsuarios