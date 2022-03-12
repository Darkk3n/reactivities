import { Field, Form, Formik } from 'formik';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/Models/activity';
import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
   const history = useHistory();
   const { activityStore } = useStore();
   const { loadActivity, createActivity, updateActivity,
      loading, loadingInitial } = activityStore;
   const { id } = useParams<{ id: string }>();

   const [activity, setActivity] = useState<Activity>({
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: ''
   });

   useEffect(() => {
      if (id)
         loadActivity(id).then(a => setActivity(a!));
   }, [id, loadActivity])

   if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

   return (
      <Segment clearing>
         <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
            {({ handleSubmit }) => {
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  <Field placeholder='Title' name='title' />
                  <Field placeholder='Description' name='description' />
                  <Field placeholder='Category' name='category' />
                  <Field type='date' placeholder='Date' name='date' />
                  <Field placeholder='City' name='city' />
                  <Field placeholder='Venue' name='venue' />
                  <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                  <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
               </Form>
            }}
         </Formik>
      </Segment>
   )
}

export default observer(ActivityForm);