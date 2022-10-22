import React from 'react'
import { Avatar } from '@mui/material';

function NavItem({avatar, Icon, name, link}) {
  return (
    <div className='navItem'>
        {avatar && <Avatar className="navItem__icon" src={avatar} />}
        {Icon && <Icon className="navItem__icon" />}
        <div className="navItem__name">{name}</div>
    </div>
  )
}

export default NavItem