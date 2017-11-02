import React from 'react';
import Board from './Board.js'

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      clicked: [],
      sortMovesAscending: true,
    };
  }

  calculateWinner(squares) {
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

  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var clicked = this.state.clicked.slice(0, this.state.stepNumber);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
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

  highlightWinners(squares) {
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
        return([a, b, c]);
      }
    }
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

  sortMoves() {
    this.setState({
      sortMovesAscending: !this.state.sortMovesAscending,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
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
      const desc = move ? 'Move #' + move + ' ' + locations[clicked[move - 1]] : 'Game Start';
      const title = "Jump to " + desc;
      const active = (move === this.state.stepNumber) ? 'active' : '';
      return (
        <li key={move}>
          <a className={active} href="#" title={title} onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    (this.state.sortMovesAscending === false) ? moves.sort((a, b) => { return b.key - a.key; }) : moves.sort((a, b) => { return a.key - b.key; });

    const highlighted = this.highlightWinners(current.squares);
    console.log(highlighted);
    //for each square in highlighted array, add class to html element

    return (
      <div className="game">
        <div>
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          <br></br>
          <a href="#" title="Reset Game" onClick={() => this.resetGame()}>Reset Game</a>
        </div>
        <div className="game-info">
          <div>{status}&nbsp;<a id="sort-icon" href="#" title="Toggle Ascending/Descending" onClick={() => this.sortMoves()}><img src={require('../img/sort-icon.png')} alt="sort-icon"/></a></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
