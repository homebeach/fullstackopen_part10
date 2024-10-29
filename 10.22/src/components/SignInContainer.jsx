import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>
          <TextInput
            testID="username"
            style={[styles.input, touched.username && errors.username ? styles.inputError : null]}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          <TextInput
            testID="password"
            style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Button testID="submitButton" title="Sign in" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a', marginBottom: 10 },
});

export default SignInContainer;