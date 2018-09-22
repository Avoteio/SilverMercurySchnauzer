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
      selectedUserInfo: {}
    };

    this.handleValidation = this.handleValidation.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.handleValidation();
    this.getUserData();
  }

  getUserData() {
    axios.get(`/api/home/updateTwitterFeed/${localStorage.getItem('userId')}`)
    .then(({data}) => {
      if (data.length) {
        this.setState({
          loading: false,
          userTweets: data,
          selectedUserInfo: data[0].user
        });
      }
    })
    .catch(err => console.log(`err from updateTwitterFeed`, err));
  }

  getUserTone() {
    axios.get(`/api/users/${localStorage.getItem('userId')}/getUserTone`)
    .then(({data}) => {
      console.log('talking to user tweets for those sweet, dulcet tones!',data)
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
        <HeaderBar user={this.state.selectedUserInfo}/>
        <div className="dashboard">
          <LiveFeed />
          <div className="charts">
            <Personality tweets={this.state.userTweets} userInfo={this.state.selectedUserInfo}/>
            <Sentiment tweets={this.state.userTweets} userInfo={this.state.selectedUserInfo}/>
          </div>
        </div>
      </div>
    )
    // if (this.state.loading) {
    //   return <LoadingScreen /> 
    // } else {
    //   if (!this.state.authenticated) {
    //     return <Redirect to='/login' />
    //   } else {
    //     return (
    //       <div>
    //         <NavBar />
    //         {/* <div className='social-media-posts-container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
    //           {this.state.items.map((tweet, i) => <FeedItem key={i} tweet={tweet} />)}
    //         </div> */}
    //       </div>
    //     );
    //   }
    // }
  }
}

export default withRouter(Dashboard);