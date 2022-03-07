import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import Navbar from './Navbar';

const App = () => {
  const location = useLocation();
  return (
    <div>

      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em ' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activity/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )} />

    </div >
  );
}

export default observer(App);