import React, { useState } from "react";
import { TextField, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';

import Spinner from '../../resources/spinner.svg';

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
  }

  const signupFailed = (err) => {
    console.error('signupFailed', err.message ? `${err.code} ${err.message}` : JSON.stringify(err));
    setLoading(false);
  }

  return (<>
    <div className="app-form-header"><h1>Sign up.</h1></div>
    <div className="app-form login-form">
      <FormControl>
        <SignupField name="Name" required onChange={(e) => { setName(e.target.value) }} />
        <SignupField name="Email" required onChange={(e) => { setEmail(e.target.value) }} />
        <SignupField name="Phone" onChange={(e) => { setPhone(e.target.value) }} />
        <SignupField name="Job Title" onChange={(e) => { setJobTitle(e.target.value) }} />
        <SignupField name="Username" required onChange={(e) => { setUsername(e.target.value) }} />
        <SignupField name="Password" type="password" required onChange={(e) => { setPassword(e.target.value) }} />
        <SignupField name="Confirm Password" type="password" required onChange={(e) => { setPassword2(e.target.value) }} />
        <div>
          <div className='login-form-link login-form-link-right' onClick={() => { history.push(`/login`); }}>Already have an account? Sign in</div>
          <br />
          <button
            className={`primary-button ${loading ? 'primary-button-no-padding' : ''}`}
            onClick={() => {
              if (password !== password2) return;
              setLoading(true);
              FyriiAuthHelpers.signup({ name, jobTitle, email, phone, username, password }, signupSuccess, signupFailed);
            }}
          >
            {loading ? (<img width={68} height={32} className="loading-spinner" src={Spinner} alt="loading" />) : 'Sign up'}
          </button>
        </div>
      </FormControl>
    </div>
  </>);
}

export default Signup;
