import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";


const ActivityList = () => {
   const { activityStore } = useStore();
   const { groupedActivities } = activityStore;
   return (
      <>
         {groupedActivities.map(([group, activities]) => (
            <Fragment key={group}>
               <Header sub color='teal'>
                  {group}</Header>
               <Segment>
                  <Item.Group divided>
                     {activities.map(a => (<ActivityListItem key={a.id} a={a} />))}
                  </Item.Group>
               </Segment>
            </Fragment>
         ))}
      </>
   )
}
export default observer(ActivityList);