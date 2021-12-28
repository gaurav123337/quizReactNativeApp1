import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const ResultTracker = (props) => {

  return (
    <View>
      <Text>Your final score:-{props.currctAnsCount}</Text>
    </View>
  )
}

export default ResultTracker;
