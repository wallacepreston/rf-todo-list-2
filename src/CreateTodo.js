import React, { Component } from 'react';
import todosAPI from './todos-api';

export default class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      assignee: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { data } = await todosAPI.post(
      '/todos',
      this.state
    );
    this.props.addTodo(data);
    this.setState({
      taskName: '',
      assignee: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          name="taskName"
          value={this.state.taskName}
          onChange={this.handleChange}
        />
        <label htmlFor="assignee">Assignee:</label>
        <input
          type="text"
          name="assignee"
          value={this.state.assignee}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
