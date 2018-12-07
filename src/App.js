import React, { Component } from 'react';
import Gun from 'gun'

const gun = Gun().get('todos')
const formatTodos = todos => Object.keys(todos)
  .map(key => ({ key, val: todos[key] }))
  .filter(t => Boolean(t.val) && t.key !== '_')


class App extends Component {

  constructor() {
    super()
    this.state = {newTodo: '', todos: []}
  }

  componentWillMount() {
    gun.on(todos => this.setState({
      todos: formatTodos(todos)
    }))
  }

  add = _ => {
    gun.get(Gun.text.random()).put(this.state.newTodo)
    this.setState({newTodo: ''})
  }

  del = key => gun.get(key).put(null)

  handleChange = e => this.setState({ newTodo: e.target.value})

  render() {
    return (
      <div>
        <input value={this.state.newTodo} onChange={this.handleChange} />
        <button onClick={this.add}>Add</button>
        <br />
        <ul>
          {this.state.todos.map(todo => <li key={todo.key} onClick={_=>this.del(todo.key)}>{todo.val}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
