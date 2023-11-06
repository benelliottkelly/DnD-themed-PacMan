// DnD THemed Pacman JS

// ! Elements
// grid
const grid = document.querySelector('.grid')
// constant cells = []
let cells
// score
let scoreText = document.querySelector('.current-score')
// high-score
let highScoreText = document.querySelector('.high-score')
// start button
let startButton = document.querySelector('#start')
// lives
let livesText = document.querySelector('.hearts')
// powerups
let powerupsText = document.querySelector('.powerups')


// ! Variables
// * player
// player current position
let playerPosition
// player health
let playerHealth = 3
// score
let playerScore = 0
// player powerups

// * monsters
class Monsters {
  constructor (name, startPosition) {
    this.name = name,
    this.startPosition = startPosition,
    this.currentPosition = 0,
    this.currentDirection = 0,
    this.state = 'neutral'
  }
}
// monster 1 start/home
const beholder = new Monsters('beholder', 376)
// monster 2 start/home
const cube = new Monsters('cube', 379)
// monster 3 start/home
const lich = new Monsters('lich', 432)
// monster 4 start/home
const spider = new Monsters('spider', 435)


// monster 1 state (chasing or running away)
// monster 2 state (chasing or running away)
// monster 3 state (chasing or running away)
// monster 4 state (chasing or running away)

// * environment
// game active? = false
let gameActive = false
// global count for monster movement
let gameInterval
// monster speed
let monsterSpeed = 500
// powerups
// coinsLeft = [] // cells with coins left array
let coinsLeft = []

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
    cell.classList.add('cell')
    // set width and height of cells
    cell.style.width = `${100 / width}%`
    cell.style.aspectRatio = `1`
    cell.style.border = '1px solid rgba(0, 0, 0, 0.5)'
    // append cells array to grid
    grid.append(cell)
    // push each cell into array 
    // cells.push(cell)
  }
  cells = document.querySelectorAll('.cell')
//* here if breaks  cells[657].classList.add('hero')

  addWalls()
  // for (let cell of cells) {
  //   if (cell.id <= 27) {
  //     cell.classList.add('wall')
  //   }
  //   console.log(`cell ${cell.id} classList is ${cell.classList}`)
  // }

}



// ! Executions

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

// coins

const coins = []
const coinLine2 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
const coinLine3 = [57, 62, 68, 71, 77, 82]
const coinLine4 = coinLine3.map( n => n + width)
const coinLine5 = coinLine4.map( n => n + width)
const coinLine6 = [141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166]
const coinLine7 = [169, 174, 177, 186, 189, 194]
const coinLine8 = coinLine7.map( n => n + width)
const coinLine9 = [225, 226, 227, 228, 229, 230, 233, 234, 235, 236, 239, 240, 241, 242, 245, 246, 247, 248, 249, 250]
const coinLine10 = [258, 273]
const coinLine11 = coinLine10.map( n => n + width)
const coinLine12 = coinLine11.map( n => n + width)
const coinLine13 = coinLine12.map( n => n + width)
const coinLine14 = coinLine13.map( n => n + width)
const coinLine15 = coinLine14.map( n => n + width)
const coinLine16 = coinLine15.map( n => n + width)
const coinLine17 = coinLine16.map( n => n + width)
const coinLine18 = coinLine17.map( n => n + width)
const coinLine19 = coinLine18.map( n => n + width)
const coinLine20 = coinLine19.map( n => n + width)
const coinLine21 = coinLine2.map( n => n + width * 19)
const coinLine22 = coinLine3.map( n => n + width * 19)
const coinLine23 = coinLine3.map( n => n + width * 20)
const coinLine24 = [645, 646, 647, 650, 651, 652, 653, 654, 655, 656, 659, 660, 661, 662, 663, 664, 665, 668, 669, 670]
const coinLine25 = [675, 678, 681, 690, 693, 696]
const coinLine26 = coinLine25.map( n => n + width)
const coinLine27 = coinLine9.map( n => n + width * 18)
const coinLine28 = [757, 768, 771, 782]
const coinLine29 = coinLine28.map( n => n + width)
const coinLine30 = coinLine6.map( n => n + width * 24)

const coinMap = coinLine2.concat(coinLine3, coinLine4, coinLine5, coinLine6, coinLine7, coinLine8, coinLine9, coinLine10, coinLine11, coinLine12, coinLine13, coinLine14, coinLine15, coinLine16, coinLine17, coinLine18, coinLine19, coinLine20, coinLine21, coinLine22, coinLine23, coinLine24, coinLine25, coinLine26, coinLine27, coinLine28, coinLine29, coinLine30)

function addCoins() {
  for (let cell of cells) {
    for (c of coinMap) {
      if (parseFloat(cell.id) === c) {
        coins.push(cell)
      }
    }
  }
  for (let coin of coins) {
    coin.classList.add('coins')
  }
}
// * On map
// * page load
// call grid function
  createGrid()
// add coins
  addCoins()
// ? startGame()
function startGame () {
  if (gameActive === false) {
    clearInterval(gameInterval)
    gameActive === true
    // countdown to start using setInterval ... 3... 2... 1... Go!

    // game active = true
    // addPlayer
    spawnPlayer()
    // addMonsters
    spawnMonster(beholder)
    spawnMonster(cube)
    spawnMonster(lich)
    spawnMonster(spider)
    // addCoins
    // addPowerUps
    // setInterval for monster movement ever 0.5? seconds
    gameInterval = setInterval(() => {
      // moveMonsters
      moveMonster(beholder)
      moveMonster(cube)
      moveMonster(lich)
      moveMonster(spider)
    // potential to delay each monster so they leave one after the other

    // if player lives === 0
    if (playerHealth === 0) {
      console.log(`Game over!`)
      clearInterval(gameInterval)
    }
    // gameOver()

    // coinsLeft = grids.filter() => classList.contains('coins'))
      // if (!coinsLeft || !coinsLeft.length) {youWin()}
    }, monsterSpeed)
  }
}

// * Player

// add player to start position
function spawnPlayer(){
  const coinflip = Math.floor(Math.random() * 2)
//  cells = document.querySelectorAll('.cell')
// console.log(cells)
  coinflip ? cells[658].classList.add('hero') : cells[657].classList.add('hero')
  coinflip ? playerPosition = 658 : playerPosition = 657
}

// seperate function to move the image representing the player 
function moveHero() {
  cells[playerPosition].classList.add('hero')
} 

function removeHero() {
  cells[playerPosition].classList.remove('hero')
}

// ? isWall()
// function to calculate if new position is a wall or not

// ? movePlayer()
function movePlayer(evt) {
  const key = evt.code
  // prevent screen from scrolling when pressing arrow keys
  evt.preventDefault()
  // only when game active = true

  // remove current player position
  removeHero()
  // move the player based on keyboard inputs
  // prevent leaving map and going through walls
  if ((key === 'ArrowUp' || key === 'KeyW') && playerPosition - width >= 0 && cells[playerPosition - width].classList.contains('wall') === false) {
    playerPosition -= width
  } else if ((key === 'ArrowDown' || key === 'KeyS') && playerPosition + width < cells.length && cells[playerPosition + width].classList.contains('wall') === false) {
	  playerPosition += width
  } else if ((key === 'ArrowLeft' || key === 'KeyA') && playerPosition % width !== 0 && cells[playerPosition - 1].classList.contains('wall') === false) {
    playerPosition --
  } else if ((key === 'ArrowRight' || key === 'KeyD') && playerPosition % width !== -1 && cells[playerPosition + 1].classList.contains('wall') === false) {
		playerPosition ++
  // teleport through east and west walls
  } else if ((key === 'ArrowLeft' || key === 'KeyA') && playerPosition === ((cellCount - width) / 2) - width) {
    playerPosition = (((cellCount - width) / 2)) + (width -1) - width
  } else if ((key === 'ArrowRight' || key === 'KeyD') && playerPosition === ((((cellCount - width) / 2)) + (width -1) - width)) {
    playerPosition = ((cellCount - width) / 2) - width
  }
  // add new player position
  moveHero()
  if (cells[playerPosition].classList.contains('beholder', 'cube', 'lich', 'spider')) {
    loseLife()
  }
  // loot()
  loot()

}

// * Monsters
// spawnMonsters
function spawnMonster(monster) {
  cells[monster.startPosition].classList.add(`${monster.name}`)
  monster.currentPosition = monster.startPosition
}

function removeMonster() {
  for (let cell of cells) {
  // console.log(cell.classList)
  cell.classList.remove('beholder')
  cell.classList.remove('cube')
  cell.classList.remove('lich')
  cell.classList.remove('spider')
  }
}

// ? moveMonster(monsterNumber)
function moveMonster(monster) {
// variables for checking if position NSEW of monster are walls
let wallNorth = cells[monster.currentPosition - width].classList.contains('wall')
let wallSouth = cells[monster.currentPosition + width].classList.contains('wall')
let wallEast = cells[monster.currentPosition + 1].classList.contains('wall')
let wallWest = cells[monster.currentPosition -1].classList.contains('wall')
  // function for changing monster direction
  function changeDirection() {
    const direction = [- width, + width, -1, +1]
    let randomNumber = Math.floor(Math.random() * 4)
    while (cells[monster.currentPosition + direction[randomNumber]].classList.contains('wall') === true) {
      randomNumber = Math.floor(Math.random() * 4)
    }
      monster.currentPosition = monster.currentPosition + direction[randomNumber]
      monster.currentDirection = parseInt(direction[randomNumber])
  }
  //  console.log(monster.currentPosition)
    cells[monster.currentPosition].classList.remove(`${monster.name}`)
    // if monster is in starting cells move out
    if (monster.currentPosition === 375 || monster.currentPosition === 376 || monster.currentPosition === 403 || monster.currentPosition === 404 || monster.currentPosition === 431 || monster.currentPosition === 432) {
      monster.currentPosition ++
    } else if (monster.currentPosition === 379 || monster.currentPosition === 380 || monster.currentPosition === 407 || monster.currentPosition === 408 || monster.currentPosition === 435 || monster.currentPosition === 436) {
      monster.currentPosition --
    } else if (monster.currentPosition === 349 || monster.currentPosition === 350 || monster.currentPosition === 377 || monster.currentPosition === 378 || monster.currentPosition === 405 || monster.currentPosition === 406 || monster.currentPosition === 433 || monster.currentPosition === 434){
      monster.currentPosition -= width
      monster.currentDirection = 0 - width
      // if monster reaches a junction chose random direction
    } else if ((wallNorth === false && wallEast === false) || (wallNorth === false && wallWest === false) || (wallSouth === false && wallEast === false) || (wallSouth === false && wallWest === false)) {
        changeDirection()
        // if monster is moving in a direction and can continue in that direction, keep going until it hits a wall
      } else if (monster.currentDirection != 0) {
        if (monster.currentPosition === ((cellCount - width) / 2) - width && monster.currentDirection === + 1) {
        monster.currentPosition = (((cellCount - width) / 2)) + (width -1) - width
      } else if (monster.currentPosition === ((((cellCount - width) / 2)) + (width -1) - width) && monster.currentDirection === -1) {
        monster.currentPosition = ((cellCount - width) / 2) - width
      } else if (wallNorth === false && monster.currentDirection === (0 - width)) {
        monster.currentPosition -= width
        monster.currentDirection = 0 - width
      } else if (wallSouth === false && monster.currentDirection === (0 + width)) {
        monster.currentPosition += width
        monster.currentDirection = 0 + width
      } else if (wallWest === false && monster.currentDirection === (-1)) {
        monster.currentPosition --
        monster.currentDirection = 0 - 1
      } else if (wallEast === false && monster.currentDirection === (+1)) {
        monster.currentPosition ++
        monster.currentDirection = 0 + 1
      } else {
        changeDirection()
      }
    }
    cells[monster.currentPosition].classList.add(`${monster.name}`)
    if (cells[monster.currentPosition].classList.contains('hero')) {
      loseLife()
    }
}

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

// ? loseLife()
function loseLife() {
  playerHealth --
  console.log(playerHealth)
  removeHero()
  removeMonster()
  setTimeout(() => {
    spawnPlayer()
    spawnMonster(beholder)
    spawnMonster(cube)
    spawnMonster(lich)
    spawnMonster(spider)
  }, 1000)
}


// when a monster comes into contact with player player loses life
// reset player position
// reset monsters positions

// ? loot()
function loot(){
  if (cells[playerPosition].classList.contains('coins')) {
    playerScore += 100
    scoreText.innerText = `Current Score: ${parseInt(playerScore)}`
    cells[playerPosition].classList.remove('coins')
  } 
}
// if player walks over cell with a coin on it they add to score
// if playerPosition has class of coin add to score
// remove classList 'coin'


// ? powerUp()
// player either becomes invincible or gains a bonus to their roll
// this will either be on a timer if invincible or last the game if a bonus

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
startButton.addEventListener('click', startGame)
// * keyboard input
const keyboardInput = document.addEventListener('keydown', movePlayer)

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