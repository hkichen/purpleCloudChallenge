import React, { Component } from 'react';
import axios from 'axios';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName : "",
      userPic : "",
      userCommits: []
    };
  }
  
  componentDidMount() {
    axios.get('https://api.github.com/users/hkichen/events')
      .then(res => {
        var searchedName = res.data[0].actor.display_login;
        var searchedPic = res.data[0].actor.avatar_url;
        this.setState({ 
          userName : searchedName,
          userPic : searchedPic 
        })

        var justCommits = [];
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          const event = data[i];
          const commits = event.payload.commits;
          if (commits) {
            for (var j = 0; j < commits.length; j++) {
              const commit = commits[j];
              justCommits.push(commit);
              // console.log(commit);
            }
          }
        }
        console.log(justCommits);
    })
  }

  render() {
    return (
      <div>
        <div> Hello World!</div>
        <h2>User Name: {this.state.userName}</h2>
        <img alt="userPic" src={this.state.userPic} />


      </div>
    )
  }
};

export default UserData;