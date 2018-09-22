import React from 'react';
import FeedItem from './FeedItem.jsx';
import NavBar from './NavBar.jsx';
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from './LoadingScreen.jsx';
import HeaderBar from './HeaderBar.jsx';
import LiveFeed from './LiveFeed.jsx';
import Personality from './Personality.jsx';
import Sentiment from './Sentiment.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      userTweets: [],
      selectedUserInfo: {},
      tone: null,
      personality: null
    };

    this.handleValidation = this.handleValidation.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getUserTone = this.getUserTone.bind(this);
    this.getUserPersonality = this.getUserPersonality.bind(this);
  }

  componentWillMount() {
    this.getUserTone();
    this.getUserPersonality();
  }

  componentDidMount() {
    this.getUserData();
    this.handleValidation();
  }

  getUserData() {
    axios.get(`/api/home/updateTwitterFeed/${localStorage.getItem('userId')}`)
    .then(({data}) => {
      if (data.length) {
        this.setState({
          userTweets: data,
          selectedUserInfo: data[0].user
        });
      }
    })
    .catch(err => console.log(`err from updateTwitterFeed`, err));
  }
  
  getUserTone(screenName) {
    axios.get(`/api/users/${localStorage.getItem('userId')}/getUserTone`, {
      params: {
        screenName: screenName
      }
    })
    .then(({data}) => {
      this.setState({
        tone: data
      });
    })
    .catch(console.log);
  }

  getUserPersonality(screenName) {
    axios.get(`/api/users/${localStorage.getItem('userId')}/getUserPersonality`, {
      params: {
        screenName: screenName
      }
    })
    .then(({data}) => {
      this.setState({
        personality: data
      });
    })
    .catch(console.log);
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

  render() {
    return (
      <div>
        <NavBar />
        <HeaderBar 
          user={this.state.selectedUserInfo}
          getUserTone={this.getUserTone}
          getUserPersonality={this.getUserPersonality}
        />
        <div className="dashboard">
          <LiveFeed />
          <div className="charts">
            {this.state.personality ? 
              <Personality 
                personality={this.state.personality}
              />
            :
              <LoadingScreen />
            }
            {this.state.tone ? 
              <Sentiment
                tone={this.state.tone}
              />
            :
              <LoadingScreen />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);