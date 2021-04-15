import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";
import taskReducer from './reducers/taskreducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// const allReducer = combineReducers({
//   tasks:taskReducer
// });

const mystore = createStore(taskReducer,composeWithDevTools());// TODO add reducer

ReactDOM.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
