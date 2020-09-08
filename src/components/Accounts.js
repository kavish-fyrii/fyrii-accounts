import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  CircularProgress,
  Collapse,
} from '@material-ui/core';

import {
  Alert,
} from "@material-ui/lab";

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../UserContext';
import { USER_API_PREFIX } from "../constants";
import UpgradeRequest from "./UpgradeRequest";
import PreviousRequests from "./PreviousRequests";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 4),
  },
  title: {
    textAlign: 'left',
    margin: theme.spacing(2, 0),
  },
  subTitle: {
    color: '#666',
    margin: theme.spacing(2, 0),
  },
  card: {
    minHeight: '200px',
    color: '#444',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  },
  successMessage: {
    color: 'green',
  },
}));

function AccountsCard(props) {
  const classes = useStyles();

  return (
    <Grid lg={4} md={6} sm={12} item>
      <Card className={classes.card}>
        <CardContent className={classes.cardTitle}>
          {props.title}
        </CardContent>
        <CardContent className={classes.cardContent}>
          {props.content}
        </CardContent>
        <CardActions className={classes.cardAction}>
          {props.disabled
            ? <Button className={classes.cardButton} disabled>You already have this role</Button>
            : (props.pending
                ? <Button className={classes.cardButton} disabled>Upgrade Request Pending</Button>
                : <Button className={classes.cardButton} onClick={() => { props.upgradeClick(props.title, props.type) }}>Request upgrade</Button>)}
        </CardActions>
      </Card>
    </Grid>
  )
}

function Accounts() {
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

  const togglePreviousRequests = () => {
    setShowPrevReqs(!showPrevReqs);
  }

  if (loading) return <CircularProgress />;

  const isAdmin = userRoles.find((role) => role.roleName === 'admin' && role.parentId === 'fyrii');

  const isContributor = userRoles.find((role) => role.roleName === 'contributor' && role.parentId === 'fyrii');
  const contributorRequestPending = userRequests.find((req) => req.type === 'contributor' && req.requestStatus === 'pending');
  const isExpertAgent = userRoles.find((role) => role.roleName === 'expert-agent' && role.parentId === 'fyrii');
  const expertAgentRequestPending = userRequests.find((req) => req.type === 'expert-agent' && req.requestStatus === 'pending');
  const isExpertAdvisor = userRoles.find((role) => role.roleName === 'expert-advisor' && role.parentId === 'fyrii');
  const expertAdvisorRequestPending = userRequests.find((req) => req.type === 'expert-advisor' && req.requestStatus === 'pending');

  return (<div className={classes.container}>
    <h2 className={classes.title}>Manage your Account</h2>
    <p className={classes.subTitle}>
      Upgrading your account to Contributors or Expert Agents gives you access to important features,
      such as providing and selling content on the Fyrii Content Bazaar, or becoming part of an extensive
      network of sales and marketing experts under Fyrii's umbrella
    </p>
    {isAdmin ? <><Alert severity="info">You are recognized as an admin in the Fyrii system, which means you already have all the roles below</Alert><br /></> : null}
    <Grid container>
      <AccountsCard
        title="Bazaar Content Provider"
        content={(<div>
          <p>
            This role allows you to provide and sell content on the Fyrii Content Bazaar.
          </p>
        </div>)}
        buttonText="Request upgrade"
        type="contributor"
        upgradeClick={upgradeClick}
        disabled={isAdmin || isContributor}
        pending={contributorRequestPending}
      />
      <AccountsCard
        title="Marketplace Expert Agent"
        content={(<div>
          <p>
            This role allows you to help customers make the perfect choice when buying products from the Fyrii Marketplace.
            You also earn fat commissions.
          </p>
        </div>)}
        buttonText="Upgrade your account"
        type="expert-agent"
        upgradeClick={upgradeClick}
        disabled={isAdmin || isExpertAgent}
        pending={expertAgentRequestPending}
      />
      <AccountsCard
        title="Expert Advisor"
        content={(<div>
          <p>
            Advise people on stuff that you know a lot about. I don't know
          </p>
        </div>)}
        buttonText="Go to settings"
        type="expert-advisor"
        upgradeClick={upgradeClick}
        disabled={isAdmin || isExpertAdvisor}
        pending={expertAdvisorRequestPending}
      />
    </Grid>
    <br />
    <div ref={formRef}>
      {success ? (<div className={classes.successMessage}>Request submitted successfully!</div>) : null}
      {type ? <><hr />
        <UpgradeRequest
          title={title}
          type={type}
          onSuccess={() => {
            setType(null);
            setSuccess(true);
            fetchData(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }}
        /></> : null}
    </div>
    <div>
      <hr />
      <Button variant="contained" onClick={togglePreviousRequests}>See Previous Requests</Button>
      <Collapse in={showPrevReqs}>
        <br />
        <PreviousRequests userRequests={userRequests} />
      </Collapse>
    </div>
  </div>);
}

export default Accounts;
