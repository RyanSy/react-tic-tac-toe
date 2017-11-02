import React from 'react';
// import Game from './Game.js'

function Square(props) {
  console.log(props);
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

module.exports = Square;
