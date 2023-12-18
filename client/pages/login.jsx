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
    this.handleDemoAccount = this.handleDemoAccount.bind(this);
  }

  handleChange(event) {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleDemoAccount(event) {
    event.preventDefault();
    fetch('/api/users/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'gotojapandemo@gmail.com',
          password: '0725'
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
        if (info.token && info.user) {
          this.props.onSignIn(info);
        }
        window.location.hash = '#';
        alert('Login successful!');
      }
      )
      .catch(error => {
        console.error('Error:', error);
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
        body: JSON.stringify(this.state)
      })
      .then(res => {
        if (!res.ok) {
          alert('Invalid email or password.');
        } else {
          return res.json();
        }

      })
      .then(info => {
        if (info.token && info.user) {
          this.props.onSignIn(info);
        }
        window.location.hash = '#';
        alert('Login successful!');
      }
      )
      .catch(error => {
        console.error('Error:', error);
      });

  }

  render() {
    return (

        <div className="container-fluid  login-container">
          <form onSubmit={this.handleSubmit}>
          <span className="navbar-brand logo">
            <a href='#'>GotoJapan</a>
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
        </form>
        <div className="button-container">
          <button onClick={this.handleDemoAccount} type="submit" className="demo">Demo Account</button>
        </div>
        <div className="line"></div>
        <div className="user"><a href="#signup">New Users</a></div>
      </div>
    );
  }
}
