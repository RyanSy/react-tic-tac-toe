import React from 'react';

function Square(props) {
  var squareClass;
  if (props.highlighted !== undefined) {
    if (props.id === props.highlighted[0] || props.id === props.highlighted[1] || props.id === props.highlighted[2]) {
      squareClass = "square highlighted";
    } else {
      squareClass = "square";
    }
  } else {
    squareClass = "square";
  }
  return (
    <button id={props.id} className={squareClass} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

module.exports = Square;
