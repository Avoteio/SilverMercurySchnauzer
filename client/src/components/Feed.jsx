import React from 'react';
import ReactDOM from 'react-dom';
import FeedItem from './FeedItem.jsx';
import NavBar from './NavBar.jsx';
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from './LoadingScreen.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4, 5],
      authenticated: false,
      loading: true,
      hasMounted: false,
      authenticated: false
    }

    this.handleValidation = this.handleValidation.bind(this);
    this.populateFeed = this.populateFeed.bind(this);
    this.getPersonality = this.getPersonality.bind(this);
    this.getTone = this.getTone.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
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
          this.setState({
            authenticated: true,
          }, this.populateFeed);
        } else if (validationStatus.data === 'onlyNative') {
          this.props.history.push('/oauth');
        } else {
          this.props.history.push('/login');
        }
      })
  }

  populateFeed() {
    axios.get(`/api/home/updateTwitterFeed/${localStorage.getItem('userId')}`)
      .then((tweets) => {
        this.setState({
          items: tweets.data,
          loading: false
        });
      })
      .catch((err) => {
        console.log('Error retrieving tweets for user: ', err);
      })
  }

  getPersonality() {
    axios.post('/api/watson/getPersonality')
    .then((content)=>{
      console.log('post success!,',content)
    })
    .catch((error)=>{
      console.log('Post error was:',error)
    })
  }

  getTone() {
    axios.get('/api/watson/getTone')
    .then((content)=>{
      console.log('post success!,',content)
    })
    .catch((error)=>{
      console.log('Post error was:',error)
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen /> 
    } else {
      if (!this.state.authenticated) {
        return <Redirect to='/login' />
      } else {
        return (
          <div>
            <NavBar />
            <div onClick={this.getPersonality}>getPersonality</div>
            <div onClick={this.getTone}>getTone</div>

            <div className='social-media-posts-container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
              {this.state.items.map((tweet, i) => <FeedItem key={i} tweet={tweet} />)}
            </div>
          </div>
        );
      }
    }
  }
}

export default withRouter(Feed);