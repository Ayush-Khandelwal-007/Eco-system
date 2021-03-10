import { Avatar } from '@material-ui/core'
import header from "./Header.module.css"
import React from 'react'


function HeaderNav() {
    return (
        <div className={header.nav}>
            {/* <Notification/> */}
            <Avatar/>
        </div>
    )
}

export default HeaderNav
