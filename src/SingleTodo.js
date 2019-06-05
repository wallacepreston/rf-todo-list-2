import React, {Component} from 'react'
import Todo from './Todo'
import UpdateTodo from './UpdateTodo'
import todosAPI from './todos-api'
import {Link} from 'react-router-dom'

export default class SingleTodo extends Component {
  constructor () {
    super()
    this.state = {
      todo: {},
      error: null
    }
    this.updateTodo = this.updateTodo.bind(this)
  }

  async componentDidMount () {
    try {
      const todoId = this.props.match.params.todoId
      const res = await todosAPI.get(`/todos/${todoId}`)
      this.setState({todo: res.data, error: null})
    } catch (err) {
      console.error(err)
      this.setState({todo: {}, error: err})
    }
  }

  updateTodo(todo){
    this.setState({todo})
  }

  render () {
    const { todo, error } = this.state

    return (
      <div id='single-todo'>
        {error && <div className="error">{error.message}</div>}
        {todo.id && (
          <>
            <Todo todo={todo} />
            <UpdateTodo todo={todo} updateTodo={this.updateTodo} key={todo.id} />
          </>
        )}
        <Link to='/'>Back</Link>
      </div>
    )
  }
}
