import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBarTab = ({ title, to, onPress, style }) => {
  // If `to` is provided, render a `Link` for navigation; otherwise, render `TouchableOpacity`
  if (to) {
    return (
      <Link to={to} component={TouchableOpacity} style={[styles.tab, style]} activeOpacity={0.8}>
        <Text style={styles.tabText}>{title}</Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, style]} activeOpacity={0.8}>
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppBarTab;