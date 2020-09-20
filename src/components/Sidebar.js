import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/LockOpen';
import PaymentIcon from '@material-ui/icons/Payment';

import Button from './StyledComponents/Button';
import logo from '../resources/logo.png';

const sidebarWidth = 260;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.up('md')]: {
      width: sidebarWidth,
      flexShrink: 0,
    },
  },
  paper: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    width: sidebarWidth,
    background: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      background: '#EEF1FA',
    },
  },
  homeButton: {
    background: theme.palette.secondary.light,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    display: 'flex',
    padding: theme.spacing(2),
  },
  homeButtonImg: {
    width: '90px',
    height: '30px',
    paddingRight: '7px',
    paddingBottom: '2px',
  },
  navbarName: {
    marginTop: theme.spacing(0.5),
    color: 'rgba(0, 0, 0, .5)',
  },
  listContainer: {
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  list: {
    paddingTop: theme.spacing(2),
  },
  item: {
    cursor: 'pointer',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 4),
  },
  link: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#3069B9',
    "&:hover": {
      color: theme.palette.primary.main,
      transition: 'color 0.25s ease',
    },
  },
  selected: {
    background: 'rgba(130, 122, 230, 0.07)',
  },
  child: {
    paddingLeft: theme.spacing(5),
  },
  icon: {
    minWidth: '30px',
    color: '#3069B9',
  },
  selectedText: {
    color: theme.palette.primary.dark,
  },
  navbarButtons: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const sidebarSections = {
  home: { name: 'Home', icon: <HomeIcon fontSize="small" /> },
  profile: { name: 'Profile', icon: <PersonIcon fontSize="small" /> },
  account: { name: 'Account', icon: <LockIcon fontSize="small" /> },
  upgrade: { name: 'Upgrade Account', icon: <LockIcon fontSize="small" />, parent: 'account' },
  payments: { name: 'Payments', icon: <PaymentIcon fontSize="small" /> },
};

const Sidebar = (props) => {
  const classes = useStyles();
  let location = useLocation();

  const sideBarContent = (<>
    <div className={classes.listContainer}>
      <List className={classes.list}>
        {Object.entries(sidebarSections).map(([key, section]) => {
          let routeMatch = location.pathname === `/${key}` || (location.pathname === '/' && key === 'home');
          if (section.parent) {
            const childRouteMatch = location.pathname === `/${section.parent}/${key}`;
            if (!childRouteMatch) {
              return null;
            }
            routeMatch = true;
          }

          return (
            <ListItem key={key} className={`${classes.item} ${routeMatch ? classes.selected : ''} ${section.parent ? classes.child : ''}`}>
              <Link className={classes.link} to={key === 'home' ? `/` : `/${key}`} onClick={props.isSidebarOpen ? props.toggleSidebar : null}>
                <ListItemIcon className={`${classes.icon} ${routeMatch ? classes.selectedText : ''}`}>{section.icon}</ListItemIcon>
                <ListItemText className={`${routeMatch ? classes.selectedText : ''}`} primary={section.name} />
              </Link>
            </ListItem>
          )
        })}
      </List>
      <div className={classes.navbarButtons}>
        <hr />
        <br />
        <div>
          <Link to="/login"><Button onClick={() => { FyriiAuthHelpers.signOutFyrii(); }}>Sign Out</Button></Link>
        </div>
      </div>
    </div>
  </>);

  return (
    <nav className={classes.sidebar}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.isSidebarOpen}
          onClose={props.toggleSidebar}
          classes={{ paper: classes.paper }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.homeButton}>
            <img src={logo} className={classes.homeButtonImg} alt="Fyrii Logo"/>
            <Typography className={classes.navbarName} noWrap>
              Accounts
            </Typography>
          </div>
          {sideBarContent}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{ paper: classes.paper }}
          variant="permanent"
          open
        >
          <Toolbar />
          <br />
          {sideBarContent}
        </Drawer>
      </Hidden>
    </nav>
    );
}

export default Sidebar;