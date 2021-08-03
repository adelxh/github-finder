import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';
import axios from 'axios'; 
import Search from './components/user/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import PropTypes from 'prop-types';
import User from './components/user/User';



class App extends React.Component {
state = {
  users: [], 
  user: {}, 
  repos: [], 
  loading: false,
  alert: null
};

static propTypes = {
  searchUsers: PropTypes.func.isRequired, // makes it required
}
  

 searchUsers = async text => {
this.setState({ loading: true });
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_SECRET_ID}`);

   this.setState({ users: res.data.items, loading: false }); 
    
 }

 // clear users from state 
 clearUsers = () => this.setState({ users: [], loading: false }); 


//  get individual github user 
getUser = async username => {
  this.setState({ loading: true }); 
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_SECRET_ID}`);

  this.setState({ user: res.data, loading: false }); 
}

// get user's repos 
getUserRepos = async username => {
  this.setState({ loading: true }); 
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_SECRET_ID}`);

  this.setState({ repos: res.data, loading: false }); 
}

 // show alert if the field is empty 
 setAlert = ( msg, type ) =>{ 
   this.setState({ alert: { msg, type }}) 

   setTimeout(() => this.setState({ alert: null }), 2000);
  
  }

  render() {

    return (
      <Router>
      <div className="App">
      <Navbar />
      <div className="container">

        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                <Users users={this.state.users}/>
            </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading} /> // ... spread operator - if we want to pass the whole props object to the component  
              )} />
              </Switch>

     
       
      </div>
      </div>
      </Router>
    );
  }
}

export default App; 