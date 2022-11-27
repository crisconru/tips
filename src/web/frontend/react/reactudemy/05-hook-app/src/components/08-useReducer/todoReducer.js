
export const todoReducer = (state = [], action) => {
    console.log(`reducer action ${action.type}`)
    switch (action.type) {
        case 'add':
            return [...state, action?.payload]
        case 'delete':
            return state.filter( todo => todo.id !== action.payload)
        case 'toggle':
            return state.map( todo =>
                (todo.id === action.payload)
                    ? {...todo, done: !todo.done }
                    : todo
            )
            default:
            return state
    }
}
