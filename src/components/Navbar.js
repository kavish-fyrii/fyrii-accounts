import React from 'react';
import { Link } from "react-router-dom";

import { AppBar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../UserContext';
import logo from '../resources/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'white',
    color: 'rgba(0, 0, 0, .5)',
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
  navbarName: {
    marginTop: theme.spacing(0.5),
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, .5)',
    "&:hover": {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, .5)',
    },
  },
  navbarButtons: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const user = React.useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={`navbar ${classes.navBar}`}>
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
              <img src={logo} className="logo" alt="Fyrii Logo"/>
              <Typography className={classes.navbarName} noWrap>
                Accounts
              </Typography>
            </div>
          </Link>
          <div className="navbar-buttons">
            {user.data ? (
              <div className={`${classes.navbarButtons} navbar-greeting`}>
                <span className="navbar-greeting-text">Welcome, {user.data.fullname.split(' ')[0]}!</span>
                <button
                  className="primary-button"
                  onClick={() => {
                    FyriiAuthHelpers.signOutFyrii();
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <React.Fragment>
                <Link to="/login"><button className="primary-button">Log In</button></Link>
                <div style={{ width: '7px' }} />
                <Link to="/signup"><button className="secondary-button">Sign Up</button></Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default NavBar;
