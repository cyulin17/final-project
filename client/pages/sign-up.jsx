import React from 'react';
export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
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

    const { firstname, lastname, email, password } = this.state;

    if (!firstname || !lastname || !email || !password) {
      alert('All fields are required.');
      return;
    }

    fetch('/api/users/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(user => {
        if (user) {
          alert('Welcome to GotoJapan!');
          window.location.hash = '#login';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  render() {
    // console.log(this.state);
    return (

        <div className="container-fluid signup-container">
          <span className="navbar-brand logo">
            <a href='#'>Welcome! GotoJapan</a>
          </span>
          <div>
          <form onSubmit={this.handleSubmit}>
          <div className="signup">
            <label htmlFor="firsname"></label>
            <input onChange={this.handleChange} value={this.state.firstname} type="text" placeholder= "Firstname" name="firstname" id="firstname" />
          </div>
            <div className="signup">
            <label htmlFor="lastname"></label>
              <input onChange={this.handleChange} value={this.state.lastname} type="text" placeholder="Lastname" name="lastname" id="lastname" />
          </div>
            <div className="signup">
            <label htmlFor="email"></label>
              <input onChange={this.handleChange} value={this.state.email} type="text" placeholder="Email" name="email" id="email" />
          </div>
            <div className="signup">
            <label htmlFor="password"></label>
              <input onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password" name="password" id="password" />
          </div>
          <div className="button-container signup">
            <button type="submit" className="submit">Sign Up</button>
          </div>
            <div className="line"></div>
            <div className="user"><a href="#login">Log In</a></div>
          </form>
          </div>
        </div>

    );
  }
}
