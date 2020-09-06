import axios from 'axios';
import React, { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../UserContext';
import { USER_API_PREFIX } from '../constants';

import Button from './StyledComponents/Button';
import Form from './StyledComponents/Form';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1, 0),
  },
  textInput: {
    background: 'white',
    padding: theme.spacing(2),
  },
  addressLabel: {
    fontSize: '22px',
  },
  message: {
    margin: theme.spacing(2, 0),
    fontSize: '1.2rem',
  },
  errorMessage: {
    color: 'red',
  },
  successMessage: {
    color: 'green',
  },
}));

function ProfileField(props) {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      className={classes.textField}
      error={props.required && props.error && (!props.defaultValue || props.defaultValue.trim().length === 0)}
      inputProps={{ className: classes.textInput }}
      autoComplete={props.name.toLowerCase().split(' ').join('-')}
      name={props.name.toLowerCase().split(' ').join('-')}
      variant="outlined"
      fullWidth
      id={props.name.toLowerCase().split(' ').join('-')}
      label={props.name}
    />
  )
}

function Profile() {
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [name, setName] = useState(user.data.fullname?.trim());
  const [jobTitle, setJobTitle] = useState(user.data.jobtitle?.trim());
  const [about, setAbout] = useState(user.data.about?.trim());
  const [email] = useState(user.data.email?.trim());
  const [phone, setPhone] = useState(user.data.phone?.trim());
  const [website, setWebsite] = useState(user.data.website?.trim());
  const [twitter, setTwitter] = useState(user.data.twitter?.trim());
  const [linkedin, setLinkedin] = useState(user.data.linkedin?.trim());
  const [streetAddress, setStreetAddress] = useState(user.data.streetAddress?.trim());
  const [city, setCity] = useState(user.data.city?.trim());
  const [zip, setZip] =  useState(user.data.zip?.trim());
  const [state, setState] = useState(user.data.userState?.trim());
  const [country, setCountry] = useState(user.data.country?.trim());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (error)
      setError(false);
  }, [name, // eslint-disable-line react-hooks/exhaustive-deps
      phone,
      streetAddress,
      city,
      zip,
      state,
      country
    ],
  );

  const addressStarted = (
    (streetAddress?.trim().length > 0)
     || (city?.trim().length > 0)
     || (zip?.trim().length > 0)
     || (state?.trim().length > 0)
     || (country?.trim().length > 0)
  );

  const saveProfile = () => {
    if (!name || name.trim().length === 0
     || !phone || phone.trim().length === 0
     || (addressStarted
      && (
        !streetAddress || streetAddress.trim().length === 0
          || !city || city.trim().length === 0
          || !state || state.trim().length === 0
          || !zip || zip.trim().length === 0
          || !country || country.trim().length === 0
      )
     )
    ) {
      setError(true);
      return;
    }

    setSaving(true);

    axios.put(`${USER_API_PREFIX}/users/${user.data.id}`, {
      fullname: name,
      jobtitle: jobTitle,
      about,
      email,
      phone,
      website,
      twitter,
      linkedin,
      streetAddress,
      city,
      zip,
      userState: state,
      country,
    }).then(response => {
      console.log('edit-user', response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setError(false);
      setSaving(false);
    })
      .catch(err => {
        console.log('edit-user err', err);
        setSuccess(false);
        setError(true);
        setSaving(false);
      });
  }

  return (
    <Form title="Profile">
      <ProfileField name="Name" error={error} required defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
      <ProfileField name="Email" disabled required defaultValue={email} helperText="To modify your email, please go to account settings" />
      <ProfileField name="Phone" error={error} required defaultValue={phone} onChange={(e) => { setPhone(e.target.value) }} />
      <ProfileField name="Job Title" defaultValue={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }} />
      <ProfileField name="Website" defaultValue={website} onChange={(e) => { setWebsite(e.target.value) }} />
      <ProfileField name="Twitter" defaultValue={twitter} onChange={(e) => { setTwitter(e.target.value) }} />
      <ProfileField name="Linkedin" defaultValue={linkedin} onChange={(e) => { setLinkedin(e.target.value) }} />
      <ProfileField name="Expertise" placeholder={'Enter comma separated areas of expertise'} defaultValue={about} onChange={(e) => { setAbout(e.target.value) }} />
      <br />
      <div className={classes.addressLabel}>Address</div>
      <ProfileField name="Street" error={error} required={addressStarted} defaultValue={streetAddress} onChange={(e) => { setStreetAddress(e.target.value) }} />
      <ProfileField name="City" error={error} required={addressStarted}  defaultValue={city} onChange={(e) => { setCity(e.target.value) }} />
      <ProfileField name="Zip" error={error} required={addressStarted}  defaultValue={zip} onChange={(e) => { setZip(e.target.value) }} />
      <ProfileField name="State" error={error} required={addressStarted} defaultValue={state} onChange={(e) => { setState(e.target.value) }} />
      <ProfileField name="Country" error={error} required={addressStarted} defaultValue={country} onChange={(e) => { setCountry(e.target.value) }} />

      <div className={classes.message}>
        {error ? (<div className={classes.errorMessage}>There was an error saving your information. Please ensure all required fields are filled.</div>) : null}
        {success ? (<div className={classes.successMessage}>Profile update successfully!</div>) : null}
      </div>

      <div>
        <Button
          loading={saving}
          onClick={saveProfile}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default Profile;
