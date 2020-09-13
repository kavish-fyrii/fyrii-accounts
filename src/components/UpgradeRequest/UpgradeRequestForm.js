import axios from 'axios';
import React, { useState, useEffect } from "react";
import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input'

import { UserContext } from '../../UserContext';
import { USER_API_PREFIX } from '../../constants';

import Button from '../StyledComponents/Button';
import Form from '../StyledComponents/Form';

const useStyles = makeStyles((theme) => ({
  textInput: {
    background: '#fff',
    padding: theme.spacing(2),
  },
  chipInput: {
    background: '#fff',
    borderRadius: 0,
  },
  message: {
    margin: theme.spacing(2, 0),
    fontSize: '1.2rem',
  },
  resumeInput: {
    cursor: 'pointer',
    display: 'none',
  },
  resumeLabel: {
    cursor: 'pointer',
    margin: 0,
  },
  resumeUploadButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(4),
    cursor: 'pointer',
  },
  fileName: {
    padding: theme.spacing(1.25, 2, 1.75, 2),
  },
  errorMessage: {
    color: 'red',
  },
  successMessage: {
    color: 'green',
  },
}));

function UpgradeRequestField(props) {
  const classes = useStyles();

  return (
    <Grid item xs={props.xs || 12} sm={props.sm || 12}>
      <TextField
        inputProps={{ className: classes.textInput }}
        autoComplete={props.name.toLowerCase().split(' ').join('-')}
        name={props.name.toLowerCase().split(' ').join('-')}
        variant="outlined"
        fullWidth
        required
        id={props.name.toLowerCase().split(' ').join('-')}
        label={props.name}
        {...props}
        error={props.error && (!props.defaultValue || props.defaultValue.trim().length === 0)}
      />
    </Grid>
  )
}

function UpgradeRequest(props) {
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [name, setName] = useState(user.data.fullname?.trim());
  const [jobTitle, setJobTitle] = useState(user.data.jobtitle?.trim());
  const [company, setCompany] = useState(user.data.company?.trim());
  const [twitter, setTwitter] = useState(user.data.twitter?.trim());
  const [linkedin, setLinkedin] = useState(user.data.linkedin?.trim());
  const [expertise, setExpertise] = useState(user.data.expertise || []);
  const [resume, setResume] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (error)
      setError(false);
  }, [name, // eslint-disable-line react-hooks/exhaustive-deps
      jobTitle,
      company,
      twitter,
      linkedin,
      resume,
      expertise,
    ],
  );

  const saveProfile = async () => {
    if (!name || name.trim().length === 0
     || !jobTitle || jobTitle.trim().length === 0
     || !company || company.trim().length === 0
     || !twitter || twitter.trim().length === 0
     || !linkedin || linkedin.trim().length === 0
     || !expertise || expertise.length === 0
     || !resume
    ) {
      setError(true);
      return;
    }

    setSaving(true);

    try {
      const uploadUrlRes = await axios.post(
        'https://w4zukx6nlk.execute-api.us-east-2.amazonaws.com/resumetest/getResumeUploadUrl',
        { name: user.data.id + '_resume.pdf', type: 'application/pdf', },
      );
      await axios.put(uploadUrlRes.data, resume, { 'Content-Type': 'multipart/form-data', })
      const userRes = await axios.put(
        `${USER_API_PREFIX}/users/${user.data.id}`,
        { fullname: name, jobtitle: jobTitle, company, twitter, linkedin }
      );
      user.setData(userRes.data);
      await axios.post(`${USER_API_PREFIX}/upgradeRequests`, { userId: user.data.id, username: user.data.username, userFullname: name, type: props.type });

      setSuccess(true);
      setError(false);
      setSaving(false);
      props.onSuccess();
    } catch(err) {
      console.log('edit-user err', err);
      setSuccess(false);
      setError(true);
      setSaving(false);
    }
  }

  return (
    <Form title={`${props.title} Request`} wideForm>
      <br />
      <Grid container spacing={2}>
        <UpgradeRequestField name="Name" error={error} defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
        <UpgradeRequestField xs={12} sm={6} error={error} name="Job Title" defaultValue={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }} />
        <UpgradeRequestField xs={12} sm={6} error={error} name="Company" defaultValue={company} onChange={(e) => { setCompany(e.target.value) }} />
        <UpgradeRequestField xs={12} sm={6} error={error} name="Twitter" defaultValue={twitter} onChange={(e) => { setTwitter(e.target.value) }} />
        <UpgradeRequestField xs={12} sm={6} error={error} name="Linkedin" defaultValue={linkedin} onChange={(e) => { setLinkedin(e.target.value) }} />
        <Grid item xs={12}>
          <ChipInput
            InputProps={{ className: classes.chipInput }}
            label="Expertise"
            helperText="Enter comma separated areas of expertise"
            variant="outlined"
            defaultValue={expertise}
            onChange={(chips) => setExpertise(chips)}
            fullWidth
            required
            error={error && (!expertise || expertise.length === 0)}
            newChipKeyCodes={[188]}
          />
        </Grid>
        <div className={classes.resumeUploadButton}>
          <Button secondary error={error && !resume}>
            <input
              accept="application/pdf"
              className={classes.resumeInput}
              id="resume-upload-button"
              multiple
              type="file"
              onChange={(e) => { setResume(e.target.files[0]) }}
            />
            <label htmlFor="resume-upload-button" className={classes.resumeLabel}>
              Upload Resume
            </label>
          </Button>
          {resume ? <span className={classes.fileName}>{resume.name}</span> : null}
        </div>
      </Grid>
      <div className={classes.message}>
        {error ? (<div className={classes.errorMessage}>There was an error submitting your request. Please ensure all required fields are filled.</div>) : null}
        {success ? (<div className={classes.successMessage}>Request submitted successfully!</div>) : null}
      </div>

      <div>
        <Button
          loading={saving}
          onClick={saveProfile}
        >
          Submit Request
        </Button>
      </div>
    </Form>
  );
}

export default UpgradeRequest;
