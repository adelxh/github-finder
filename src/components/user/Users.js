import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'; 
import './User.css'
import GithubContext from '../../context/github/githubContext'; 


 const Users = () => {
     const githubContext = useContext(GithubContext); 
     const { users, loading } = githubContext; 
    
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

const userStyle ={
    display: 'grid', 
    gridTemplateColumns: 'repeat(3,1fr)', 
    gridGap: '1rem'
}
export default Users
