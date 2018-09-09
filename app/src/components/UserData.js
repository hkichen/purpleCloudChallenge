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
        data.forEach(function(event) {
          const commits = event.payload.commits;
          if (commits) {
            commits.forEach(function(commit) {
              justCommits.push(commit);
            })
          }
        })
        console.log(justCommits);
        var just3 = [];
        just3.push(justCommits[0])
        just3.push(justCommits[1])
        just3.push(justCommits[2])
        console.log(just3)
        this.setState({userCommits:just3})
    })
  }

  render() {
    return (
      <div>
        <div> GitHub Api Challenge</div>
        <h2>User Name: {this.state.userName}</h2>
        <img alt="userPic" src={this.state.userPic} />
        <ul>
          <h3>Latest commits</h3>
          {this.state.userCommits.map((userCommit, index) =>(
            <li key={index}>
              Sha: {userCommit.sha} <br/>
              Message: {userCommit.message} <br/>
              Url: {userCommit.url}</li>
          ))}
        </ul>

      </div>
    )
  }
};

export default UserData;