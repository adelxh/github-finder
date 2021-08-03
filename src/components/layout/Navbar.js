import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
  
    
        return (
            <nav className="navbar bg-primary">
                <h1>
                  <i className="fab fa-github"/> {props.title}
                    </h1>

                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
        )
    
}

Navbar.defaultProps = {
    title: 'Github Finder', 
    icon: 'fab fa-github'
  };

  Navbar.propTypes = {
      title: PropTypes.string.isRequired, // makes the field required to fill 
      icon: PropTypes.string.isRequired // makes the field required to fill 
  };

export default Navbar
