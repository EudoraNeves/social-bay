import React from 'react'
import { useReducer } from 'react';
import { ReactDOM } from 'react';

import HomeIcon from '@mui/icons-material/Home'; //home
import GroupIcon from '@mui/icons-material/Group'; //networking
import SmsIcon from '@mui/icons-material/Sms'; //messaging
import NotificationsIcon from '@mui/icons-material/Notifications'; //notifications
import NavItem from './NavItem';


const navItems = [
    {
        icon: HomeIcon,
        name: 'Home',
        link: '/Home'
    },
    {
        icon: GroupIcon,
        name: 'Network',
        link: '/Dashboard'
    },
    {
        icon: SmsIcon,
        name: 'Messaging',
        link: '/Messaging'
    },
    {
        icon: NotificationsIcon,
        name: 'Notifications',
        link: '/Notifications'
    },
]
function Nav() {
    return (
        <div className='nav'>
            {navItems.map(item => {
                return <NavItem key={item.name} Icon={item.icon} name={item.name} />
            })}
            <NavItem name="Me" avatar="avatar.jpg" />
        </div>
    )
}

export default Nav