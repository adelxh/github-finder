import './App.css';
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';

import Search from './components/user/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from '../src/context/github/GithubState'; 
import AlertState from '../src/context/alert/AlertState'; 
import PropTypes from 'prop-types';
import User from './components/user/User';



const App = () => {
  const [alert, setAlert] = useState(null); 

    return (

      <GithubState>
        <AlertState>
      <Router>
      <div className="App">
      <Navbar />
      <div className="container">

        <Alert />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                <Search  />
                <Users />
            </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
              </Switch>

     
       
      </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  }

  App.propTypes = {
    searchUsers: PropTypes.func.isRequired, // makes it required
  }


export default App; 