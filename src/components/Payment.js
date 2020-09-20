import React from "react";
import { Route, useRouteMatch, Switch, Link } from 'react-router-dom';

import {
  Button,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Card from './StyledComponents/Card';
import MyButton from './StyledComponents/Button';
import PaymentMethod from './Payment/PaymentMethod';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 15%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10%',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 2%',
    },
  },
  title: {
    textAlign: 'left',
    margin: theme.spacing(2, 0),
  },
  subTitle: {
    color: '#666',
    margin: theme.spacing(2, 0),
  },
  cardButton: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
  }
}));

function PaymentCard(props) {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <Grid  xs={12} item>
      <Card
        title={props.title}
        content={props.content}
        actions={<Link to={`${path}/${props.link}`}><Button className={classes.cardButton}>{props.buttonText}</Button></Link>}
      />
    </Grid>
  )
}

function PaymentHome() {
  const classes = useStyles();

  return (<div className={classes.container}>
    <h2 className={classes.title}>Payments & Transactions</h2>
    <p className={classes.subTitle}>
      Whether you want to buy products or content from the Fyrii Marketplace or Bazaar, or sell,
      you can manage your payment options with Fyrii here.
    </p>
    <Grid container>
      <PaymentCard
        title="To Pay"
        content={(<div>
          <p>You can save payment info for more secure payments online, for purchasing products and content in the Fyrii Marketplace and Bazaar.</p>
          <p>Powered by Stripe</p>
        </div>)}
        buttonText="Manage Payment Methods"
        link="manage"
      />
      <PaymentCard
        title="To Get Paid"
        content={(<div>
          <p>
            As product owner in the Marketplace, or a Content Provider in the Bazaar,
            you can save external accounts here to recieve payments securely.
          </p>
          <p>Powered by Stripe</p>
        </div>)}
        buttonText="Manage External Accounts"
        link="external-accounts"
      />
      <div>
      <hr />
      <MyButton>Show Previous Transactions</MyButton>
    </div>
    </Grid>
  </div>);
}

function Payment() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path} component={PaymentHome} />
        <Route exact path={`${path}/manage`} component={PaymentMethod} />
      </Switch>
    </div>
  );
}

export default Payment;
