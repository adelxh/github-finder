import React, { Fragment, Component } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login); 
        this.props.getUserRepos(this.props.match.params.login); 
    }

    render() {

        const { 
            name, 
            avatar_url, 
            location, 
            company,
            bio, 
            blog, 
            login, 
            html_url, 
            followers, 
            following,
            public_repos, 
            public_gists, 
            hireable

         } = this.props.user; 

         const { loading } = this.props; 

         if (loading) {
             <Spinner />
         }
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">Back to Search</Link>
                Hireable: { '' }
                {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }

                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{width: '150px'}} />
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div>
                        {bio && (
                        <Fragment>
                            <h3>{name}'s Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                        
                        )}
                        {!bio && (
                            <Fragment>
                                <h3>There is no bio for user: {name}</h3>
                            </Fragment>
                        )}
                        <a href={html_url} target="_blank" className="btn btn-dark my-1">Website</a>
                        
                        <ul>
                            <li>
                            {login && <Fragment>
                            <strong>Username: </strong> {login}
                            </Fragment>}
                            </li>
                            <li>
                            {company && <Fragment>
                            <strong>Company: </strong> {company}
                            </Fragment>}
                            </li>
                                

                        </ul>
                    </div>
                </div>

                <div className="card text-center">
                    <div className="badge badge-primary">
                        Followers: {followers}
                    </div>
                    <div className="badge badge-success">
                        Following: {following}
                    </div>
                    <div className="badge badge-light">
                        Public Reps: {public_repos}
                    </div>
                    <div className="badge badge-dark">
                        Public Gists: {public_gists}
                    </div>
                </div>
                
                <Repos repos={this.props.repos} />
            </Fragment>

                            
                       
                        
        )
    }
}

export default User
