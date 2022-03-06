import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { Activity } from '../Models/activity';
import LoadingComponent from './LoadingComponent';
import Navbar from './Navbar';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEdit = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent
        .Activities
        .update(activity)
        .then(() => {
          setActivities([...activities.filter(r => r.id !== activity.id), activity]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
    }
    else {
      activity.id = uuid();
      agent
        .Activities
        .create(activity)
        .then(() => {
          setActivities([...activities, activity]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.del(id).then(() => {
      setActivities([...activities.filter(r => r.id !== id)])
      setSubmitting(false);
    })
  }

  useEffect(() => {
    agent
      .Activities
      .list()
      .then(res => {
        let activities: Activity[] = [];
        res.forEach(a => {
          a.date = a.date.split('T')[0];
          activities.push(a);
        })
        setActivities(res);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingComponent content='Loading app...' />

  return (
    <div>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em ' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEdit}
          deleteActivity={handleDeleteActivity}
          submitting={submitting} />
      </Container>
    </div >
  );
}

export default App;
