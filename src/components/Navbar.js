import React from 'react';
import { Link } from 'react-router-dom';
import marvelLogo from '../marvel.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <Link to='/'>
              <img src={marvelLogo} height='45' alt='' />
            </Link>
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'>
              <Typography color='white' variant='h6'>
                The Marvel API
              </Typography>
            </Link>
            <Typography
              variant='body2'
              color='white'
              style={{ fontStyle: 'italic', fontSize: '12px' }}
            >
              Data provided by Marvel. © 2014 Marvel
            </Typography>
          </Typography>

          <Link to='/'>
            <Typography
              color='white'
              variant='link'
              component='div'
              marginRight='20px'
              sx={{ flexGrow: 1 }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/about'>
            <Typography
              color='white'
              variant='link'
              component='div'
              marginRight='10px'
              sx={{ flexGrow: 1 }}
            >
              About
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
