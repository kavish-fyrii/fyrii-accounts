import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  CircularProgress,
  Collapse,
} from '@material-ui/core';

import {
  Alert,
} from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../../UserContext';
import { USER_API_PREFIX } from '../../constants';
import Button from '../StyledComponents/Button';

import UpgradeCards from './UpgradeCards';
import UpgradeRequestForm from './UpgradeRequestForm';
import PreviousRequests from './PreviousRequests';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 4),
  },
  title: {
    textAlign: 'left',
    margin: theme.spacing(2, 0, 4, 0),
  },
  backButton: {
    float: 'right',
    marginBottom: theme.spacing(2),
  },
  subTitle: {
    color: '#666',
    margin: theme.spacing(2, 0),
  },
  successMessage: {
    color: 'green',
  },
}));

function UpgradeAccount() {
  const formRef = useRef(null)
  const classes = useStyles();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [userRoles, setUserRoles] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showPrevReqs, setShowPrevReqs] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchData (silent) {
    setLoading(!silent && true);

    try {
      const roleResponse = await axios.get(`${USER_API_PREFIX}/users/${user.data.id}/roles`);
      setUserRoles(roleResponse.data);
      const requestResponse = await axios.get(`${USER_API_PREFIX}/users/${user.data.id}/upgradeRequests`);
      setUserRequests(requestResponse.data.Items);
      setType(null);
      setLoading(false);
    } catch(err) {
      console.log('error', err)
      setLoading(false);
    }
  }

  const upgradeClick = (title, type) => {
    setTitle(title);
    setType(type);
    setTimeout(() => {
      window.scrollTo(0, formRef?.current?.offsetTop - 50);
    }, 250);
  }

  const upgradeSuccess = () => {
    setType(null);
    setSuccess(true);
    fetchData(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  const togglePreviousRequests = () => {
    setShowPrevReqs(!showPrevReqs);
  }

  if (loading) return <CircularProgress />;

  const isAdmin = userRoles.find((role) => role.roleName === 'admin' && role.parentId === 'fyrii');

  return (<div className={classes.container}>
    <Link className={classes.backButton} to={`/account`}><Button>Back to Account</Button></Link>

    <h2 className={classes.title}>Upgrade Account</h2>
    <p className={classes.subTitle}>
      Upgrading your account to Contributors or Expert Agents gives you access to important features,
      such as providing and selling content on the Fyrii Content Bazaar, or becoming part of an extensive
      network of sales and marketing experts under Fyrii's umbrella
    </p>

    {isAdmin ? <><Alert severity="info">You are recognized as an admin in the Fyrii system, which means you already have all the roles below</Alert><br /></> : null}

    <UpgradeCards userRoles={userRoles} userRequests={userRequests} upgradeClick={upgradeClick} />
    <br />
    <div ref={formRef}>
      {success ? (<div className={classes.successMessage}>Request submitted successfully!</div>) : null}
      {type ? <><hr />
        <UpgradeRequestForm title={title} type={type}
          onSuccess={upgradeSuccess}
        /></> : null}
    </div>
    <div>
      <hr />
      <Button secondary={showPrevReqs} onClick={togglePreviousRequests}>{showPrevReqs ? 'Hide' : 'Show'} Previous Requests</Button>
      <Collapse in={showPrevReqs}>
        <br />
        <PreviousRequests userRequests={userRequests} />
      </Collapse>
    </div>
  </div>);
}

export default UpgradeAccount;
