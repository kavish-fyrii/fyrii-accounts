import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../StyledComponents/Button';
import Form from '../StyledComponents/Form';
import TextField from '../StyledComponents/TextField';

const useStyles = makeStyles((theme) => ({
  link: {
    textAlign: 'left',
    fontSize: '16px',
    cursor: 'pointer',
    "&:hover": {
      textShadow: '0.3px 0.3px rgba(128, 128, 128, 0.4)',
    },
  },
  linkRight: {
    float: 'right',
  },
}));

function LoginField(props) {
  return (
    <TextField
      {...props}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      autoComplete={props.name.toLowerCase().split(' ').join('-')}
      name={props.name.toLowerCase().split(' ').join('-')}
      id={props.name.toLowerCase().split(' ').join('-')}
      label={props.name}
    />
  )
}

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginSuccess = () => {
    setLoading(false);
    window.location.replace("/");
  }

  const loginFailed = (err) => {
    console.error('loginFailed', err.message ? `${err.code} ${err.message}` : JSON.stringify(err));
    if (err.code === 'UserNotConfirmedException') {
      history.push(`/confirm`);
    } else {
      setLoading(false);
    }
  }

  return (<>
    <Form title="Login." narrowForm>
      <LoginField name="Username" onChange={(e) => { setUsername(e.target.value) }} />
      <LoginField name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
      <div>
        <div className={`${classes.link} ${classes.linkRight}`} onClick={() => { history.push(`/signup`); }}>Don't have an account? Sign Up</div>
        <div className={classes.link} onClick={() => { history.push(`/forgot-password`); }}>Forgot password?</div>
        <br />
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            FyriiAuthHelpers.login(username, password, loginSuccess, loginFailed);
          }}
        >
          Login
        </Button>
      </div>
    </Form>
  </>);
}

export default Login;
