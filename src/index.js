import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square key={i} value={squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    var boardRows = [];
    var renderedSquares = [];
    var index = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        renderedSquares.push(this.renderSquare(index));
        index++;
      }
      boardRows.push(<div key={index} className="board-row">{renderedSquares}</div>)
      renderedSquares = [];
    }
    return <div>{boardRows}</div>
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      clicked: [],
    };
  }

  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var clicked = this.state.clicked.slice(0, this.state.stepNumber);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      clicked: clicked.concat(i),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      clicked: [],
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if (!winner && (history.length === 10)) {
      status = 'Tie';
    }
    const locations = ['(1, 1)', '(1, 2)', '(1, 3)', '(2, 1)', '(2, 2)', '(2, 3)', '(3, 1)', '(3, 2)', '(3, 3)'];
    const clicked = this.state.clicked;
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move + ' ' + locations[clicked[move - 1]] : 'Game start';
      const active = (move === this.state.stepNumber) ? 'active' : '';
      return (
        <li key={move}>
          <a className={active} href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    return (
      <div className="game">
        <div>
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          <br></br>
          <a href="#" onClick={() => this.resetGame()}>Reset Game</a>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
