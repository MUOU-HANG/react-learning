import React from 'react'
import './ticTacToe.css'
// 计算输赢
function calculateWinner(squares) {
  const lines = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [ a, b, c ] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
// 游戏主体
class Game extends React.Component {
  render() {
    return (
      <div className="ticApp-wrap">
        <div>
          <h1>三字棋</h1>
        </div>
        <Board />
      </div>
    )
  }
}

// 单个方块
class Square extends React.Component {
  render() {
    return (
      <button className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    )
  }
}

// 九宫格
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null)
    }
  }
  // 单个方块生成
  renderSquare(i) {
    return (
      <Square
        onClick={() => this.handelClick(i)}
        value={this.state.squares[i]}
      />
    )
  }

  // 点击事件
  handelClick(i) {
    let squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }
  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner is ' + winner
    } else {
      status = `next player is ${this.state.xIsNext ? 'X' : 'O'}`
    }
    return (
      <div className="square-box">
        <div className="status">{status}</div>
        <div className="square-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="square-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="square-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}
export default Game
