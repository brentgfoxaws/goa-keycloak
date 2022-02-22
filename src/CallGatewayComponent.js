import React, { Component } from 'react';
import axios from 'axios';

export default class CallGatewayComponentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, message } = this.state;
    const resp = await axios.post(
      'https://g83bcjrg0a.execute-api.us-west-2.amazonaws.com/prod/goa-sample',
      { key1: `${name}, ${message}` }
    );
    console.log(resp);
    alert('Status:' + resp.status);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label>Message:</label>
          <input
            type="text"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}