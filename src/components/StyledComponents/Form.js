import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    marginBottom: '30px',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  narrowForm: {
    width: '500px',
  }
});

function Form(props) {
  const { classes, title, narrowForm, children } = props;

  return (<>
    <div className={classes.container}>
      <div className={`${classes.title} ${classes.form}`}><h2>{title}</h2></div>
      <FormControl className={`${classes.form} ${narrowForm ? classes.narrowForm : ''}`}>
        {children}
      </FormControl>
    </div>
  </>);
}


export default withStyles(styles)(Form);
