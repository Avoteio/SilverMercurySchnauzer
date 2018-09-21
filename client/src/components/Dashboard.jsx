import React from 'react';
import FeedItem from './FeedItem.jsx';
import NavBar from './NavBar.jsx';
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from './LoadingScreen.jsx';
import LiveFeed from './LiveFeed.jsx';
import Personality from './Personality.jsx';
import Sentiment from './Sentiment.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4, 5],
      authenticated: false,
      loading: true,
      hasMounted: false,
      authenticated: false
    };

    this.handleValidation = this.handleValidation.bind(this);
    this.populateFeed = this.populateFeed.bind(this);
    this.getUserTone = this.getUserTone.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    }, () => {
      this.handleValidation();
    });

    this.getUserTone();
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

  populateFeed() {
    // axios.get(`/api/home/updateTwitterFeed/${localStorage.getItem('userId')}`)
    //   .then((tweets) => {
    //     this.setState({
    //       items: tweets.data,
    //       loading: false
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('Error retrieving tweets for user: ', err);
    //   })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="dashboard">
          <LiveFeed />
          <div className="charts">
            <Personality />
            <Sentiment />
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