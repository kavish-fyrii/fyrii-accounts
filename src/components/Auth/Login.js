import React, { useState, useEffect } from "react";
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
    "&:focus": {
      textShadow: '0.3px 0.3px rgba(128, 128, 128, 0.4)',
      textDecoration: 'underline',
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
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error)
      setError(false);
  }, [username, password ] // eslint-disable-line react-hooks/exhaustive-deps
  );

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

  const goToSignup = () => { history.push(`/signup`); };
  const goToForgotPassword = () => { history.push(`/forgot-password`); };
  const handleLogin = () => {
    if (!username.trim().length || !password.trim().length) {
       setError(true);
       return;
    }

    setLoading(true);
    FyriiAuthHelpers.login(username, password, loginSuccess, loginFailed);
  };
  const keyboardHandleLogin = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (<>
    <Form title="Login." narrowForm>
      <LoginField name="Username" error={error && !username.trim().length} onChange={(e) => { setUsername(e.target.value) }} onKeyDown={keyboardHandleLogin} />
      <LoginField name="Password" error={error && !password.trim().length} type="password" onChange={(e) => { setPassword(e.target.value) }} onKeyDown={keyboardHandleLogin} />
      <div>
        <div className={`${classes.link} ${classes.linkRight}`} tabIndex={0} onClick={goToSignup} onKeyDown={(e) => { if (e.key === 'Enter') goToSignup(); }}>Don't have an account? Sign Up</div>
        <div className={classes.link} tabIndex={0} onClick={goToForgotPassword} onKeyDown={(e) => { if (e.key === 'Enter') goToForgotPassword(); }}>Forgot password?</div>
        <br />
        <Button
          loading={loading}
          tabIndex={0}
          onKeyDown={keyboardHandleLogin}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </Form>
  </>);
}

export default Login;
