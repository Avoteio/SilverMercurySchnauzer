import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { TextField, Button, Icon } from '@material-ui/core';
import LoadingScreen from './LoadingScreen.jsx';
import { Redirect, withRouter } from "react-router-dom";


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: true,
    }

    this.setUser = this.setUser.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
      loading: false
    });
  }

  setUser(e) {
    this.setState({
      username: e.target.value
    })
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSignUp() {
    axios.post('api/signup', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      console.log('New user added! response from server-->', response.data.message);
      this.resetForm();
      this.props.history.push('/feed');
    })
    .catch(err => {
      console.log('unable to add user to DB: ', err);
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    if (this.state.loading) {
      return (<LoadingScreen />);
    } else {
      return (
        <div className='signup-container'>
          <div className='signup-form-container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1>Sign up</h1>

            <form noValidate autoComplete='off' className='signup-form'>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <TextField
                  fullWidth
                  required
                  id='username'
                  label='Enter a username'
                  placeholder='Username'
                  margin='normal'
                  value={this.state.username}
                  onChange={this.setUser}
                >
                </TextField>
              </div>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px' }}>
                <TextField
                  fullWidth
                  required
                  id='password'
                  label='Enter a password'
                  placeholder='password'
                  margin='normal'
                  type='password'
                  value={this.state.password}
                  onChange={this.setPassword}
                >
                </TextField>
              </div>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  className='signup-btn'
                  color='primary'
                  onClick={this.handleSignUp}
                >
                  Sign up
          </Button>
              </div>
            </form>
            <h3 onClick={(e) => {
              e.preventDefault();
              this.props.history.push('/login');
            }}>Or sign in <a href='#'>here</a></h3>
          </div>
        </div>
      );
    } 
  }
  
}


export default withRouter(Signup);