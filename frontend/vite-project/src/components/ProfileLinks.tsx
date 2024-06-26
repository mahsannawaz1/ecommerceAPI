import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileLinks = () => {
    return (
        <Stack>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >My Account</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Orders</Typography>
                </Box>
            </Link>
            
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Payment Cards</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Contact Details</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Address Book</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >My Reviews</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >My Favourites</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Communication Preferences</Typography>
                </Box>
            </Link>
            <Link to='/'>
                <Box marginBottom={1}>
                    <Typography
                    sx={{ cursor:'pointer',textTransform:'capitalize' }}
                    variant='body2'
                    component={'span'}
                    >Change Password</Typography>
                </Box>
            </Link>
        </Stack>
    )
}

export default ProfileLinks