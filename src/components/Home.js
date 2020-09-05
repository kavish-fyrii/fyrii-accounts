import React, { useState } from "react";

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/LockOpen';
import PaymentIcon from '@material-ui/icons/Payment';

import Profile from './Profile';
import Sidebar from './Sidebar';

function Home(props) {
  const [selectedSection, setSelectedSection] = useState('profile');

  const sidebarSections = {
    home: { name: 'Home', icon: <HomeIcon /> },
    profile: { name: 'Profile', icon: <PersonIcon />, component: <Profile /> },
    account: { name: 'Account', icon: <LockIcon /> },
    payments: { name: 'Payments', icon: <PaymentIcon /> },
  };

  return (
    <div className="container">
      <Sidebar
        isSidebarOpen={props.isSidebarOpen}
        toggleSidebar={props.toggleSidebar}
        sidebarSections={sidebarSections}
        setSelectedSection={setSelectedSection}
      />
      <div className="app-section">{sidebarSections[selectedSection].component || sidebarSections[selectedSection].name}</div>
    </div>
  );
}

export default Home;
