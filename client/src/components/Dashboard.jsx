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
    this.getUserToneAndPersonality = this.getUserToneAndPersonality.bind(this);
  }

  componentWillMount() {
    this.getUserToneAndPersonality();
  }

  componentDidMount() {
    this.getUserData();
    this.handleValidation();
  }

  getUserData(screenName) {
    axios.get(`/api/home/updateTwitterFeed/${localStorage.getItem('userId')}`, {
      params: {
        screenName: screenName
      }
    })
    .then(({data}) => {
      console.log('SCREEN NAME DATA:', data);
      this.setState({
        userTweets: data,
        selectedUserInfo: data[0].user
      });
    })
    .catch(err => console.log(`err from updateTwitterFeed`, err));
  }
  
  getUserToneAndPersonality (screenName) {
    this.setState({
      loading: true
    })
    axios.get(`/api/users/${localStorage.getItem('userId')}/getUserToneAndPersonality`, {
      params: {
        screenName: screenName
      }
    })
    .then(({data}) => {
      this.setState({
        loading: false,
        personality: data.personality,
        tone: data.tone
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
          getUserToneAndPersonality={this.getUserToneAndPersonality}
          getUserData={this.getUserData}
        />
        <div className="dashboard">
          <LiveFeed tweets={this.state.userTweets}/>
          <div className="charts">
            {!this.state.loading ? 
              <div>
                <Personality 
                  personality={this.state.personality}
                />
                <Sentiment
                  tone={this.state.tone}
                />
              </div>
            :
              <div>
                <LoadingScreen /> 
              </div>             
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);