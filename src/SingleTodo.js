import React, {Component} from 'react'
import Todo from './Todo'
import UpdateTodo from './UpdateTodo'
import todosAPI from './todos-api'
import {Link} from 'react-router-dom'

export default class SingleTodo extends Component {
  constructor () {
    super()
    this.state = {
      todo: {}
    }
  }

  async componentDidMount () {
    try {
      const todoId = this.props.match.params.todoId
      const res = await todosAPI.get(`/todos/${todoId}`)
      this.setState({todo: res.data})
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const todo = this.state.todo

    return (
      <div id='single-todo'>
        <Todo todo={todo} />
        <UpdateTodo />
        <Link to='/'>Back</Link>
      </div>
    )
  }
}
