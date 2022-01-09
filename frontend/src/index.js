import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' //
import store from './store' //פרוביידר סטור עוטף את האפליקציה שלנו כדי לאפשר שימוש ברדוקס
import './bootstrap.min.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Context from './actions/Context'

ReactDOM.render(
  <Provider store={store}>
    <Context>
      <App />
    </Context>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
