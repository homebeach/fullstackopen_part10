import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CREATE_USER } from '../graphql/mutations'; // Adjust the path based on your file structure
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import a CSS file for custom styling

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot exceed 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot exceed 50 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const { username, password } = values;
        
        try {
          const { data } = await createUser({
            variables: { user: { username, password } },
          });
          console.log(data);
          await signIn({ username, password });
          navigate('/'); // Redirect after successful sign-in
        } catch (error) {
          setErrors({ username: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="sign-up-form">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" placeholder="Username" />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <Field name="passwordConfirmation" type="password" placeholder="Password confirmation" />
            <ErrorMessage name="passwordConfirmation" component="div" className="error-message" />
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-button">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
