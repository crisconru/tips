const initialState = [
    {
        id: 1,
        todo: 'Comprar pan',
        done: false
    }
]

const todoReducer = (state = initialState, action) => {
    if(action?.type === 'add') {
        return [...state, action?.payload]
    }
    return state
}

let todos = todoReducer()

const newTask = {
    id: 2,
    todo: 'Comprar leche',
    done: false
}

const addTodoAction = {
    type: 'add',
    payload: newTask
}

todos = todoReducer(todos, addTodoAction)

console.log(todos)
