import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { restart } from '../actions/action';

export default function Result({ navigation }) {
  const storeData = useSelector(state => state);
  const dispatchRestart = useDispatch();
  console.log(storeData, 'in result');
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = () => {
    const { collectMyAnswer, loadQues } = storeData;

    let y = [];
    for (let i = 0; i < loadQues[0].length; i++) {
      collectMyAnswer.filter((itemVal) => {
        if (loadQues[0][i].correct_answer === itemVal.choosenOption) {
          y.push(itemVal)
        }
      })
    }
    console.log(y, 'y');
    setCorrectCount(y.length)
  }

  const restartApp = () => {
    dispatchRestart(restart('RESTART', undefined));
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <Text>This is result</Text>
        <View>
          <Text style={styles.result}>{correctCount}</Text>
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/q-and-a-service-3678714-3098907.png' }}
          style={styles.banner}
          resizeMode='contain' />
      </View>
      <View>
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}><Text style={styles.buttonText}>Home</Text></TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => restartApp()}><Text style={styles.buttonText}>Home</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: 'green',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  },
  container: {
    paddingVertical: 16,
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  },
  button: {
    padding: 16,
    backgroundColor: '#1A759A',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 30
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  },
  result: {
    fontSize: 16,
    fontWeight: '600'
  }
})
