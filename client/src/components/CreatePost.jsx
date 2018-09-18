import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Button, Icon } from '@material-ui/core';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { DateTimePicker } from 'material-ui-pickers';
import axios from 'axios';
import NavBar from './NavBar.jsx';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      post: '',
      url: '',
      date: null,
      showPicker: false
    }

    this.handleSavePost = this.handleSavePost.bind(this)
    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setCaption = this.setCaption.bind(this);
    this.setPost = this.setPost.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }

  handlePublishClick() {
    axios.post('/api/createPost/publish', {
      caption: this.state.caption,
      post: this.state.post,
      url: this.state.url,
      userId: localStorage.userId
    })
      .then(response => {
        console.log('Post successfully published on social media', response.data);
        //reset client fields once user successfully publishes post on social media
        this.setState({
          caption: '',
          post: '',
          url: '',
          date: null,
          showPicker: false
        }, this.props.history.push('/feed'));
      })
      .catch(err => {
        console.log('unable to send post to FB/Twitter');
      })
  }

  handleSavePost(e) {
    e.preventDefault();
    axios.post('/api/createPost/save', {
      caption: this.state.caption,
      post: this.state.post,
      url: this.state.url,
      date: this.state.date,
      userId: localStorage.userId
    })
      .then(response => {
        console.log('Post successfully saved to DB', response.data);
        //reset client fields once user successfully saves post on DB
        this.setState({
          caption: '',
          post: '',
          url: '',
          date: null,
          showPicker: false
        }, this.props.history.push('/feed'));
      })
      .catch(err => {
        console.log('unable to save post to DB');
      })
  }

  handleDateChange(newDate) {
    this.setState({
      date: newDate
    });
  }

  setCaption(e) {
    this.setState({
      caption: e.target.value
    })
  }
  setPost(e) {
    this.setState({
      post: e.target.value
    })
  }
  setUrl(e) {
    this.setState({
      url: e.target.value
    })
  }


  render() {
    return (
      <div>
        <NavBar />
        <div className='createPost-container'>
          <div className='createPost-form-container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1>Create Post</h1>

            <form noValidate autoComplete='off' className='createPost-form'>
              <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', display: 'block' }}>
                <TextField
                  value={this.state.caption}
                  onChange={this.setCaption}
                  fullWidth
                  required
                  id='caption'
                  label='Enter a caption'
                  placeholder='Caption'
                  margin='normal'
                >
                </TextField>
                <TextField
                  value={this.state.post}
                  onChange={this.setPost}
                  fullWidth
                  required
                  multiline
                  id='content'
                  label='Enter content'
                  margin='normal'
                  rows={5}
                >
                </TextField>
                <TextField
                  value={this.state.url}
                  onChange={this.setUrl}
                  fullWidth
                  required
                  id='picture-url'
                  label='Enter a picture URL'
                  placeholder='URL'
                  margin='normal'
                >
                </TextField>
                <div style={{ width: '100%' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      disablePast
                      required
                      placeholder='Date'
                      label="Publish Date"
                      showTodayButton
                      style={{ width: '300px' }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <Button
                  onClick={this.handleSavePost}
                  variant="contained"
                  size="medium"
                  className='save-btn'
                  color='primary'
                  style={{ margin: '20px' }}
                > Save </Button>
                <Button
                  onClick={this.handlePublishClick}
                  variant="contained"
                  size="medium"
                  className='publish-btn'
                  color='primary'
                  style={{ margin: '20px' }}
                > Publish </Button>
              </div>
              <div>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;