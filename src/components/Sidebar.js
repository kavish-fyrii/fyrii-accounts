import React from 'react';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const sidebarWidth = 260;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.up('md')]: {
      width: sidebarWidth,
      flexShrink: 0,
    },
  },
  sidebarPaper: {
    width: sidebarWidth,
    background: theme.palette.secondary.main,
  },
  sidebarContainer: {
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  sectionsList: {
    paddingTop: theme.spacing(2),
  },
  sectionItem: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 4),
  },
  navbarButtons: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();

  const sideBarContent = (<>
    <div className={classes.sidebarContainer}>
      <List className={classes.sectionsList}>
        {Object.entries(props.sidebarSections).map(([key, section]) => (
          <ListItem className={classes.sectionItem} button key={section.name} onClick={() => props.setSelectedSection(key)}>
            <ListItemIcon>{section.icon}</ListItemIcon>
            <ListItemText primary={section.name} />
          </ListItem>
        ))}
      </List>
      <div className={classes.navbarButtons}>
        <hr />
        <br />
        <div className="navbar-greeting">
          <button
            className="primary-button"
            onClick={() => {
              FyriiAuthHelpers.signOutFyrii();
            }}
          >
            Sign Out
          </button>
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
          classes={{ paper: classes.sidebarPaper }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <br />
          {sideBarContent}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{ paper: classes.sidebarPaper }}
          variant="permanent"
          open
        >
          <Toolbar />
          {sideBarContent}
        </Drawer>
      </Hidden>
    </nav>
    );
}

export default Sidebar;