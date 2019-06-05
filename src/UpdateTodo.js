import React, {Component} from 'react'
import todosAPI from './todos-api'
import Form from './Form'

export default class UpdateTodo extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskName: props.todo.taskName,
      assignee: props.todo.assignee,
      warningMessage:'Field is required!',
      initialized: false,
      errorMessage: ''
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const todoId = this.props.todo.id
      const {taskName, assignee} = this.state
      const {data} = await todosAPI.put(`/todos/${todoId}`, {
        taskName,
        assignee
      })
      this.props.updateTodo(data)
    } catch(err) {
      this.setState({
        errorMessage: `There was a problem updating the todo: ${err.message}`
      })
    }
  }

  render () {
    return <Form
      {...this.state}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
    />
  }
}
