import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'

import './index.css'
import { postsAndUsers } from './postsAndUsers'
import { rootEpic } from './epics'
import { routeListener, router } from './router'
import { App } from '../views/App'

const epicMiddleware = createEpicMiddleware()


const store = configureStore({
  reducer: {
    [postsAndUsers.name]: postsAndUsers.reducer,
    [router.name]: router.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(epicMiddleware)
})
epicMiddleware.run(rootEpic)
routeListener(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App.Smart />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
