const users = [{ name: 'Sergio', age: 28 }, { name: 'Victoria', age: 27 }, { name: 'Iván', age: 30 }, { name: 'Liviu', age: 26 }]

const PintarUsuariosNombre= () => <ul>{users.map((user) => <li key={user.name}>Nombre: {user.name} - Edad: {user.age}</li>)}</ul>

export default PintarUsuariosNombre