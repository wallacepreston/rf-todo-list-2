import React, { Component } from 'react';
import todosAPI from './todos-api';
import Todo from './Todo';
import CreateTodo from './CreateTodo';

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await todosAPI.get('/todos/');
      this.setState({ todos: res.data });
    } catch (err) {
      console.error(err);
    }
  }

  deleteTodo(todoId) {
    todosAPI.delete(`/todos/${todoId}`);
    this.setState(oldState => ({
      todos: oldState.todos.filter(todo => todo.id !== todoId)
    }));
  }

  addTodo(todo) {
    this.setState(oldState => ({
      todos: [...oldState.todos, todo]
    }));
  }

  render() {
    return (
      <div id="todos">
        <CreateTodo addTodo={this.addTodo} />
        {this.state.todos.map(todo => (
          <Todo todo={todo} key={todo.id} deleteTodo={this.deleteTodo} />
        ))}
      </div>
    );
  }
}
