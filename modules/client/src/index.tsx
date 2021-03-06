import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv-flow';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultTheme } from './website/themes';
import rootReducer from './reducers';

dotenv.config();
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
