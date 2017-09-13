// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers'
import Home from './components/home'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <Home />
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<App />, document.querySelector('.container'))
