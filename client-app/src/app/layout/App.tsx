import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import Navbar from './Navbar';

const App = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: '7em ' }}>
        <ActivityDashboard />
      </Container>
    </div >
  );
}

export default observer(App);