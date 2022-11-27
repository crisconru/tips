import { ChangeEvent, useState } from "react"
import AddTaskButton from "./AddTaskButton"
import InputText from "./InputText"
import List from "./List"

interface State {
  todos: string[],
  todo: string
}

const initialState: State = {
  todos: ['Aprender React'],
  todo: ''
}

const ListContainer = () => {
  const [state, setState] = useState<State>(initialState)
  const handleTodo = ({target}: ChangeEvent<HTMLInputElement>) => setState({
    ...state,
    todo: target.value
  })
  const addTodo = () => setState({
    todos: [...state.todos, state.todo],
    todo: ''
  })
  const removeTodo = (removableTodo: string) => {
    setState({
      ...state,
      todos: state.todos.filter(todo => todo !== removableTodo)
    })
  }
  return <>
    <InputText onChange={handleTodo} value={state.todo}/>
    <AddTaskButton onClick={addTodo} />
    <br />
    <List items={state.todos} onClick={removeTodo}/>
  </>
}

export default ListContainer
