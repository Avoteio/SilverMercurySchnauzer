import React, {Component} from 'react';
import WriteTweet from './WriteTweet.jsx';
import LoadingScreen from './LoadingScreen.jsx';
// import FeedItem from './FeedItem.jsx';
import Tweet from 'react-tweet';
import axios from 'axios';

class LiveFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${localStorage.getItem('userId')}/feed`)
    .then(({data}) => {
      this.setState({
        tweets: data,
        isLoading: false
      });
    })
    .catch(console.log);
  }

  render() {
    return (
      <div className="live-feed">
        <div className="feed">
          {this.state.isLoading ? 
            <LoadingScreen />
          :
            this.state.tweets.map(t => <Tweet key={t.id} data={t} linkProps={{target: '_blank', rel: 'noreferrer'}}/>)
          }
        </div>
        <WriteTweet />
      </div>
    );
  }
}

export default LiveFeed;