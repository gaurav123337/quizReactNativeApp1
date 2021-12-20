import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { updateQuesNo } from '../actions/action';

const initialState = 0;
const reducer = (state, action) => {
  console.log(action, 'action')
  switch (action) {
    case "click":
      console.log(state, 'sate')
      return state + 1;
    case "reset":
      return 0;
    default:
      throw new Error("Unexpected action");
  }
};

export default function Quiz({ navigation }) {
  const storeData = useSelector(state => state);
  console.log(storeData, 'storeData');
  const dispatchQuesStatus = useDispatch();
  const [clickCounter, dispatch] = useReducer(reducer, initialState);
  const [allRecords, setAllRecords] = useState();
  const [question, setQuestion] = useState();
  const [ques, setQues] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setflag] = useState({
    choosenAnswer: '',
    isClicked: false,
    flagVal: false
  });

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    allRecords && nextQues();
  }, [clickCounter]);

  const getQuestionSet = (data) => {
    let question = {};
    const io = data.incorrect_answers.map((item, index) => {
      return (
        {
          name: item,
          isTrue: false,
          isClicked: false
        }
      )
    });
    const co = {
      "name": data.correct_answer,
      "isTrue": true,
      "isClicked": false
    };
    question = { options: [...io, co], question: data.question };
    setQuestion(question);
  }

  const getQuiz = async () => {
    const url = "https://opentdb.com/api.php?amount=10&type=multiple";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setIsLoading(false);
    getQuestionSet(data.results[0]);
    setAllRecords(data.results);
  }

  const nextQues = () => {
    dispatchQuesStatus(updateQuesNo('CURR_STATE', clickCounter));
    if (clickCounter < 10) {
      getQuestionSet(allRecords[clickCounter]);
    } else {
      setIsLoading(true);
      getQuiz();
      dispatch('reset');
    }
  }

  const isCorrect = (answer) => {
    setflag({ ...answer, isClicked: true });
  }

  console.log(flag, 'state', question, count, "clickCounter:" + clickCounter)
  return (
    <ScrollView>
      <View style={styles.container}>
        {!isLoading ? (question && <View style={styles.container}>
          <Text>This is quiz - {!storeData.count.currCount ? 0 : storeData.count.currCount}</Text>
          <View style={styles.quiz}>
            <Text style={styles.question}>{question.question}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={(flag.name === question.options[0].name && flag.isClicked && flag.isTrue) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[0])}>
              <Text style={styles.option}>{question.options[0].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[1].name && flag.isClicked && flag.isTrue) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[1])}>
              <Text style={styles.option}>{question.options[1].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[2].name && flag.isClicked && flag.isTrue) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[2])}>
              <Text style={styles.option}>{question.options[2].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[3].name && flag.isClicked && flag.isTrue) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[3])}>
              <Text style={styles.option}>{question.options[3].name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button} onPress={() => getQuiz()}>
              <Text Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            {(flag.name === question.options[3].name && flag.isClicked && flag.isTrue) && <TouchableOpacity style={styles.button} onPress={() => dispatch('click')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>}
          </View>
        </View>) : <View style={[styles.activityContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>}
      </View >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  },
  quiz: {
    marginVertical: 16,
  },
  question: {
    fontSize: 28
  },
  options: {
    marginVertical: 16,
    flex: 1
  },
  option: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row'
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

  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: "#34A0A4",
    paddingHorizontal: 12,
    borderRadius: 12
  },
  optionCorrect: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: "green",
    paddingHorizontal: 12,
    borderRadius: 12
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})
