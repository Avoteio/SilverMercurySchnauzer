import React, {Component} from 'react';
import axios from 'axios';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleClick() {
    this.props.getUserToneAndPersonality(this.state.input);
  }
  
  render() {
    const {user} = this.props;
    return (
      <div className="header">
        <div>
          <img className="header-image" src={user.profile_image_url} alt=""/>
        </div>
        <div className="header-screen-name">
          <input className="header-screen-name" value={this.state.input} placeholder={user.screen_name} onChange={this.handleChange}></input>
        </div>
        <div className="results-button">
          <button onClick={this.handleClick}>Results</button>
        </div>
      </div>
    )
  }
}

export default HeaderBar;