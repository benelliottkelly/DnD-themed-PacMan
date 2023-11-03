// DnD THemed Pacman JS

// ! Elements
// grid
const grid = document.querySelector('.grid')
// constant cells = []
const cells = []
// score
let scoreText = document.querySelector('.current-score')
// high-score
let highScoreText = document.querySelector('.high-score')
// lives
let livesText = document.querySelector('.hearts')
// powerups
let powerupsText = document.querySelector('.powerups')

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
// monster speed
// coins
// powerups
// coinsLeft = [] // cells with coins left array

// ! Grid
// board width
const width = 28
// board height
const height = 31
// cell count = width * height
const cellCount = width * height



// function for creating grid
function createGrid() {
  // count number of cells(divs)
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    //* give each div a visable number and matching ID
    cell.innerText = `${i}`
    //* console.log(cell.innerText)
    cell.id = `${i}`
    // set width and height of cells
    cell.style.width = `${100 / width}%`
    cell.style.aspectRatio = `1`
    cell.style.border = '1px solid rgba(0, 0, 0, 0.5)'
    // append cells array to grid
    grid.append(cell)
    // push each cell into array 
    cells.push(cell)
  }
  addWalls()
  // for (let cell of cells) {
  //   if (cell.id <= 27) {
  //     cell.classList.add('wall')
  //   }
  //   console.log(`cell ${cell.id} classList is ${cell.classList}`)
  // }

}




// ! Executions
// * On map
// ? Walls

// walls = array of unavailable spaces/grids
// write each wall line by line for easier access later if changes are needed
const walls = []
const wallLine2 = [41, 42]
const wallLine3 = [58, 59, 60, 61, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 78, 79, 80, 81]
const wallLine4 = wallLine3.map( n => n + width)
const wallLine5 = wallLine4.map( n => n + width)
const wallLine7 = [170, 171, 172, 173, 175, 176, 178, 179, 180, 181, 182, 183, 184, 185, 187, 188, 190, 191, 192, 193]
const wallLine8 = wallLine7.map( n => n + width)
const wallLine9 = [231, 232, 237, 238, 243, 244]
const wallLine10 = [253, 254, 255, 256, 257, 259, 260, 261, 262, 263, 265, 266, 268, 269, 270, 271, 272, 274, 275, 276, 277, 278]
const wallLine11 = wallLine10.map( n => n + width)
const wallLine12 = [309, 310, 311, 312, 313, 315, 316, 327, 328, 330, 331, 332, 333, 334]
const wallLine13 = [337, 338, 339, 340, 341, 343, 344, 346, 347, 348, 351, 352, 353, 355, 356, 358, 359, 360, 361, 362]
const wallLine14 = [365, 366, 367, 368, 369, 371, 372, 374, 381, 383, 384, 386, 387, 388, 389, 390]
const wallLine15 = [402, 409]
const wallLine16 = wallLine14.map( n => n + width * 2)
const wallLine17 = [449, 450, 451, 452, 453, 455, 456, 458, 459, 460, 461, 462, 463, 464, 465, 467, 468, 470, 471, 472, 473, 474]
const wallLine18 = wallLine12.map( n => n + width * 6)
const wallLine19 = [505, 506, 507, 508, 509, 511, 512, 514, 515, 516, 517, 518, 519, 520, 521, 523, 524, 526, 527, 528, 529, 530]
const wallLine20 = wallLine19.map( n => n + width)
const wallLine21 = [573, 574]
const wallLine22 = wallLine3.map( n => n + width * 19)
const wallLine23 = wallLine22.map( n => n + width)
const wallLine24 = [648, 649, 666, 667]
const wallLine25 = [673, 674, 676, 677, 679, 680, 682, 683, 684, 685, 686, 687, 688, 689, 691, 692, 694, 695, 697, 698]
const wallLine26 = wallLine25.map( n => n + width)
const wallLine27 = wallLine9.map( n => n + width * 18)
const wallLine28 = [758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 769, 770, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781]
const wallLine29 = wallLine28.map( n => n + width)

const wallMap = wallLine2.concat(wallLine3, wallLine4, wallLine5, wallLine7, wallLine8, wallLine9, wallLine10, wallLine11, wallLine12, wallLine13, wallLine14, wallLine15, wallLine16, wallLine17, wallLine18, wallLine19, wallLine20, wallLine21, wallLine22, wallLine23, wallLine24, wallLine25, wallLine26, wallLine27, wallLine28, wallLine29)


function addWalls() {
  for (let cell of cells) {
    // north wall
    if (cell.id <= width) {
      walls.push(cell)
    }
    // west wall minus the gap for teleport
    if (cell.id % width === 0 && parseFloat(cell.id) !== ((cellCount - width) / 2) - width) {
    walls.push(cell)
    }
    // east wall minus gap for teleport
    if (cell.id % width === width - 1 && parseFloat(cell.id) !== ((((cellCount - width) / 2)) + (width -1) - width)) {
    walls.push(cell)
    }
    // south wall
    if (cell.id >= cellCount - width) {
    walls.push(cell)
    }
    for (w of wallMap) {
      if (parseFloat(cell.id) === w) {
        walls.push(cell)
      }
    }
    
  }
  
  for (let wall of walls) {
    wall.classList.add('wall')
  }
}

// ? startGame()
  // if game active = false
  // countdown to start using setInterval ... 3... 2... 1... Go!

  // game active = true
  // addPlayer
  // addMonsters
  // addCoins
  // addPowerUps
  // setInterval for monster movement ever 0.5? seconds
    // moveMonster(monster1)
    // moveMonster(monster2)
    // etc
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
// ? moveMonster(monsterNumber)
// monster will move every x seconds
// movement will be randomised first then potentially updated to be based on the shortest route to the player (Dijkstra’s algorithm or A*)
// monster must first leave homespaces

  // randomMovement
  // instead of random every turn, move until they collide and then chose a random direction
    // Array with [1, -1, width, 0-width]
    // i = Math.floor(Math.random() * 4)
    // monster position remove classlist
    // use same logic as movePlayer() to check monster is not moving out of map or into a wall
    // monster position += array[i]
    // monster position add classlist

  // if monster position has classlist 'hero'
    // if powerup active
    // monster goes inactive and moves home || position is reset to home
    // else
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
// call grid function
createGrid()

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

// * have a dice roll competition when monster and hero collide