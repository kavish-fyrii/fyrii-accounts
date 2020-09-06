import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../UserContext';

const useStyles = makeStyles((theme) => ({
  element: {
    margin: '20px 15%',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 10%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '20px 2%',
    },
  },
  title: {
    textAlign: 'left',
  },
  subTitle: {
    color: '#666',
    marginBottom: 0,
  },
  card: {
    minHeight: '200px',
    color: '#444',
  },
  cardTitle: {
    height: '55px',
    fontSize: '1.3rem',
    marginTop: theme.spacing(-1),
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2), 0px 2px 3px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
  },
  cardContent: {
    minHeight: '100px',
    padding: theme.spacing(3, 2),
  },
  cardAction: {
    height: '48px',
    marginTop: theme.spacing(-1),
    background: theme.palette.secondary.light,
  },
  cardButton: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  }
}));

function HomeCard(props) {
  const classes = useStyles();

  return (
    <Grid  xs={12} item>
      <Card className={`${classes.card} ${classes.element}`}>
        <CardContent className={classes.cardTitle}>
          {props.title}
        </CardContent>
        <CardContent className={classes.cardContent}>
          {props.content}
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Button className={classes.cardButton}>{props.buttonText}</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

function Home() {
  const classes = useStyles();
  const user = React.useContext(UserContext);

  return (<>
    <h2 className={`${classes.title} ${classes.element}`}>Welcome, {user.data.fullname.split(' ')[0]}!</h2>
    <p className={`${classes.subTitle} ${classes.element}`}>Manage your info, role, and payment details here to make Fyrii work better for you</p>
    <Grid container>
      <HomeCard
        title="Your Organizations"
        content={(<div>
          <p>Manage all your organizations in one place.</p>
          <p>
            Create organizations to invite more users (or request to be part of an existing organization!)
             and start adding products to the Fyrii Marketplace.
          </p>
        </div>)}
        buttonText="Manage your Organizations"
      />
      <HomeCard
        title="Upgrade Requests"
        content={(<div>
          <p>Fyrii allows its users to upgrade their roles to be more than just customers.</p>
          <p>
            Upgrading your account to Contributors or Expert Agents gives you access to important features,
             such as providing and selling content on the Fyrii Content Bazaar, or becoming part of an extensive
             network of sales and marketing experts under Fyrii's umbrella.
          </p>
        </div>)}
        buttonText="Upgrade your account"
      />
      <HomeCard
        title="Account Settings"
        content={(<div>
          <p>You’re never more than a tap away from your data and settings.</p>
          <p>Update your email or password on the go (will require email confirmation).</p>
        </div>)}
        buttonText="Go to settings"
      />
      <HomeCard
        title="Payments and Transactions"
        content={(<div>
          <p>
            Whether you want to buy products or content from the Fyrii Marketplace or Bazaar, or sell,
            you can manage your payment options with Fyrii here.
          </p>
          <p>
            Customers can add their credit card or other methods to pay, while sellers can add their
            external accounts to receive payments for their products. Of course, you can do both
          </p>
          <p>
            You can also view past purchases and other transactions made by your account
          </p>
        </div>)}
        buttonText="Manage Payment Information"
      />
    </Grid>
  </>);
}

export default Home;
