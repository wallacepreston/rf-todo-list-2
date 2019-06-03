import React, {Component} from 'react'
import todosAPI from './todos-api'
import Form from './Form'

export default class UpdateTodo extends Component {
  constructor(){
    super()
    this.state = {
      taskName: '',
      assignee: '',
      warningMessage:'',
      initialized: false,
      errorMessage: ''
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({
      taskName: this.props.todo.taskName,
      assignee: this.props.todo.assignee,
      warningMessage: 'Field is required!'
    })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const todoId = this.props.todo.id
    try {
      const {data} = await todosAPI.put(`/todos/${todoId}`,this.state)
      this.props.updateTodo(data)
    } catch(err) {
      this.setState({
        errorMessahe: `There was a problem updating the todo: ${err.message}`
      })
    }
  }

  render () {
    return (
      <Form
      {...this.state}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}/>
    )
  }
}
