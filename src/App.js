import './App.css';
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';
import axios from 'axios'; 
import Search from './components/user/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from '../src/context/github/GithubState'; 
import PropTypes from 'prop-types';
import User from './components/user/User';



const App = () => {

  
  const [repos, setRepos] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [alert, setAlert] = useState(null); 




// get user's repos 
const getUserRepos = async username => {
  setLoading(true); 
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_SECRET_ID}`);

  setRepos(res.data); 
  setLoading(false); 
}

 // show alert if the field is empty 
  const showAlert = ( msg, type ) =>{ 
   setAlert({ msg, type });

   setTimeout(() => setAlert(null), 2000);
  
  }



    return (

      <GithubState>
      <Router>
      <div className="App">
      <Navbar />
      <div className="container">

        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                <Search setAlert={showAlert} />
                <Users />
            </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUserRepos={getUserRepos} repos={repos} /> // ... spread operator - if we want to pass the whole props object to the component  
              )} />
              </Switch>

     
       
      </div>
      </div>
      </Router>
      </GithubState>
    );
  }

  App.propTypes = {
    searchUsers: PropTypes.func.isRequired, // makes it required
  }


export default App; 