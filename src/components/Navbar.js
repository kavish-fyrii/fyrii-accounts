import React from 'react';
import { Link } from "react-router-dom";

import { AppBar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';
import { makeStyles } from '@material-ui/core/styles';

import Button from './StyledComponents/Button';
import { UserContext } from '../UserContext';
import logo from '../resources/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    padding: theme.spacing(1, 2),
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.secondary.light,
    color: '#333',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '50px',
  },
  menuButton: {
    color: 'rgba(0, 0, 0, .5)',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  homeButtonLink: {
    flexGrow: 1,
  },
  homeButton: {
    display: 'flex',
  },
  homeButtonImg: {
    width: '90px',
    height: '35px',
    paddingRight: '7px',
    paddingBottom: '2px',
  },
  navbarName: {
    marginTop: theme.spacing(0.5),
    textDecoration: 'none',
    color: '#333',
    "&:hover": {
      textDecoration: 'none',
      color: '#333333dd',
    },
  },
  navbarButtons: {
    display: 'flex',
  },
  navBarGreeting: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navBarGreetingText: {
    margin: theme.spacing(1.5, 2),
    fontSize: '1rem',
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const user = React.useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <div className={classes.toolbar}>
           {user.data ? <IconButton
            color="inherit"
            aria-label="open sidebar"
            edge="start"
            onClick={props.toggleSidebar}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton> : null}
          <Link to="/" className={classes.homeButtonLink}>
            <div className={classes.homeButton}>
              <img src={logo} className={classes.homeButtonImg} alt="Fyrii Logo"/>
              <Typography className={classes.navbarName} noWrap>
                Accounts
              </Typography>
            </div>
          </Link>
          <div className={classes.navbarButtons}>
            {user.data ? (
              <div className={classes.navBarGreeting}>
                <div className={classes.navBarGreetingText}>Welcome, {user.data.fullname.split(' ')[0]}!</div>
                <Link to="/login"><Button onClick={() => { FyriiAuthHelpers.signOutFyrii(); if (props.history) props.history.push('/login') }}>Sign Out</Button></Link>
              </div>
            ) : (
              <React.Fragment>
                <Link to="/login"><Button>Log In</Button></Link>
                <div style={{ width: '7px' }} />
                <Link to="/signup"><Button secondary>Sign Up</Button></Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default NavBar;
