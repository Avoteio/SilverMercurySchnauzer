import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Oauth from './components/Oauth.jsx';
import Dashboard from './components/Dashboard.jsx';
import Feed from './components/Feed.jsx';
import CreatePost from './components/CreatePost.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [1, 2, 3, 4, 5],
      token: null,
      hasMounted: false,
      authStatus: false,
      loading: false
    }

    this.handleValidation = this.handleValidation.bind(this);
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
        this.setState({
          authStatus: validationStatus.data,
          loading: false
        })
      })
      .catch((err) => {
        console.log('error retrieving user auth status: ', err);
      })
  }

  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/feed' component={Dashboard} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/oauth' component={Oauth} />
          <Route exact path='/createpost' component={CreatePost} />
          <Redirect to='/' />
        </Switch>

      { this.state.loading ? <LoadingScreen /> : 
          this.state.authStatus === 'fullyAuthenticated' ? <Redirect to='/feed' /> :
            this.state.authStatus === 'onlyNative' ? <Redirect to='/oauth' /> :
            <Redirect to='/login' />
      }
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>), document.getElementById('app'));
