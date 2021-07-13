import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h2>
        <Link to='/todo'>todo列表</Link>
      </h2>
      <h2>
        <Link to='/ticTacToe'>三字棋</Link>
      </h2>
      <h2>
        <Link to='/todo-hook'>todo列表(hooks版)</Link>
      </h2>
      <h2>
        <Link to='/practice'>练习页面</Link>
      </h2>
      <h2>
        <Link to='/context'>Context</Link>
      </h2>
      <h2>
        <Link to='/tdTable'>TD Table</Link>
      </h2>
      <h2>
        <Link to='/test'>测试页面</Link>
      </h2>
    </div>
  )
}

export default Home
