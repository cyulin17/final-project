import React from 'react';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/users/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(res => {
        if (!res.ok) {
          alert('Invalid email or password.');
        } else {
          return res.json();
        }

      })
      .then(info => {
        localStorage.setItem('token', info.token);
        this.props.signIn(info);
        location.hash = '#map';
        alert('Login successfully!');
      }
      )
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container-fluid login-container">
          <span className="navbar-brand logo">
            GotoJapan
          </span>
        <div className="email">
        <label htmlFor="email"></label>
        <input onChange={this.handleChange} value={this.state.email} type="text" name="email" placeholder="email" id="email" />
        </div>
        <div className="password">
        <label htmlFor="password"></label>
        <input onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="password" id="password" />
        </div>
        <div className="button-container">
        <button type="submit" className="submit">Log In</button>
        </div>
        <div className="line"></div>
        <div className="user"><a href="#signup">New Users</a></div>
        </div>
      </form>
    );
  }
}
