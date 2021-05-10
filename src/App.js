import React, { Suspense, lazy } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import todo from './views/todo/todo';
import ticTacToe from './views/ticTacToe/ticTacToe';
import home from './views/home/home';
const todohook = lazy(() => import('./views//todoHook/index'));
const practice = lazy(() => import('./views//practice/index'));
const context = lazy(() => import('./views//context/index'));
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
          <Route exact path='/' component={home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
