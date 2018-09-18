import React from 'react';
import ReactDOM from 'react-dom';
import ExandIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Collapse, IconButton, Typography } from '@material-ui/core';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.tweet,
      expanded: false
    };
    console.log('tweet: ', this.state.item);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div className='post-container'>
        <Card style={{ backgroundColor: '#3f51b5', marginRight: 'auto', marginLeft: 'auto', marginTop: '5px', marginBottom: '5px', width: '80%' }}>
          <CardHeader
            avatar={
              <Avatar src={this.state.item.user.profile_image_url}>
                P
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={`@${this.state.item.user.screen_name}`}
            subheader={this.state.item.created_at}
            
          />
          <Typography paragraph variant='body2' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px', width: '80%' }}>
            {this.state.item.text}
          </Typography>
          <br />
          <Typography paragraph variant='body2' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px', width: '80%' }}>
            {'Retweets: ' + this.state.item.retweet_count + ' Favorites: ' + this.state.item.favorite_count}
          </Typography>

          {/* <CardMedia
            style={{height: '100px', width: '100px', marginLeft: '30px'}}
            image="https://thumbs.dreamstime.com/z/retro-bicycle-nature-background-autumn-49743173.jpg"
          /> */}
          <CardContent>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton
              onClick={this.handleExpandClick}
            >
              <ExandIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* <Typography paragraph>
               Post Content will go here. Item number: 
                {this.state.item}
              </Typography> */}
              {/* {'Retweets: ' + this.state.item.retweet_count + ' Favorites: ' + this.state.item.favorite_count} */}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );  
  }
  
};

export default FeedItem;