import React, { useState } from "react";

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/LockOpen';
import PaymentIcon from '@material-ui/icons/Payment';
import { makeStyles } from '@material-ui/core/styles';

import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

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

function Home(props) {
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = useState('profile');

  const sidebarSections = {
    home: { name: 'Home', icon: <HomeIcon /> },
    profile: { name: 'Profile', icon: <PersonIcon />, component: <Profile /> },
    account: { name: 'Account', icon: <LockIcon /> },
    payments: { name: 'Payments', icon: <PaymentIcon /> },
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

export default Home;
