import Link from 'next/link'
import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'

import { signIn, signOut, useSession } from 'next-auth/react'

const Profile: React.FC = () => {
    const [profileAnchorEl, setProfileAnchorEl] = React.useState<HTMLElement | null>(null)
    const { data: session, status } = useSession();

    const handleProfileOpen = (evt: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(evt.currentTarget)
    const handleProfileClose = () => setProfileAnchorEl(null)

    return (<>
        <div style={{ display: 'flex' }}>
            <Button sx={{ color: 'white' }} onClick={() => status === 'unauthenticated' ? signIn() : signOut()}>
                {status === 'unauthenticated' ? "Sign In" : "Sign Out"}
            </Button>
            <IconButton onClick={handleProfileOpen}>
                {session?.user?.image && <Avatar src={session.user.image} sx={{ marginLeft: 2 }} />}
            </IconButton>
        </div>

        <Menu
            id='profile-menu'
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClick={handleProfileClose}
            onClose={handleProfileClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Button href='/mypage'>Your Profile</Button>
            </MenuItem>
        </Menu>
    </>)
}

export default Profile;