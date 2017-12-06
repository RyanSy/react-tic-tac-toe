import React from 'react';
import Square from './Square.js'

export default class Board extends React.Component {
  renderSquare(i) {
    const squares = this.props.squares;
    const images = [];
    if (squares[i] === 'React') {
      images[i] = <img src={require("../../public/img/react.png")} alt="React"/>;
    } else if (squares[i] === 'Angular') {
      images[i] = <img src={require("../../public/img/angular.png")} alt="Angular"/>;
    }
    return <Square id={i} key={i} value={squares[i]} image={images[i]} highlighted={this.props.highlighted} onClick={() => this.props.onClick(i)} />;
    return <Square id={i} key={i} value={squares[i]} highlighted={this.props.highlighted} onClick={() => this.props.onClick(i)} />;
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
