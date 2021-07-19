import React, { Suspense, lazy } from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import todo from './src/pages/todo'
import ticTacToe from './src/pages/ticTacToe'
import home from './src/pages/home'
const todohook = lazy(() => import('./src/pages/todoHook'))
const practice = lazy(() => import('./src/pages/practice'))
const context = lazy(() => import('./src/pages/context'))
const tdTable = lazy(() => import('./src/pages/tdTable'))
const test = lazy(() => import('./src/pages/test'))
const memo = lazy(() => import('./src/pages/memo'))
const todolistGuigu = lazy(() => import('./src/pages/todolist_guigu'))
const hookRedux = lazy(() => import('./src/pages/hookRedux'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>loadding</div>}>
        <Switch>
          <Route component={todo}
            path="/todo"
          />
          <Route component={todohook}
            path="/todo-hook"
          />
          <Route component={ticTacToe}
            path="/ticTacToe"
          />
          <Route component={practice}
            path="/practice"
          />
          <Route component={context}
            path="/context"
          />
          <Route component={tdTable}
            path="/tdTable"
          />
          <Route component={test}
            path="/test"
          />
          <Route component={memo}
            path="/memo"
          />
          <Route component={todolistGuigu}
            path="/todolist_guigu"
          />
          <Route component={hookRedux}
            path="/hookRedux"
          />
          <Route component={home}
            exact
            path="/"
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
