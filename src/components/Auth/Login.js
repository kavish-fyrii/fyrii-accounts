import React, { useState } from "react";
import { TextField, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import Spinner from '../../resources/spinner.svg';

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
    if (err.code === "UserNotConfirmedException") {
      history.push(`/confirm`);
    } else {
      setLoading(false);
    }
  }

  return (<>
    <div className="app-form-header"><h1>Login.</h1></div>
    <div className="app-form login-form">
      <FormControl>
        <LoginField name="Username" onChange={(e) => { setUsername(e.target.value) }} />
        <LoginField name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
        <div>
          <div className='login-form-link login-form-link-right' onClick={() => { history.push(`/signup`); }}>Don't have an account? Sign Up</div>
          <div className='login-form-link' onClick={() => { history.push(`/forgot-password`); }}>Forgot password?</div>
          <br />
          <button
            className={`primary-button ${loading ? 'primary-button-no-padding' : ''}`}
            onClick={() => {
              setLoading(true);
              FyriiAuthHelpers.login(username, password, loginSuccess, loginFailed);
            }}
          >
            {loading ? (<img width={68} height={32} className="loading-spinner" src={Spinner} alt="loading" />) : 'Login'}
          </button>
        </div>
      </FormControl>
    </div>
  </>);
}

export default Login;
