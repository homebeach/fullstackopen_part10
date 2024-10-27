import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage'; // Import AuthStorage

// Validation schema using Yup
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = new AuthStorage(); // Create an instance of AuthStorage

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      const accessToken = data.authenticate.accessToken;
      console.log("Access Token in SignIn component:", accessToken);

      // Store the access token using AuthStorage
      await authStorage.setAccessToken(accessToken);

      let authStorageToken = await authStorage.getAccessToken();
      console.log("Access token in authStorage:", authStorageToken);

      // Navigate to a different screen or update app state as needed
    } catch (e) {
      console.log("Error during sign-in:", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>
          
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username ? styles.inputError : null
            ]}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null
            ]}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          
          <Button title="Sign in" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

export default SignIn;
