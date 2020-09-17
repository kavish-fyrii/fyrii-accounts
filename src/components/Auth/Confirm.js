import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import Button from '../StyledComponents/Button';
import Form from '../StyledComponents/Form';
import TextField from '../StyledComponents/TextField';

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
    window.location.replace('/');
  }

  const confirmFailed = (err) => {
    console.error('confirmFailed', err.message ? `${err.code} ${err.message}` : JSON.stringify(err));
    setLoading(false);
    if (err.code === 'NotAuthorizedException') {
      history.push('/');
    }
  }

  return (<>
    <Form title="Confirm User." narrowForm>
      <LoginField name="Username" onChange={(e) => { setUsername(e.target.value) }} />
      <LoginField name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
      <LoginField name="Confirmation Code" onChange={(e) => { setCode(e.target.value) }} />
      <div>
        <br />
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            FyriiAuthHelpers.confirmUser(username, password, code, confirmSuccess, confirmFailed);
          }}
        >
          Confirm
        </Button>
      </div>
    </Form>
  </>);
}

export default Confirm;
