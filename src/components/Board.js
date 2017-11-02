import React from 'react';
import Square from './Square.js'

export default class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square id={i} className="highlighted" key={i} value={squares[i]} onClick={() => this.props.onClick(i)} />;
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
