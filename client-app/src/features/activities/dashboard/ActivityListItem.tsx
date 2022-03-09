import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";

interface Props {
   a: Activity
}
const ActivityListItem = ({ a }: Props) => {


   return (
      <Segment.Group>
         <Segment>
            <Item.Group>
               <Item>
                  <Item.Image size="tiny" circular src='/assets/user.png' />
                  <Item.Content>
                     <Item.Header as={Link} to={`/activity/${a.id}`}  >{a.title}</Item.Header>
                  </Item.Content>
               </Item>
            </Item.Group>
         </Segment>
         <Segment>
            <span>
               <Icon name='clock' />{a.date}
               <Icon name="marker" />{a.venue}
            </span>
         </Segment>
         <Segment secondary>
            Attendees go here
         </Segment>
         <Segment clearing>
            <span>{a.description}</span>
            <Button as={Link} to={`/activity/${a.id}`} color='teal' floated='right' content='View' />
         </Segment>
      </Segment.Group>
   )
}

export default ActivityListItem;