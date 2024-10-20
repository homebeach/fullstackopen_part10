import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to} component={TouchableOpacity} activeOpacity={0.8}>
      <Text style={styles.tabText}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
