// components/ReviewItem.js
import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  reviewItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  repositoryName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007bff', // Optional: Add color for repository name
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  reviewText: {
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const ReviewItem = ({ review, showUsername = true, showRepositoryName = false, showButtons = true }) => {

  const navigate = useNavigate();

  const onViewRepository = () => {
      navigate(`/repositories/${review.repository.id}`);
  };

	const onDelete = () => {
		console.log("THIS IS ONDELETE!!!");
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log(`Review with ID ${review.id} deleted.`);
            } catch (e) {
              console.error('Error deleting review:', e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        {showRepositoryName && (
          <Text style={styles.repositoryName}>{review.repository.name}</Text> // Safely access repository name
        )}
        {showUsername && <Text style={styles.username}>{review.user.username}</Text>}
        <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
        {showButtons && ( // Conditionally render buttons
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="View repository" onPress={onViewRepository} color="#007bff" />
            </View>
            <View style={styles.button}>
              <Button title="Delete review" onPress={onDelete} color="red" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
