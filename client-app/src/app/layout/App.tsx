import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../Models/activity';
import Navbar from './Navbar';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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
    activity.id
      ? setActivities([...activities.filter(r => r.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(r => r.id !== id)])
  }

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/Activities')
      .then(res => {
        setActivities(res.data);
      });
  }, []);

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
          deleteActivity={handleDeleteActivity} />
      </Container>
    </div >
  );
}

export default App;
