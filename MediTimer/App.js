import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const formatNumber = number => '0${number'.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs)};
}

export default function App() {

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setisActive] = useState(false);
  const {mins, secs} = getRemaining(setRemainingSecs);

  const toggle = () => {
    setisActive(!isActive);
  }

  useEffect = (() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000)
    } else if (!isActive && remainingSecs !== 0) {
        clearInterval(interval);
    }

    return () => clearImmediate(interval);
  }, [isActive, setRemainingSecs]);

  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.timerText}>{'${mins}:${secs}'}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A8D7E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 70,
    justifyContent: 'center',
    backgroundColor: '#112522',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
    marginBottom: 20
  }
});
