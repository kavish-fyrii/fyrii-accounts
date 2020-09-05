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

function Confirm() {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [code, setCode] = useState();

  const confirmSuccess = () => {
    setLoading(false);
    history.push('/');
  }

  const confirmFailed = (err) => {
    console.error('confirmFailed', err.message ? `${err.code} ${err.message}` : JSON.stringify(err));
    setLoading(false);
    if (err.code === 'NotAuthorizedException') {
      history.push('/');
    }
  }

  return (<>
    <div className="app-form-header"><h1>Confirm User.</h1></div>
    <div className="app-form login-form">
      <FormControl>
        <LoginField name="Username" onChange={(e) => { setUsername(e.target.value) }} />
        <LoginField name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
        <LoginField name="Confirmation Code" onChange={(e) => { setCode(e.target.value) }} />
        <div>
          <br />
          <button
            className="primary-button"
            onClick={() => {
              setLoading(true);
              FyriiAuthHelpers.confirmUser(username, password, code, confirmSuccess, confirmFailed);
            }}
          >
            {loading ? (<img width={68} height={32} className="loading-spinner" src={Spinner} alt="loading" />) : 'Confirm'}
          </button>
        </div>
      </FormControl>
    </div>
  </>);
}

export default Confirm;
