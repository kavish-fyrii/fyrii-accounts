import React, { useState } from "react";

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/LockOpen';
import PaymentIcon from '@material-ui/icons/Payment';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1600px',
  },
  section: {
    paddingLeft: '260px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));

function Container(props) {
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = useState('home');

  const sidebarSections = {
    home: { name: 'Home', icon: <HomeIcon fontSize="small" />, component: <Home /> },
    profile: { name: 'Profile', icon: <PersonIcon fontSize="small" />, component: <Profile /> },
    account: { name: 'Account', icon: <LockIcon fontSize="small" /> },
    payments: { name: 'Payments', icon: <PaymentIcon fontSize="small" /> },
  };

  return (
    <div className={classes.container}>
      <Sidebar
        isSidebarOpen={props.isSidebarOpen}
        toggleSidebar={props.toggleSidebar}
        sidebarSections={sidebarSections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className={classes.section}>
        {sidebarSections[selectedSection].component || sidebarSections[selectedSection].name}
      </div>
    </div>
  );
}

export default Container;
