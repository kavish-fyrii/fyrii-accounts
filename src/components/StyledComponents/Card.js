import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';

const styles = (theme) => ({
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
  transparent: {
    background: 'transparent',
    minHeight: '150px',
  }
});

function AppCard(props) {
  const { classes, title, content, actions, transparent } = props;
  const classNames = [classes.card];
  if (transparent) classNames.push(classes.transparent);

  return (
    <Card className={classNames.join(' ')}>
      {title ? <CardContent className={classes.cardTitle}>
        {title}
      </CardContent> : null}
      <CardContent className={classes.cardContent}>
        {content}
      </CardContent>
      {actions ? <CardActions className={classes.cardAction}>
        {actions}
      </CardActions> : null}
    </Card>
  );
}


export default withStyles(styles)(AppCard);
