import { Avatar } from '@mui/material'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import React from 'react'
import "./Sidebar.css"
import { Group } from '@mui/icons-material';


const groups = [
    {
        name: 'Luxembourg Expats',
        link: ''
    },
    {
        name: 'Luxembourg JavaScript',
        link: ''
    }
]
function Sidebar({ username, userTitle, visitorsNum, postViewersNum }) {
    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <div className="sidebar__info">
                    <img src="sidebar_banner.jpg" alt="" />
                    <Avatar src="avatar.jpg" />
                    <h2>{username}</h2>
                    <h4>{userTitle}</h4>
                </div>
                <div className="sidebar__stats">
                    <div className="sidebar__stat">
                        <p>Who's visited</p>
                        <p>{visitorsNum}</p>
                    </div>
                    <div className="sidebar__stat">
                        <p>Views on post</p>
                        <p>{postViewersNum}</p>
                    </div>
                </div>
            </div>
            <div className="sidebar__bottom">
                <h3>Groups</h3>
                <div className="sidebar__groups">
                    {groups.map(group => {
                        return (
                            <div className='sidebar__group'>
                                <Diversity3Icon />
                                <p>{group.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar