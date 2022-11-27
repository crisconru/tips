import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'
import './styles.css'
import { TodoList } from './TodoList'
import { TodoAdd } from './TodoAdd'

// const initialState = [{
//     id: new Date().getTime(),
//     desc: 'Aprender React',
//     done: false
// }]

const init = () => {
    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Aprender React',
    //     done: false
    // }]
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const TodoApp = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, [], init)


    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleDelete = (todoID) => {
        console.log(`Borrar todo con ID = ${todoID}`)
        const action = {
            type: 'delete',
            payload: todoID
        }
        dispatchTodo(action)
    }

    const handleToggle = (todoId) => {
        console.log(`toggle id = ${todoId}`)
        const action = {
            type: 'toggle',
            payload: todoId
        }
        dispatchTodo(action)
    }

    const handleAddTodo = (newTodo) => {
        dispatchTodo({
            type: 'add',
            payload: newTodo
        })
    }

    return (
        <>
            <h1>Todo App ( <small>{todos.length}</small> )</h1>
            <hr />

            <div className='row'>
                <div className='col-7'>
                    <TodoList
                        todos={todos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>

                <div className='col-5'>
                    <TodoAdd
                        handleAddTodo={handleAddTodo}
                    />
                </div>
            </div>
        </>
    )
}
