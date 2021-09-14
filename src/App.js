import React, { Suspense, lazy } from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import todo from './pages/todo'
import ticTacToe from './pages/ticTacToe'
import home from './pages/home'
const todohook = lazy(() => import('./pages/todoHook'))
const practice = lazy(() => import('./pages/practice'))
const context = lazy(() => import('./pages/context'))
const tdTable = lazy(() => import('./pages/tdTable'))
const test = lazy(() => import('./pages/test'))
const memo = lazy(() => import('./pages/memo'))
const todolistGuigu = lazy(() => import('./pages/todolist_guigu'))
const hookRedux = lazy(() => import('./pages/hookRedux'))
const markdown = lazy(() => import('./pages/markdown'))

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
          <Route component={markdown}
            path="/markdown"
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
