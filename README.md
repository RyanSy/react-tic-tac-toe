Tic Tac Toe game from the React tutorial

https://facebook.github.io/react/tutorial/tutorial.html

My own improvements:

1. Added resetGame function to reset game

2. Added 'Tie' status if no one wins

Suggested improvements (from React tutorial):  

1. Display the move locations in the format “(1, 3)” in the move list.  
* added clicked array to state - values set via handleClick(i)
* added locations array of values of move locations
* values in clicked array correspond to index of item in locations to determine move location

2. Bold the currently selected item in the move list.
* if move === this.state.stepNumber, set class of <a> to 'active'.
