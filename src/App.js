import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import { UserContext } from './UserContext';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Confirm from './components/Auth/Confirm';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c71d4',
    },
    secondary: {
      main: '#EEF1FA',
    },
  },
});

function App() {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    FyriiAuthHelpers.getCurrentUser()
      .then((response) => {
        console.log('get-user-data', response);
        if (response) user.setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('get-user-data err', err);
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="app-container">
            <Switch>
              {
                user.data ? (<>
                  <Route exact path="/" render={(props) => (<Home {...props} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />)} />
                  <Route exact path="/login"><Redirect to="/"></Redirect></Route>
                  <Route exact path="/signup"><Redirect to="/"></Redirect></Route>
                </>) : (<>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/confirm" component={Confirm} />
                  <Route exact path="/forgot-passowrd" component={Login} />
                  <Route exact path="/"><Redirect to="/login" /></Route>
                </>)
              }
            </Switch>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
