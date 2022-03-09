import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
   a: Activity
}
const ActivityListItem = ({ a }: Props) => {
   const { activityStore } = useStore();
   const { deleteActivity, loading } = activityStore;
   const [target, setTarget] = useState('');

   const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
   }
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
               <Button as={Link} to={`/activity/${a.id}`} floated='right' content='View' color='blue' />
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
}

export default ActivityListItem;