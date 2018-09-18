import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Button, Icon } from '@material-ui/core'
import axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";
import LoadingScreen from './LoadingScreen.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: '',
      loginPassword: '',
      authenticated: false,
      loading: true,
      hasMounted: false
    }

    this.handleValidation = this.handleValidation.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.setloginName = this.setloginName.bind(this);
    this.setloginPassword = this.setloginPassword.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasMounted: true
    }, () => {
      this.handleValidation();
    });
  }

  handleValidation() {
    axios.post('/validateuser', { 
      nativeToken: localStorage.getItem('token'), 
      userId: localStorage.getItem('userId') 
    })
    .then((validationStatus) => {
      if (validationStatus.data === 'fullyAuthenticated') {
        this.props.history.push('/feed');
      } else if (validationStatus.data === 'onlyNative') {
        this.props.history.push('/oauth');
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    })
  }

  setloginName(e) {
    this.setState({
      loginName: e.target.value
    })
  }

  setloginPassword(e) {
    this.setState({
      loginPassword: e.target.value
    })
  }

  handleLogin() {
    axios.post('api/login', {
      username: this.state.loginName,
      password: this.state.loginPassword
    })
      .then(response => {
        if (response.data.message !== 'Wrong Password') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          this.handleValidation();
        } else {
          alert('Wrong Password');
          this.resetForm();
        }
      })
      .catch(err => {
        console.log('error logging in: ', err);
      })
  }

  resetForm() {
    this.setState({
      loginName: '',
      loginPassword: ''
    });
  }

  render() {
    if (this.state.loading) {
      return ( <LoadingScreen /> );
    } else {
      return (
        <div className='login-container'>
          <div className='login-form-container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1>Login</h1>

            <form noValidate autoComplete='off' className='login-form' >
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <TextField
                  fullWidth
                  required
                  id='username'
                  label='Enter a username'
                  placeholder='Username'
                  margin='normal'
                  value={this.state.loginName}
                  onChange={this.setloginName}
                >
                </TextField>
              </div>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px' }}>
                <TextField
                  fullWidth
                  required
                  type='password'
                  id='password'
                  label='Enter a password'
                  placeholder='password'
                  margin='normal'
                  value={this.state.loginPassword}
                  onChange={this.setloginPassword}
                >
                </TextField>
              </div>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  className='login-btn'
                  color='primary'
                  onClick={this.handleLogin}
                  formAction='submit'
                >
                  Login
            </Button>
              </div>
            </form>
            <h3 onClick={(e) => {
              e.preventDefault();
              this.props.history.push('/signup');
            }}>Or create an account <a href='#'>here</a></h3>
          </div>
        </div>
      );
    }
  }
}
  


export default withRouter(Login);