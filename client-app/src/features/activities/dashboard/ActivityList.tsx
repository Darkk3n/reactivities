import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


const ActivityList = () => {
   const { activityStore } = useStore();
   const { deleteActivity, activitiesByDate, loading } = activityStore;
   const [target, setTarget] = useState('');

   const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
   }

   return <>
      <Segment>
         <Item.Group divided>
            {
               activitiesByDate.map(a => {
                  return (
                     <Item key={a.id}>
                        <Item.Content>
                           <Item.Header as='a'>{a.title}</Item.Header>
                           <Item.Meta>{a.date}</Item.Meta>
                           <Item.Description>
                              <div>{a.description}</div>
                              <div>{a.city}, {a.venue}</div>
                           </Item.Description>
                           <Item.Extra>
                              <Button onClick={() => activityStore.selectActivity(a.id)} floated='right' content='View' color='blue' />
                              <Button
                                 loading={loading && target === a.id}
                                 onClick={(e) => handleActivityDelete(e, a.id)}
                                 floated='right'
                                 content='Delete'
                                 color='red'
                                 name={a.id} />
                              <Label basic content={a.category} />
                           </Item.Extra>
                        </Item.Content>
                     </Item>
                  )
               })
            }
         </Item.Group>
      </Segment>
   </>
}
export default observer(ActivityList);