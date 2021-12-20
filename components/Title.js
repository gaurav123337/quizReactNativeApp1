import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Title() {
  return (
    <View >
      <Text style={styles.title}>Quizzer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600'
  }
})
