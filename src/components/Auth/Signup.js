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
}));

function SignupField(props) {
  return (
    <TextField
      {...props}
      variant="outlined"
      margin="normal"
      fullWidth
      autoComplete={props.name.toLowerCase().split(' ').join('-')}
      name={props.name.toLowerCase().split(' ').join('-')}
      id={props.name.toLowerCase().split(' ').join('-')}
      label={props.name}
    />
  )
}

function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const signupSuccess = () => {
    setLoading(false);
    history.push('/confirm');
  };

  const signupFailed = (err) => {
    console.error('signupFailed', err.message ? `${err.code} ${err.message}` : JSON.stringify(err));
    setLoading(false);
  };

  const goToLogin = () => { history.push(`/login`); };
  const handleSignup = () => {
    if (password !== password2) return;
    setLoading(true);
    FyriiAuthHelpers.signup({ name, jobTitle, email, phone, username, password }, signupSuccess, signupFailed);
  };

  return (<>
    <Form title="Sign up." narrowForm>
      <SignupField name="Name" required onChange={(e) => { setName(e.target.value) }} />
      <SignupField name="Email" required onChange={(e) => { setEmail(e.target.value) }} />
      <SignupField name="Phone" onChange={(e) => { setPhone(e.target.value) }} />
      <SignupField name="Job Title" onChange={(e) => { setJobTitle(e.target.value) }} />
      <SignupField name="Username" required onChange={(e) => { setUsername(e.target.value) }} />
      <SignupField name="Password" type="password" required onChange={(e) => { setPassword(e.target.value) }} />
      <SignupField name="Confirm Password" type="password" required onChange={(e) => { setPassword2(e.target.value) }} />
      <div>
        <div className={classes.link} onClick={goToLogin} onKeyDown={(e) => { if (e.keyCode === 13) goToLogin(); }}>Already have an account? Sign in</div>
        <br />
        <Button
          loading={loading}
          onKeyDown={(e) => { if (e.keyCode === 13) handleSignup(); }}
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </div>
    </Form>
  </>);
}

export default Signup;
