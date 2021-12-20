import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function Result({ navigation }) {
  return (
    <View>
      <Text>This is result</Text>
      <View>
        <Text>This is result</Text>
      </View>
      <View>
        <Text>This is result</Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/q-and-a-service-3678714-3098907.png' }}
          style={styles.banner}
          resizeMode='contain' />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text>Home</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300
  },
  container: {
    paddingVertical: 16,
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  }
})
