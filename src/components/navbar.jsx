import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';
import { signOutUser } from '../utils/firebase/firebase.utils'; // Adjust the path based on your folder structure

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const location = useLocation();
    
    const isAuthPage = location.pathname === '/auth';

    return (
        <AppBar position="static" sx={{ bgcolor: '#000000', color: '#FFFFFF' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src={`${process.env.PUBLIC_URL}/heybooFav.jpg`} alt="Chatbot Logo" style={{ height: '40px', marginRight: '8px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "'Lobster Two', sans-serif;" }}>heybee</Typography>
                </Box>
                {!isAuthPage && (
                    <>
                        <Button component={Link} to="/" sx={{ color: '#FFFFFF', textTransform: 'none' }}>Home</Button>
                        <Button component={Link} to="/about" sx={{ color: '#FFFFFF', textTransform: 'none' }}>About</Button>
                    </>
                )}
                {currentUser ? (
                    <Button onClick={signOutUser} sx={{ color: '#FFFFFF', textTransform: 'none' }}>Sign Out</Button>
                ) : (
                    <Button component={Link} to="/auth" sx={{ color: '#FFFFFF', textTransform: 'none' }}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
