// SignIn.js
import React from 'react';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log("Access Token in SignIn component:", data.authenticate.accessToken);
      navigate('/repositories');
    } catch (e) {
      console.log("Error during sign-in:", e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} initialValues={initialValues} />;
};

export default SignIn;
