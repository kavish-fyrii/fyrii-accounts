import React from "react";
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';
import Accounts from './components/Accounts';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1600px',
  },
  section: {
    paddingLeft: '260px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));

function Container(props) {
  const classes = useStyles();

  const { path } = useRouteMatch();

  return (
    <div className={classes.container}>
      <Sidebar
        isSidebarOpen={props.isSidebarOpen}
        toggleSidebar={props.toggleSidebar}
      />
      <div className={classes.section}>
        <Switch>
          <Route exact path={path} component={Home} />
          <Route exact path={`${path}profile`} component={Profile} />
          <Route exact path={`${path}account`} component={Accounts} />
        </Switch>
      </div>
    </div>
  );
}

export default Container;
