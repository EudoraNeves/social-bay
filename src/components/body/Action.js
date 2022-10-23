import React from 'react'

function Action({ Icon, action }) {
    return (
        <div className='action'>
            <Icon />
            <span>{action}</span>
        </div>
    )
}

export default Action