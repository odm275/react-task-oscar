import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './App.module.css';

function LineGraph({ dataHistory }) {
  /*Line Graph Set Up*/
  const lineGraphLabels = dataHistory.map(function(elem) {
    return elem.timestamp;
  });
  const lineGraphValues = dataHistory.map(function(elem) {
    return elem.value;
  });
  /*Chart Options for Line Graph*/
  const lineGraphData = {
    type: 'line',
    labels: lineGraphLabels,
    datasets: [
      {
        label: 'Time vs Value',
        data: lineGraphValues,
        fill: false,
        backgroundColor: 'tomato',
        borderColor: 'tomato'
      }
    ]
  };
  return (
    <div>
      <h3 className={styles.taskTitle}>Task 1</h3>
      <div className={styles.chartBackground}>
        <Line data={lineGraphData} />
      </div>
    </div>
  );
}

export default React.memo(LineGraph);
