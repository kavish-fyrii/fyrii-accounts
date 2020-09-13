import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  textInput: {
    background: 'white',
    padding: theme.spacing(2),
  },
});

function Field(props) {
  const { classes, children } = props;

  return (
    <TextField {...props} className={classes.root} inputProps={{ className: classes.textInput }} tabIndex={0}>
      {children}
    </TextField>
  );
}


export default withStyles(styles)(Field);
