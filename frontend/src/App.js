import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Dashboard } from './components/Pages/Dashboard';
import { Profile } from './components/Pages/Profile';
import { Navbar } from './components/Shared/Navbar';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';

export const UserContext = React.createContext();

export const App = props => {
  const token = localStorage.getItem('token');

  const { loading, error, data } = useQuery(ME_QUERY, {
    skip: !token,
    fetchPolicy: 'cache-and-network',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let currentUser;

  if (data) {
    currentUser = data.me;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
        <Navbar
          {...props}
          currentUser={currentUser}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/profile/:id' component={Profile} />
          <Route
            path='/login'
            render={props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path='/register' component={Register} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      likeSet {
        track {
          id
        }
      }
    }
  }
`;
