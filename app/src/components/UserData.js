import React, { Component } from 'react';
import axios from 'axios';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName : "",
      userPic : "",
      userCommits: [],
      pullEvent: 0,
      watchEvent: 0,
      pullRequestEvent: 0,
      createEvent:0,
      publicEvent: 0

    };
  }
  
  componentDidMount() {
    axios.get('https://api.github.com/users/hkichen/events')
      .then(res => {
        //getting the user name and pic
        var searchedName = res.data[0].actor.display_login;
        var searchedPic = res.data[0].actor.avatar_url;
        this.setState({ 
          userName : searchedName,
          userPic : searchedPic 
        })

        //getting the commits
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
        //console.log(justCommits);
        let just3 = [];
        just3.push(justCommits[0])
        just3.push(justCommits[1])
        just3.push(justCommits[2])
        //console.log(just3)
        this.setState({userCommits:just3})

        //getting all events 
        //console.log(data)
        var events = []
        data.forEach(function(event) {
          // console.log(event.type)
          events.push(event.type)
        })
        
        events.sort();
        console.log(events);

        //counting event types
        var current = null;
        var cnt = 0;
        for (var i = 0; i <= events.length; i++) {
          if (events[i] !== current) {
            if (cnt > 0) {
              console.log(current + ' occured ' + cnt + ' time(s)');
            }
            current = events[i];
            cnt = 1;
          } else {
              cnt++;
          }
      }
    })
  }

  render() {
    return (
      <div>
        <div> GitHub Api Challenge</div>
        <div className="searchBar">
          <input placeholder="enter a username" />
          <button>Search</button>
        </div>
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