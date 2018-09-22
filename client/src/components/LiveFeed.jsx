import React, {Component} from 'react';
import Tweet from 'react-tweet';

const LiveFeed = (props) => (
  <div className="live-feed">
    <div className="feed">
      {props.tweets.map(t => <Tweet key={t.id} data={t} linkProps={{target: '_blank', rel: 'noreferrer'}}/>)}
    </div>
  </div>
);

export default LiveFeed;

// class LiveFeed extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       tweets: []
//     }
//   }

<<<<<<< HEAD
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
=======
//   render() {
//     return (
//       <div className="live-feed">
//         <div className="feed">
//           {this.props.tweets.map(t => <Tweet key={t.id} data={t} linkProps={{target: '_blank', rel: 'noreferrer'}}/>)}
//         </div>
//       </div>
//     );
//   }
// }
>>>>>>> d5bd5729fb41bca9ad988d924b3989504249f434

// export default LiveFeed;