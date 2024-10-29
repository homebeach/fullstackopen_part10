import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import Text from './Text';

// Define Yup validation schema
const ReviewSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner\'s username is required'),
  repositoryName: Yup.string()
    .required('Repository\'s name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: Yup.string()
});

// Form Component
const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Call createReview mutation with the correct argument structure
      const { data } = await createReview({
        variables: {
          review: {
            repositoryName: values.repositoryName,
            ownerName: values.ownerName,
            rating: values.rating,
            text: values.review,
          },
        },
      });

      // Reset form and navigate to the repository view
      resetForm();
      setSubmitting(false);
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: '', review: '' }}
      validationSchema={ReviewSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner's username"
            onChangeText={handleChange('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Repository's name"
            onChangeText={handleChange('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Rating (0-100)"
            keyboardType="numeric"
            onChangeText={handleChange('rating')}
            value={values.rating}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your review"
            multiline
            onChangeText={handleChange('review')}
            value={values.review}
          />
          {touched.review && errors.review && <Text style={styles.errorText}>{errors.review}</Text>}

          <Button
            title="Submit Review"
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  textArea: {
    height: 100,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default ReviewForm;
