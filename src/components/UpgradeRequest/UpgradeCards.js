import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: '200px',
    color: '#444',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardTitle: {
    minHeight: '55px',
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
    minHeight: '48px',
    marginTop: theme.spacing(-1),
    background: theme.palette.secondary.light,
  },
  cardButton: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

function UpgradeCard(props) {
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

function UpgradeCards(props) {
  const { userRoles, userRequests, upgradeClick } = props;

  const isAdmin = userRoles.find((role) => role.roleName === 'admin' && role.parentId === 'fyrii');

  const isContributor = userRoles.find((role) => role.roleName === 'contributor' && role.parentId === 'fyrii');
  const contributorRequestPending = userRequests.find((req) => req.type === 'contributor' && req.requestStatus === 'pending');
  const isExpertAgent = userRoles.find((role) => role.roleName === 'expert-agent' && role.parentId === 'fyrii');
  const expertAgentRequestPending = userRequests.find((req) => req.type === 'expert-agent' && req.requestStatus === 'pending');
  const isExpertAdvisor = userRoles.find((role) => role.roleName === 'expert-advisor' && role.parentId === 'fyrii');
  const expertAdvisorRequestPending = userRequests.find((req) => req.type === 'expert-advisor' && req.requestStatus === 'pending');

  return (
    <Grid container>
      <UpgradeCard
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
      <UpgradeCard
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
      <UpgradeCard
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
  );
}

export default UpgradeCards;
