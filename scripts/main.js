// DnD THemed Pacman JS

// ! Elements
// grid
// constant cells = []
// score
// high-score
// lives
// powerups

// ! Variables
// * player
// player start position
// player current position
// player health
// player powerups

// * monsters
// monster 1 start/home
// monster 2 start/home
// monster 3 start/home
// monster 4 start/home
// monster 1 state (chasing or running away)
// monster 2 state (chasing or running away)
// monster 3 state (chasing or running away)
// monster 4 state (chasing or running away)

// * environment
// game active? = false
// global count for monster movement
// walls = array of unavailable spaces/grids
// coins
// powerups
// coinsLeft = [] // cells with coins left array

// ! Grid
// board width
// board height
// cell count = width * height

// function for creating grid
  // count number of cells(divs)
  // give each div a visable number and matching ID
  // set width and height of cells
  // append cells array to grid
  // push each cell into array 

// ! Executions
// * On map
// ? startGame()
  // if game active = false
  // countdown to start using setInterval ... 3... 2... 1... Go!

  // game start = true
  // addPlayer
  // addMonsters
  // addCoins
  // addPowerUps
  // setInterval for monster movement ever 0.5? seconds
  // potential to delay each monster so they leave one after the other

  // if player lives === 0
  // gameOver()

  // coinsLeft = grids.filter() => classList.contains('coins'))
    // if (!coinsLeft || !coinsLeft.length) {youWin()}

// * Player
// ? addPlayer()
// add player to start position

// ? isWall()
// function to calculate if new position is a wall or not

// ? movePlayer()
// only when game active = true
// move the player based on keyboard inputs
// prevent leaving map and going through walls
// if (key === 'ArrowUp' || key === 'W' && currentPostion - width >= 0 && grid[currentPosition - width].classList.contains('wall') === false)
// repeat for right, left and down
// loot()

// ? loseLife()
// when a monster comes into contact with player player loses life
// reset player position
// reset monsters positions

// ? loot()
// if player walks over cell with a coin on it they add to score
// if playerPosition has class of coin add to score
// remove classList 'coin'


// ? powerUp()
// player either becomes invincible or gains a bonus to their roll
// this will either be on a timer if invincible or last the game if a bonus

// * Monsters
// ? moveMonster()
// monster will move every x seconds
// movement will be randomised first then potentially updated to be based on the shortest route to the player (Dijkstra’s algorithm or A*)
// monster must first leave homespaces

  // randomMovement
    // Array with [1, -1, width, 0-width]
    // i = Math.floor(Math.random() * 4)
    // monster position remove classlist
    // use same logic as movePlayer() to check monster is not moving out of map or into a wall
    // monster position += array[i]
    // monster position add classlist

  // if monster position has classlist 'hero'
  // loseLife

  // * Game state
  // ? gameOver()
  // clearInterval global monster movement
  // game active = false
  // display score nicely on screen

  // ? youWin()
  // clearInterval
  // congratulations message
  // play again/next level

// ! Events
// * start button

// * keyboard input

// * page load

// ! stretch goals

// * user input name for high score

// * monster AI movement
 // A*
  // create two arrays:
    // open array (cells that can be evaluated)
    // closed array (cells that have already been evaluated/are walls)
    // add start cell (cell monster is on) to open
  // start a loop
  // current = node in open with lowest f_cost
  // remove current from open
  // add current to closed

  //if current is the target node (where player is)
      // execute move in that direction
  
  // foreach neighbour of the current node
    // if neighbour is not traversable or neighbour is in closed array
      // skip to next neighbour
    // if neighbour is shorter OR neighbour is not in open
      // set f_cost of neighbour
      // set parent of neighbour to current
      // if neighbour is not in open
        // add neighbour to open

// * speed up monsters each level advanced