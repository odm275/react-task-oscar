import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

const endpoint = 'http://localhost:3010';
const socket = socketIOClient(endpoint);

function isThresholdGreater(threshold) {
    return function(elem, i){
      // If greater than threshold and if it is the elem latest in the array, in this case 0 since we reversed.
      return (elem.value > parseInt(threshold)) && i === 0;
    }
}

const notify = (arr, threshold) => {
  // Find the latest value that is greater than the threshold
  const findThreshold = arr.reverse().find(isThresholdGreater(threshold));
  if (findThreshold) {
    return toast(findThreshold.value);
  }
};

function App() {
  // Try to test [{ timestamp: 111111, value: 100 }] as initial state, or more.

  const [dataHistory, setDataHistory] = useState([]);
  const [threshold, setThreshold] = useState(0);
  const [checkThresholdIsOn, setcheckThresholdIsOn] = useState(false);



  const handleChange = e => {
    setThreshold(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setcheckThresholdIsOn(!checkThresholdIsOn);
  };

  useEffect(() => {
    try {
      socket.on('data', newData => {
        const newHistory = [...dataHistory, newData];
        setDataHistory(newHistory);
        
      });
      return () => {
        socket.off('data');
      };
    } catch (error) {
      console.log(error);
    }
  }, [dataHistory]);
  
  // Should only run after children are finished rendering.
  useEffect(() => {
    if(checkThresholdIsOn){
      notify(dataHistory, threshold);
    }
  })

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <label className={styles.formInputLabel}>Put a Number below and hit the button to set a thershold notification.</label>
        <input
          className={styles.input}
          type="number"
          name="Alert Threshold"
          value={threshold}
          onChange={handleChange}
          style={{width: '100%'}}
        />
        <input
          type="submit"
          className={[styles.inputThreshold, checkThresholdIsOn ? styles.inputThresholdStop : styles.inputThresholdStart].join(' ')}
          value={checkThresholdIsOn ? "Turn Alert Threshold Off" : "Turn Alert Threshold On"}
        />
      </form>
      <LineGraph dataHistory={dataHistory} />
      <BarGraph dataHistory={dataHistory} />
    </>
  );
}

export default App;
