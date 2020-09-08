import React from 'react';
import { Route, useRouteMatch, Switch, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import UpgradeAccount from './UpgradeRequest/UpgradeAccount';
import Button from './StyledComponents/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 4),
  },
  title: {
    textAlign: 'left',
    margin: theme.spacing(2, 0),
  },
}));

function AccountHome() {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (<div className={classes.container}>
    <h2 className={classes.title}>Manage your Account</h2>
    <br />
    <Link to={`${path}/upgrade`}><Button>Upgrade your Account</Button></Link>
  </div>)
}

function Account(props) {
  const { path } = useRouteMatch();

  console.log('Account', path)

  return (
    <div>
      <Switch>
        <Route exact path={path} component={AccountHome} />
        <Route exact path={`${path}/upgrade`} component={UpgradeAccount} />
      </Switch>
    </div>
  );
}

export default Account;
