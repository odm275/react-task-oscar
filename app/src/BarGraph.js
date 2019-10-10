import React from 'react';
import { Bar } from 'react-chartjs-2';
import { createArrRange, createBarLabels, fnRangeTest } from './helpers';
import styles from './App.module.css';

function BarGraph({ dataHistory }) {
  // Parameters for Bar Graph
  const lowerLimit = -100;
  const upperLimit = 100;
  const step = 50;
  const ranges = createArrRange(lowerLimit, upperLimit, step);

  /*Bar Graph Set Up*/
  const rangeLabels = ranges
    .map(localLowerRange => createBarLabels(localLowerRange, step, upperLimit))
    .filter(labels => labels !== null);
  // Factory of functions that test a condition for each range
  const rangeConditions = ranges
    .map(from => fnRangeTest(from, step, upperLimit))
    .filter(rangeCondition => rangeCondition !== null);
  const barDataValues = dataHistory.map(elem => elem.value);
  const barData = rangeConditions.map(
    fnTest => fnTest(barDataValues).acc.length
  );
  /*Chart Options for Bar Graph*/
  const barChartData = {
    labels: rangeLabels,
    datasets: [
      {
        label: 'Number Density In Range',
        data: barData,
        backgroundColor: 'tomato',
        borderColor: 'tomato'
      }
    ]
  };
  const barChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            min: 0
          }
        }
      ]
    }
  };
  return (
    <div>
      <h3 className={styles.taskTitle}>Task 2</h3>
      <div className={styles.chartBackground}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}

export default React.memo(BarGraph);
