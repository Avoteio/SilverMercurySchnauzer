import React, {Component} from 'react';
import WriteTweet from './WriteTweet.jsx';

class LiveFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="live-feed">
        <div className="feed">
          <h1>Live feed</h1>
        </div>
        <WriteTweet />
      </div>
    );
  }
}

export default LiveFeed;