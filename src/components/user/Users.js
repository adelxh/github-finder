import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'; 
import PropTypes from 'prop-types'
import './User.css'


 const Users = ({ users, loading }) => {
    
    if (loading) {
        return <Spinner />; // load the spinner gif if data isnt compiled and displayed
    } else {
        return (
            <div style={userStyle} className="media">
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
 
      
    
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}
const userStyle ={
    display: 'grid', 
    gridTemplateColumns: 'repeat(3,1fr)', 
    gridGap: '1rem'
}
export default Users
