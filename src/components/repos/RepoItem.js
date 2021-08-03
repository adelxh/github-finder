import React from 'react'


export const RepoItem = ({repo}) => {
    return (
        <div className="card">
            <a href={repo.html_url} target="_blank">{repo.name}</a>

        </div>
    )
}

export default RepoItem