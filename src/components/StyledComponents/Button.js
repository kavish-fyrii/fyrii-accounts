import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Spinner from '../../resources/spinner.svg';

const styles = (theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 3px 5px 2px #6c71d455',
    height: 42,
    textDecoration: 'none',
    padding: '10px 20px',
    "&:hover": {
      background: theme.palette.primary.dark,
      transition: 'background 0.25s ease',
    },
    "&:focus": {
      outline: '0',
    },
  },
  secondary: {
    background: 'white',
    color: theme.palette.primary.main,
    boxShadow: '2px 3px 5px 2px #6c71d473',
    "&:hover": {
      outline: '0',
      background: '#f9f9f9',
      transition: 'background 0.25s ease',
    },
  },
  loading: {
    padding: '5px',
  }
});

function AppButton(props) {
  const { classes, children, loading, secondary, onClick } = props;
  const classNames = [classes.root];
  if (loading) classNames.push(classes.loading);
  if (secondary) classNames.push(classes.secondary);

  const spinner = (<img width={68} height={32} src={Spinner} alt="loading" />)

  return <Button className={classNames.join(' ')} onClick={onClick}>{loading ? spinner : children}</Button>;
}


export default withStyles(styles)(AppButton);