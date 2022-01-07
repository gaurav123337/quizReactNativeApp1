import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Title from '../components/Title';

export default function Home({ navigation }) {
  const storeData = useSelector(state => state);
  // console.log(storeData, 'storeData');
  return (
    <View style={styles.container}>
      <Title />
      <Text>This is home</Text>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/q-and-a-service-3678714-3098907.png' }}
          style={styles.banner}
          resizeMode='contain' />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")} style={styles.button}>
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300
  },
  bannerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  },
  button: {
    width: '100%',
    backgroundColor: '#1A759A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  }
})
