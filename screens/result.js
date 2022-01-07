import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function Result({ navigation }) {
  const storeData = useSelector(state => state);
  console.log(storeData, 'in result');
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = () => {
    // const allQues  = storeData.loadQues[0];
    const { collectMyAnswer, loadQues } = storeData;
    console.log(collectMyAnswer, loadQues);

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

  return (
    <View>
      <Text>This is result</Text>
      <View>
        <Text>{correctCount}</Text>
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
