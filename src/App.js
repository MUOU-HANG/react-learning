import React, { Suspense, lazy } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import todo from './views/todo'
import ticTacToe from './views/ticTacToe'
import home from './views/home'
const todohook = lazy(() => import('./views/todoHook'))
const practice = lazy(() => import('./views/practice'))
const context = lazy(() => import('./views/context'))
const tdTable = lazy(() => import('./views/tdTable'))
const test = lazy(() => import('./views/test'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>loadding</div>}>
        <Switch>
          <Route path='/todo' component={todo} />
          <Route path='/todo-hook' component={todohook} />
          <Route path='/ticTacToe' component={ticTacToe} />
          <Route path='/practice' component={practice} />
          <Route path='/context' component={context} />
          <Route path='/tdTable' component={tdTable} />
          <Route path='/test' component={test} />
          <Route exact path='/' component={home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
