import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import {
  Grid, CircularProgress, Button, Typography, CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentIcon from '@material-ui/icons/Payment';

import { UserContext } from '../../UserContext';
import { PAYMENT_API_PREFIX } from '../../constants'
import visa from '../../resources/visa.png';
import mastercard from '../../resources/mastercard.png';
import discover from '../../resources/discover.png';

import AddPaymentMethod from './AddPaymentMethod';
import Card from '../StyledComponents/Card';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: '0 10%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 5%',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 2%',
    },
  },
  item: {
    padding: theme.spacing(0, 2),
    minHeight: '150px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  itemCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '160px',
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  visaLogo: {
    width: '160px',
    height: '100px',
    background: 'white',
  },
  mastercardLogo: {
    width: '160px',
    height: '100px',
    padding: theme.spacing(1, 3),
    background: 'white',
  },
  cardButtonContainer: {
    width: '100%',
  },
  cardButton: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    float: 'right',
    marginLeft: theme.spacing(1),
  },
}));

function PaymentMethod() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    axios.post(`${PAYMENT_API_PREFIX}/customer/paymentmethods/get`, {
      userId: user.data.id,
    })
    .then((res) => {
      console.log('Payment methods retrieved', res);
      setPaymentMethods(res.data.paymentMethods.data);
      setLoading(false);
    }).catch(err => {
      console.log('Failed to retrieve payment methods');
      setLoading(false);
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const detachMethod = (id, index) => {
    axios.post(`${PAYMENT_API_PREFIX}/customer/paymentmethods/detach`, {
      paymentMethodId: id,
    }).then(response => {
      console.log('Payment method detached succesfully!', response);
      const paymentMethodsCopy = paymentMethods.slice();
      paymentMethodsCopy.splice(index, 1);
      setPaymentMethods(paymentMethodsCopy);
    }).catch(err => {
      console.log('Failed to detach payment method ', err.message);
      throw err;
    });
  }

  if (loading) return <CircularProgress />

  return (
    <Grid container spacing={4} className={classes.container}>
      {paymentMethods.map((method, i) => {
        let methodLogo;
        switch (method.card.brand) {
          case 'visa':
            methodLogo = <img src={visa} className={classes.visaLogo} alt="Visa Logo"/>;
            break;
          case 'mastercard':
            methodLogo = <img src={mastercard} className={classes.mastercardLogo} alt="Mastercard Logo"/>;
            break;
          case 'discover':
            methodLogo = <img src={discover} className={classes.visaLogo} alt="Discover Logo"/>;
            break;
          default:
            methodLogo = <PaymentIcon />;
            break;
        }

        return <Grid item xs={12} key={i}>
          <Card
            transparent
            content={
              <div className={classes.item}>
                <div className={classes.logoContainer}>{methodLogo}</div>
                <CardContent>
                  <Typography variant="h6">
                    **** **** **** {method.card.last4}
                  </Typography>
                  <Typography color="textSecondary">
                    {method.card.exp_month}/{method.card.exp_year}
                  </Typography>
                </ CardContent>
              </div>
            }
            actions={<div className={classes.cardButtonContainer}>
              <Button onClick={() => detachMethod(method.id, i)} className={classes.cardButton}>Delete</Button>
            </div>}
          />
        </Grid>;
      })}
      <Grid item xs={12}>
        <Card
          transparent
          content={
            <div className={`${classes.item} ${classes.itemCenter}`}>
              <AddPaymentMethod onSavePaymentMethod={paymentMethod => setPaymentMethods(paymentMethods.concat([paymentMethod]))} />
            </div>
          }
        />
      </Grid>
    </Grid>
  );
}

export default PaymentMethod;
