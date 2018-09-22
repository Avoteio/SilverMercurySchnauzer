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