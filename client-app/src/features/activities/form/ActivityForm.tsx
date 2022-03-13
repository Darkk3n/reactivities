import { Form, Formik } from 'formik';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
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
      date: null,
      city: '',
      venue: ''
   });

   const validationSchema = Yup.object({
      title: Yup.string().required('The activity title is required'),
      description: Yup.string().required('The activity description is required'),
      category: Yup.string().required(),
      date: Yup.string().required('Date is required').nullable(),
      venue: Yup.string().required(),
      city: Yup.string().required(),

   });

   const handleFormSubmit = (activity: Activity) => {
      if (activity.id.length === 0) {
         let newActivity = {
            ...activity,
            id: uuid()
         };
         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
      }
      else
         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
   }

   useEffect(() => {
      if (id)
         loadActivity(id).then(a => setActivity(a!));
   }, [id, loadActivity])

   if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

   return (
      <Segment clearing>
         <Header content='Activity Details' sub color='teal' />
         <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={activity}
            onSubmit={values => handleFormSubmit(activity)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  <MyTextInput name='title' placeholder='Title' />
                  <MyTextArea rows={3} placeholder='Description' name='description' />
                  <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                  <MyDateInput
                     placeholderText='Date'
                     name='date'
                     showTimeSelect
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy h:mm aa'
                  />
                  <Header content='Location Details' sub color='teal' />
                  <MyTextInput placeholder='City' name='city' />
                  <MyTextInput placeholder='Venue' name='venue' />
                  <Button
                     loading={loading}
                     floated='right'
                     positive
                     type='submit'
                     content='Submit'
                     disabled={isSubmitting || !dirty || !isValid} />
                  <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
               </Form>
            )}
         </Formik>
      </Segment>
   )
}

export default observer(ActivityForm);