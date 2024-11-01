import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
          navigate('/');
        } catch (error) {
          setErrors({ username: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.signUpForm}>
          <View style={styles.formField}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
            />
            {errors.username && touched.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              placeholder="Password confirmation"
            />
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <Text style={styles.errorMessage}>{errors.passwordConfirmation}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  signUpForm: {
    maxWidth: 400,
    marginHorizontal: 'auto',
    padding: 20,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    fontSize: 16,
  },
  errorMessage: {
    color: '#e74c3c',
    marginTop: 4,
    fontSize: 14,
  },
  submitButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 4,
    textAlign: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
});

export default SignUp;
