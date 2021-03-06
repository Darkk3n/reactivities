import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../errors/ValidationErrors";

const RegisterForm = () => {
   const { userStore } = useStore();
   return (
      <Formik
         initialValues={{ email: '', password: '', displayname: '', username: '', error: null }}
         onSubmit={(values, { setErrors }) => userStore.register(values).catch(err => setErrors({ error: err }))}
         validationSchema={Yup.object({
            displayname: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
         })}>
         {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
               <Header as='h2' content='Signup to Reactivities' color='teal' textAlign='center' />
               <MyTextInput name='displayname' placeholder='Display Name' />
               <MyTextInput name='username' placeholder='Username' />
               <MyTextInput name='email' placeholder='Email' />
               <MyTextInput name='password' placeholder='Password' type='password' />
               <ErrorMessage name='error'
                  render={() => <ValidationErrors errors={errors.error} />} />
               <Button
                  disabled={!isValid || !dirty || isSubmitting}
                  loading={isSubmitting}
                  positive
                  content='Register'
                  type='submit'
                  fluid />
            </Form>
         )}
      </Formik>
   )
}

export default observer(RegisterForm);