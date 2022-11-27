import React from 'react'

export const TodoListItem = ( {todo, index, handleDelete, handleToggle} ) => {
    return (
        <li key={todo.id} className='list-group-item'>
            <p
                className={`text-center ${todo.done && 'complete'}`}
                onClick={() => handleToggle(todo.id)}
            >
                {index + 1}. {todo.desc}
            </p>
            <button 
                className={'btn-danger'}
                onClick={() => handleDelete(todo.id)}
            >
                Borrar
            </button>
        </li>
    )
}
