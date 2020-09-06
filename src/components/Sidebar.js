import React from 'react';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from './StyledComponents/Button';

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
    margin: theme.spacing(1.5, 0),
    padding: theme.spacing(0.5, 4),
    "&:hover": {
      color: theme.palette.primary.dark,
      transition: 'color 0.25s ease',
    },
  },
  selected: {
    background: 'rgba(122, 122, 122, 0.1)',
  },
  icon: {
    minWidth: '36px',
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
    <div className={classes.listContainer}>
      <List className={classes.list}>
        {Object.entries(props.sidebarSections).map(([key, section]) => (
          <ListItem
            className={`${classes.item} ${props.selectedSection === key ? classes.selected : ''}`}
            key={section.name}
            onClick={() => props.setSelectedSection(key)}
          >
            <ListItemIcon className={classes.icon}>{section.icon}</ListItemIcon>
            <ListItemText primary={section.name} />
          </ListItem>
        ))}
      </List>
      <div className={classes.navbarButtons}>
        <hr />
        <br />
        <div>
          <Button onClick={() => { FyriiAuthHelpers.signOutFyrii(); }}>Sign Out</Button>
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
          <br />
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
          {sideBarContent}
        </Drawer>
      </Hidden>
    </nav>
    );
}

export default Sidebar;