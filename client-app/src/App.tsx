import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import './App.css';


const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      });
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {
          activities.map((a: any) => {
            return (<List.Item key={a.id}>
              {a.title}
            </List.Item>)
          })
        }
      </List>
    </div >
  );
}

export default App;
