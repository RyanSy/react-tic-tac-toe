Tic Tac Toe game from the React tutorial

https://facebook.github.io/react/tutorial/tutorial.html

Suggested improvements done (from React tutorial):  

1. Display the move locations in the format “(1, 3)” in the move list.  
* added ```clicked``` array to state - values set via ```handleClick(i)```
* added ```locations``` array of values of move locations
* values in ```clicked``` array correspond to index of item in ```locations``` to determine move location

2. Bold the currently selected item in the move list.
* ```if move === this.state.stepNumber```, set class of <a> to 'active'.

3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
* created 2 arrays - 1 for board rows and 1 for rendered squares
* used 2 for loops - first one to iterate three times to make the rows, and a for loop inside the first one to render squares
* created index variable for ```renderSquare``` function to take in as an argument to render each squares
* emptied rendered squares array after each row was made

4. Add a toggle button that lets you sort the moves in either ascending or descending order.
* added ```sortMovesAscending: true,``` to state
* added  ```sortMoves``` function to set state after toggle button is pressed
* sort through ```moves``` using if statement

5. When someone wins, highlight the three squares that caused the win.
* added ```highlightWinners``` function to return array of winning square indexes
* stored array as a ```Board``` prop
* added square indexes as IDs on each button
* if ID = index of winning square, set class to highlighted

My own improvements added:

1. Added ```resetGame``` function to reset game

2. Added 'Tie' status if no one wins

3. Changed 'X' vs. 'O' to 'React' vs. 'Angular' images
