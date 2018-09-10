import React, { Component } from 'react';
import axios from 'axios';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName : "",
      userPic : "",
      userCommits: [],
      userEvents:[]
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

        let just3 = [];
        just3.push(justCommits[0])
        just3.push(justCommits[1])
        just3.push(justCommits[2])
        this.setState({userCommits:just3})

        //getting all events 
        var events = []
        data.forEach(function(event) {
          events.push(event.type)
        })
        
        events.sort();

        //counting event types
        var counts = {};
        events.forEach(function(x) { 
          counts[x] = (counts[x] || 0)+1; 
        });
        
        var eventCounts = []
        eventCounts.push(counts)
        this.setState({userEvents: eventCounts})
          
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
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Create Events</th>
              <th scope="col">Push Events</th>
              <th scope="col">Pull Request Events</th>
              <th scope="col">Public Events</th>
              <th scope="col">Watch Events</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userEvents.map((userEvent, index) => {
              return (
                <tr key={index}>
                  <td>{userEvent.CreateEvent}</td>
                  <td>{userEvent.PushEvent}</td>
                  <td>{userEvent.PullRequestEvent}</td>
                  <td>{userEvent.PublicEvent}</td>
                  <td>{userEvent.WatchEvent}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      
      </div>
    )
  }
};

export default UserData;