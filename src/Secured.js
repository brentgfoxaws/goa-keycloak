import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import axios from 'axios';

var token = null;

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      keycloak: null, 
      authenticated: false,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
      console.log('Token:' + keycloak.token)
      token = keycloak.token
      console.log('Token set...')
    })
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
    const { message } = this.state;
    axios.defaults.headers.common = {'authorizationToken': `${token}`} 
    {/*axios.defaults.headers.common = {'authorizationToken': 'broken-token'} */}
    try {
      const resp = await axios.post(
        'https://opjrzia27e.execute-api.us-west-2.amazonaws.com/prod',
        { key1: `${message}` }
      );
      alert('Status:' + resp.status);
    } catch (err)
    {
      alert('Error:' + err)
    }
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component.</p>
          <form onSubmit={this.handleSubmit}>
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
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;