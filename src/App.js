import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as FyriiAuthHelpers from 'fyrii-auth/lib/helpers';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { UserContext } from './UserContext';

import Navbar from './components/Navbar';
import Container from './Container';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Confirm from './components/Auth/Confirm';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c71d4',
      dark: '#585ece',
    },
    secondary: {
      light: '#f9f9f9',
      main: '#EEF1FA55',
    },
  },
});

const useStyles = makeStyles(() => ({
  appContainer: {
    minHeight: '700px',
    background: theme.palette.secondary.main,
    padding: '80px 10px',
  },
}));

function App() {
  const classes = useStyles();
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
        <div>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className={classes.appContainer}>
            <Switch>
              {
                user.data ? (<>
                  <Route path="/" render={(props) => (<Container {...props} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />)} />
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
