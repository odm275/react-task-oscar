## React Task

Read more about this assessment here

### Technologies Used

- [React](https://reactjs.org/) - JavaScript front end framework(Create React App).
- [React Chartjs 2](https://www.chartjs.org/) - React wrapper for Chart.js.
- [React Toastify](https://www.npmjs.com/package/react-toastify) - For the threshold notifcation.


### Set up

- To set up locally: 
    1) Clone the repo.
    2) Run `yarn` in the root to install server dependecies.
    3) Then `cd app` and run `yarn` to install the client dependencies. 
    4) Then `cd ..` back to the root level and run `yarn dev` to run the app(server, and client).
- Server runs by default on `port 3010`, create react app runs by default on `port 3000`, and socketIOClient is listening to `port 3010` in the client.
- All components are under `/app/src/`.
- There is a single file under `/app/helpers/` with some custom helpers functions that I used for the Bar Graph.


### Additional Notes for the Bar Graph

- For the Bar Graph, feel free to change the initial parameters. In this case, the socket can only feed the range `[-100,100]`, so changing the step is the only one that will have a true effect.
- For the Bar Graph, in the horizontal axis you will see the interval labels in the format `[x,x+step)`. This format follows logically as it would in math.
    - For example, [3, 8) is the interval of real numbers between 3 and 8, including 3 and excluding 8.
    - For example, [3, 8] is the interval of real numbers between 3 and 8, including 3 and including 8.
- For the Bar Graph, if the range is not split evenly for some set of parameters, the left over range will have its own bar and range label. (Ex:lowerLimit = -100, upperLimit = 100, step = 9. Hence, the left over range is `[98,100]`).
- For the Bar Graph, the y axis will grow as the max count grows.

### Additional Notes for the Bar Alert Threshold

- Put in a Number in the input field, and hit "Turn Alert Threshold On". You can also turn the alert off ... the alerts can really start firing like bullets depending on your number input.

### Additional Notes 
- Tomato is the best!
