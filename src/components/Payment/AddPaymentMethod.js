import axios from 'axios';
import React from 'react';
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CardSection from './CardSection';
import { PAYMENT_API_PREFIX } from '../../constants'
import { UserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  cardButton: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    float: 'right',
    marginLeft: theme.spacing(1),
  },
}));

class CardForm extends React.Component {
  handleSubmit = async event => {
    const { elements, stripe, userData, onSavePaymentMethod } = this.props;
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const response = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (response.error) {
      console.log('Failed createPaymentMethod', response.error.message);
      return;
    }

    console.log('createPaymentMethod', response);
    axios.post(`${PAYMENT_API_PREFIX}/customer/paymentmethods/attach`, {
      paymentMethodId: response.paymentMethod.id,
      userId: userData.id,
    }).then(response => {
      console.log('Payment method attached succesfully!', response);
      onSavePaymentMethod(response.data.paymentMethod);
    }).catch(err => {
      console.log('Failed to attach payment method ', err.message);
      throw err;
    });
  };

  render() {
    const { classes, cancelClick } = this.props;

    return (
      <div>
        <CardSection />
        <br />
        <Button className={classes.cardButton} style={{ float: 'right' }} onClick={cancelClick}>Cancel</Button>
        <Button className={classes.cardButton} onClick={this.handleSubmit}>Save Payment Method</Button>
      </div>
    );
  }
}

export default function AddPaymentMethod(props) {
  const stripePromise = loadStripe('pk_test_51H1ZFFGBdDCZxCy57xvpnxUWGzmvJdfuC3biqyKCsil6dQPL36BEpxcW2IGfeKlMAa0liLYCvjab86rBEFbQ1eLQ00GQhbE1xk');
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [addMode, setAddMode] = React.useState();

  if (addMode) {
    return (
      <div className={classes.container}>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <CardForm
                classes={classes}
                stripe={stripe}
                elements={elements}
                userData={user.data}
                cancelClick={() => setAddMode(false)}
                onSavePaymentMethod={(method) => { setAddMode(false); props.onSavePaymentMethod(method); }}
              />
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }

  return <Button size="large" className={classes.cardButton} onClick={() => setAddMode(true)}>Add Payment Method</Button>
}
