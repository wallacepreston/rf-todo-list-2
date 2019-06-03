import React, { Component } from 'react'
import todosAPI from './todos-api'
import Form from './Form'

export default class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      assignee: '',
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await todosAPI.post('/todos', this.state)
      this.props.addTodo(data)
      this.setState({
        taskName: '',
        assignee: '',
        errorMessage: ''
      })
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem creating the todo: ${err.message}`
      })
    }
  }

  render() {
    return (
      <Form {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}
