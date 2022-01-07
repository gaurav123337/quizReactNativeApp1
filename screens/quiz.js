import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { updateQuesNo, correctAnswer, collectMyOption, loadQues } from '../actions/action';

import ResultTracker from '../components/ResultTracker';

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "click":
      return state + 1;
    case "reset":
      return 0;
    default:
      throw new Error("Unexpected action");
  }
};

const initialAnswerStatus = { isCorrect: 0 };
const checkAnswerReducer = (state, action) => {
  //console.log(action, 'In quiz checkAnswerReducer');
  switch (action.type) {
    case "CORRECT":
      const updatedState = { ...state, isCorrect: state.isCorrect + 1, isClicked: true };
      //console.log(updatedState, 'In quiz checkAnswerReducer Current state');
      return updatedState;
    case "NOT_CORRECT":
      const updatedStateValue = { ...state, isCorrect: state.isCorrect, isClicked: false };
      //console.log(updatedStateValue, 'In quiz checkAnswerReducer Current state');
      return updatedStateValue;
    default:
      throw new Error("Unexpected action");
  }
};

export default function Quiz({ navigation }) {
  const storeData = useSelector(state => state);
  console.log(storeData, 'storeData');
  const dispatchQuesStatus = useDispatch();
  const dispatchCorrectQuesStatus = useDispatch();
  const dispatchMyAnswer = useDispatch();
  const [clickCounter, dispatch] = useReducer(reducer, initialState);
  const [answerStatus, dispatchAnswerStatus] = useReducer(checkAnswerReducer, initialAnswerStatus);
  const dispatchAllQues = useDispatch();

  const [allRecords, setAllRecords] = useState();
  const [question, setQuestion] = useState();
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState({
    name: "",
    isTrue: false,
    isClicked: false,
    score: 0
  });
  const [ques, setQues] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setflag] = useState({
    choosenAnswer: '',
    isClicked: false,
    flagVal: false,
    score: 0
  });
  const [myAnswer, setMyAnswer] = useState({
    question: '',
    choosenOption: ''
  });

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    console.log('Now called');
    //console.log(answerStatus, 'answerStatus', flag, myAnswer);

    dispatchCorrectQuesStatus(correctAnswer("IS_CORRECT", { ...flag, score: answerStatus.isCorrect, isClicked: answerStatus.isClicked }));
    dispatchMyAnswer(collectMyOption('MY_ANSWER', myAnswer));
  }, [answerStatus.isCorrect, answerStatus.isClicked, myAnswer]);


  useEffect(() => {
    dispatchAllQues(loadQues('LOAD', allRecords));
  }, [allRecords]);

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
          isClicked: false,
          score: 0
        }
      )
    });
    const co = {
      "name": data.correct_answer,
      "isTrue": true,
      "isClicked": false,
      "score": 0
    };
    question = { options: [...io, co], question: data.question };
    //console.log(question, 'question')
    setQuestion(question);
  }

  const getQuiz = async () => {
    const url = "https://opentdb.com/api.php?amount=10&type=multiple";
    const res = await fetch(url);
    const data = await res.json();
    setIsLoading(false);
    getQuestionSet(data.results[0]);
    setAllRecords(data.results);
  }

  // const getQuiz = async () => {
  //   return async (dispatch) => {
  //     const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setIsLoading(false);
  //     getQuestionSet(data.results[0]);
  //     setAllRecords(data.results);
  //     dispatch({ type: 'LOAD', payload: data.results })
  //   }
  // }

  const nextQues = () => {
    dispatchQuesStatus(updateQuesNo('CURR_STATE', clickCounter));
    if (clickCounter < 10) {
      getQuestionSet(allRecords[clickCounter]);
      setflag({ ...flag, isClicked: false });
    } else {
      // setIsLoading(true);
      // getQuiz();
      // dispatch('reset');
      setShowResult(true);
    }
  }

  const isCorrect = (answer) => {
    //console.log(answer, 'answer', answerStatus, 'allallRecords', allRecords, 'question', allRecords[clickCounter].question)
    if (answer.name === allRecords[clickCounter].correct_answer && !answerStatus.isClicked) {
      // dispatchAnswerStatus("CORRECT");
      dispatchAnswerStatus({ type: "CORRECT", payload: answer });
    }
    setflag({ ...answer, isClicked: true, score: answerStatus });
    // setMyAnswer([{ ...myAnswer, question: allRecords[clickCounter].question, choosenAnswer: answer.name }]);
    if (allRecords[clickCounter].question === myAnswer.question) {
      //setMyAnswer({ ...myAnswer, choosenOption: answer.name });
      setMyAnswer(Object.assign(myAnswer, { choosenOption: answer.name }))
    } else {
      setMyAnswer({ ...myAnswer, question: allRecords[clickCounter].question, choosenOption: answer.name });
    }


    // dispatchMyAnswer(collectMyOption('MY_ANSWER', myAnswer));
  }

  const getResult = () => {
    console.log()
  }

  // const isCorrect = (answer) => {
  //   console.log(answer, 'answer', answerStatus)
  //   if (answer.name === allRecords[clickCounter].correct_answer && !answerStatus.isClicked) {
  //     // dispatchAnswerStatus("CORRECT");
  //     dispatchAnswerStatus({ type: "CORRECT", payload: answer });
  //   } else {
  //     dispatchAnswerStatus({ type: "NOT_CORRECT", payload: answer });
  //   }
  //   setflag({ ...answer, isClicked: true, score: answerStatus });
  // }

  //console.log(storeData, 'storeData', flag, 'myAnswer', myAnswer);
  //console.log(flag, 'state', question, count, "clickCounter:" + clickCounter)
  return (
    <ScrollView ScrollView >
      <View style={styles.container}>
        {/* {storeData?.correctStatus && <ResultTracker currctAnsCount={storeData?.correctStatus?.correctStatus} />} */}
        {!isLoading ? (question && <View style={styles.container}>
          <Text>This is quiz - {!storeData.count.currCount ? 0 : storeData.count.currCount}</Text>
          <View style={styles.quiz}>
            <Text style={styles.question}>{question.question}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={(flag.name === question.options[0].name && flag.isClicked) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[0])}>
              <Text style={styles.option}>{question.options[0].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[1].name && flag.isClicked) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[1])}>
              <Text style={styles.option}>{question.options[1].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[2].name && flag.isClicked) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[2])}>
              <Text style={styles.option}>{question.options[2].name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(flag.name === question.options[3].name && flag.isClicked) ? styles.optionCorrect : styles.optionButton} onPress={() => isCorrect(question.options[3])}>
              <Text style={styles.option}>{question.options[3].name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            {!showResult && <TouchableOpacity style={styles.button} onPress={() => getQuiz()}>
              <Text Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>}
            {((flag.isClicked) && !showResult) && <TouchableOpacity style={styles.button} onPress={() => dispatch('click')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>}
            {showResult && <TouchableOpacity style={styles.button} onPress={() => getResult()}>
              <Text Text style={styles.buttonText} onPress={() => navigation.navigate("Result")}>Result</Text>
            </TouchableOpacity>}
          </View>
        </View>) : <View style={[styles.activityContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>}
      </View >
    </ScrollView >
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
  optionSelectedButton: {
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
