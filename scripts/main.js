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
// click to insertcoin/start
let insertCoins = document.querySelector('.insert-coins')
// coin animation
let hoverCoin = document.querySelector('.payment')
// countdown timer
let countDownDisplay = document.querySelector('h1')
// lives
let hearts = document.getElementsByClassName('life')
// powerups
let powerUpsText = document.querySelector('.powerups')
// gameoverContainer
let gameOverContainer = document.querySelector('.game-over')
// gameover
let gameOverText = document.querySelector('h2')
// play again/ continue button
let gameOverBtn = document.querySelector('.game-over-button')


// ! Variables
// * player
// player current position
let playerPosition
// player health
let playerHealth = 3
// score
let playerScore = 0
// player continuing or restarting
let playerContinue = false
// high score
let playerHighScore = localStorage.getItem("high-score")
playerHighScore ? highScoreText.innerText = `High Score: ${parseInt(playerHighScore)}` : highScoreText.innerText = `High Score: 0`
// stop player moving before the game fully starts
let playerLocked = true


// * monsters
class Monsters {
  constructor (name, startPosition, delayTimer) {
    this.name = name,
    this.startPosition = startPosition,
    this.delayTimer = delayTimer,
    this.currentPosition = 0,
    this.currentDirection = 0,
    this.state = 'active'
    enemies.push(this)
  }
}

const enemies = []

// monster 1 start/home
const beholder = new Monsters('beholder', 376, 0)
// monster 2 start/home
const cube = new Monsters('cube', 379, 2000)
// monster 3 start/home
const lich = new Monsters('lich', 432, 4000)
// monster 4 start/home
const spider = new Monsters('spider', 435, 6000)

const enemyClasses = ['beholder', 'cube', 'lich', 'spider']

// * environment
// game active? = false
let gameActive = false
// countdown to start game
let countDown = 3
// global count for monster movement
let gameInterval
// monster speed
let monsterSpeed = 500
// powerups
let powerUpActive = false
let powerUpTimer
let powerUpFlashing
// coinsLeft = [] // cells with coins left array
let coinsLeft = []
// game paused while functions execute properly
let gamePaused = false


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
  }
  cells = document.getElementsByClassName('cell')
  addWalls()
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

// * add coins to grid
const coins = []
const coinLine2 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
const coinLine3 = [57, 62, 68, 71, 77, 82]
const coinLine4 = [90, 96, 99, 105]
const coinLine5 = [113, 118, 124, 127, 133, 138]
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
const coinLine24 = [646, 647, 650, 651, 652, 653, 654, 655, 656, 659, 660, 661, 662, 663, 664, 665, 668, 669]
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
// * add power-ups to grid
let powerUpsGrid = [85, 110, 645, 670]
function addPowerUps() {
  for (let cell of cells) {
    for (p of powerUpsGrid) {
      if (parseFloat(cell.id) === p) {
        cell.classList.add('powerUp')
      }
    }
  }
}

// * On map
// * page load
// call grid function
  createGrid()

// ! Main game functions
// ? startGame()
function startGame () {
  hideCoin()
  playerLocked = true
  countDownDisplay.style.display = 'block'
  if (gameActive === false) {
    countDown = 3
    countDownDisplay.innerText = countDown
    gameOverContainer.style.display = 'none'
    clearInterval(gameInterval)
    let countDownTimer = setInterval(function() {
      countDown--
      countDownDisplay.innerText = countDown
      if (countDown <= 0) {
        clearInterval(countDownTimer)
        countDownDisplay.innerText = 'GO!'
      }
    }, 1000)
    if (playerContinue === false) {
      playerScore = 0
      scoreText.innerText = `Current Score: ${parseInt(playerScore)}`
      monsterSpeed = 500
      playerHealth = 3
      hearts[2].style.display = 'flex'
      hearts[1].style.display = 'flex'
      hearts[0].classList.remove('heart-broken')
    } else if (playerContinue === true && monsterSpeed > 100){
      monsterSpeed -= 100
    }
    // add coins
    addCoins()
    // add power ups
    addPowerUps()
    powerUpTimer = clearTimeout
    powerUpFlashing = clearInterval
    powerUpsText.classList.remove('powerUpIcon')
    powerUpActive = false
    gameActive = true
    // countdown to start using setInterval ... 3... 2... 1... Go!

    // addPlayer
    spawnPlayer()
    // addMonsters
    spawnMonster(beholder)
    spawnMonster(cube)
    spawnMonster(lich)
    spawnMonster(spider)
    let gameStart = setTimeout(function() {
      playerLocked = false
      countDownDisplay.style.display = 'none'
      // delay each monster so they leave one after the other
      beholder.status = 'active'
      let cubeTimeout = setTimeout(function() {cube.status = 'active'}, cube.delayTimer)
      let lichTimeout = setTimeout(function() {lich.status = 'active'}, lich.delayTimer)
      let spiderTimeout = setTimeout(function() {spider.status = 'active'}, spider.delayTimer)
      // setInterval for monster movement ever 0.5? seconds
      gameInterval = setInterval(() => {
        if (gamePaused === false) {
          // * moveMonsters
          // monsters in the active chasing mode
          if (beholder.status === 'active' || beholder.status === 'inDanger') {
            chase(beholder)
            }
          if (cube.status === 'active' || cube.status === 'inDanger') {
            moveMonster(cube)
          }  
          if (lich.status === 'active' || lich.status === 'inDanger') {
            moveMonster(lich)
          } 
          if (spider.status === 'active') {
            chase(spider)
          }
          if (spider.status === 'inDanger') {
            moveMonster(spider)
          }
          if (beholder.status === 'fleeing') {
            fleeing(beholder)
          }
          if (cube.status === 'fleeing') {
            fleeing(cube)
          }
          if (lich.status === 'fleeing') {
            fleeing(lich)
          }
          if (spider.status === 'fleeing') {
            fleeing(spider)
          }
          // change health display as player loses lives
          if (playerHealth === 2) {
            hearts[2].style.display = 'none'
          } else if (playerHealth === 1) {
            hearts[1].style.display = 'none'
          } else if (playerHealth === 0) {
            hearts[0].classList.add('heart-broken')
          }
          // if player lives === 0
          if (playerHealth === 0) {
            setHighScore()
            playerContinue = false
            gameOverText.innerText = `GAME OVER!${'\n'}You were unable to escape the dungeon...${'\n'}Your final score was: ${playerScore}`
            gameOverBtn.innerText = `Play Again`
            gameOverContainer.style.display = 'block'
            clearInterval(gameInterval)
            gameActive = false
          }
          // gameOver()
          coinsUntilWin()
          if (coinsLeft === 0) {
            setHighScore()
            playerContinue = true
            gameActive = false
            gameOverText.innerText = `CONGRATULATIONS!${'\n'}You managed to gather all of the treasure...${'\n'}Your current score is: ${playerScore}${'\n'}Would you like to delve deeper?...`
            gameOverBtn.innerText = `Continue...`
            gameOverContainer.style.display = 'block'
            clearInterval(gameInterval)
          }
        }
      }, monsterSpeed)
    }, 4000)
  }
}

// * Player

// add player to start position
function spawnPlayer(){
  for (let cell of cells) {
    cell.classList.remove('hero')
    }
  const coinflip = Math.floor(Math.random() * 2)
  coinflip ? cells[658].classList.add('hero') : cells[657].classList.add('hero')
  coinflip ? playerPosition = 658 : playerPosition = 657
}

// seperate function to move the image representing the player 
function moveHero() {
  cells[playerPosition].classList.add('hero')
} 

// function to remove hero icon when moving or dying
function removeHero() {
  for (let cell of cells) {
    cell.classList.remove('hero')
    }
}

// ? isWall()
// function to calculate if new position is a wall or not

// ? movePlayer()
function movePlayer(evt) {
  
  const key = evt.code
  // prevent screen from scrolling when pressing arrow keys
  evt.preventDefault()
  // only when game active = true
  if (gameActive === true && gamePaused === false && playerLocked === false) {
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
  if (cells[playerPosition].classList.contains('powerUp')) {
    cells[playerPosition].classList.remove('powerUp')
    powerUp()
  }
  // add new player position
  if (cells[playerPosition].classList.contains('beholder') || cells[playerPosition].classList.contains('cube') || cells[playerPosition].classList.contains('lich') || cells[playerPosition].classList.contains('spider')) {
    loseLife()
  }
  moveHero()
  // loot()
  loot()
  }
}

// * Monsters
// spawnMonsters
function spawnMonster(monster) {
  // this performs the function of remove monster
  cells[monster.currentPosition].classList.remove(`${monster.name}`)
  monster.currentPosition = monster.startPosition
  cells[monster.startPosition].classList.add(`${monster.name}`)
}

function removeMonster() {
  // console.log(typeof cells)
  // console.log(cells)
  //cells.forEach(cell => cell.classList.remove('beholder', 'cube', 'lich', 'spider'))
  for (let cell of cells) {
  // console.log(cell.classList)
    cell.classList.remove(...enemyClasses)
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
    if (cells[monster.currentPosition].classList.contains('hero') && monster.status === 'active') {
      loseLife()
    }
}

// ! dijkstras

function chase(monster){
  if (true) {
    cells[monster.currentPosition].classList.remove(`${monster.name}`)
  }
  let newPosition = dijkstras(monster.currentPosition, playerPosition)
  monster.currentPosition = newPosition
  cells[monster.currentPosition].classList.add(`${monster.name}`)
  if (cells[monster.currentPosition].classList.contains('hero')) {
    loseLife()
  }
}

// dijkstras(50, 124)
function dijkstras(start, end) {

  // Initialize the distance from the starting node to all other nodes as infinite
  let distances = {}
  for (let i = 0; i < cells.length; i++) distances[i] = Infinity
  // Distance from start node is 0
  distances[end] = 0
  let currentVertex = end // this will be the player
  // list of visited vertices
  let visited = []
  // unvisited (makes a queue of vertices to check)
  let unVisited = []
  unVisited.push(currentVertex)

  while (unVisited.length > 0){
    unVisited.forEach(value => {
      currentVertex = value
      // get surrounding cells and remove walls
      const neighbours = [currentVertex +1, currentVertex -1, currentVertex + width, currentVertex -width].filter(neighbour => !cells[neighbour].classList.contains('wall'))
      // console.log(neighbours)
      // console.log(distances)
      // if current cost + 1 is lower than existing cost update cost
      neighbours.forEach(neighbour => {
        // console.log(`distances[neighbour] value of neighbour = ${distances[neighbour]}`)
        // console.log(distances[currentVertex])
        // distances neighbour is the existing score
        // distances current is the new score
        // we need to check if existing score is greater than new score, if true we update to the existing score to equal the new score
        if (distances[neighbour] > distances[currentVertex] + 1) {
          distances[neighbour] = distances[currentVertex] + 1
          unVisited.push(neighbour)
        }
      })
      // add the currernt vertex to the list of visited vertices
      visited.push(currentVertex)
      // remove currentVertex from unVisited
      const index = unVisited.indexOf(currentVertex)
      if (index > -1) {
        unVisited.splice(index, 1)
      }
    })
    // console.log(`visted ${visited}`)
    // console.log(`unVisted ${unVisited}`)
    // loop the above process
  }
  const cellsSurroundingMonster = [start +1, start -1, start + width, start -width].filter(neighbour => !cells[neighbour].classList.contains('wall'))
  // console.log(distances)
  let closestCell
  for (let i = 0; i < cells.length; i++) {
//    console.log(distances[i])
    if (distances[i] === distances[start] - 1 && cellsSurroundingMonster.includes(i)) {
      closestCell = i
    }
  }
  return closestCell
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
  if (powerUpActive === true) {
    if (cells[playerPosition].classList.contains('beholder')){
      playerScore += 200
      beholder.status = 'fleeing'
    } else if (cells[playerPosition].classList.contains('cube')) {
      playerScore += 200
      cube.status = 'fleeing'
    } else if (cells[playerPosition].classList.contains('lich')) {
      playerScore += 200
      lich.status = 'fleeing'
    } else if (cells[playerPosition].classList.contains('spider')) {
      playerScore += 200
      spider.status = 'fleeing'
    }
  } else {
    // when a monster comes into contact with player player loses life
  gamePaused = true
  playerHealth --
  removeHero()
  removeMonster()
  setTimeout(() => {
  gamePaused = false
    // reset player position
    spawnPlayer()
    // reset monsters positions
    spawnMonster(beholder)
    beholder.status = 'active'
    spawnMonster(cube)
    cube.status = 'active'
    spawnMonster(lich)
    lich.status = 'active'
    spawnMonster(spider)
    spider.status = 'active'
  }, 1000)
  }
}


function fleeing(monster) {
  cells[monster.currentPosition].classList.remove(`${monster.name}`)
  let newPosition = dijkstras(monster.currentPosition, monster.startPosition)
  monster.currentPosition = newPosition
  cells[monster.currentPosition].classList.add(`${monster.name}`)
  if (monster.currentPosition === monster.startPosition) {
    monster.status = 'active'
  }
}

// ? loot()
function loot(){
  if (cells[playerPosition].classList.contains('coins')) {
    // if player walks over cell with a coin on it they add to score
    playerScore += 100
    scoreText.innerText = `Current Score: ${parseInt(playerScore)}`
    // remove 'coin' from the map
    cells[playerPosition].classList.remove('coins')
  } 
}


// ? powerUp()
// player either becomes invincible or gains a bonus to their roll
// this will either be on a timer if invincible or last the game if a bonus

function powerUp() {
  powerUpTimer = clearTimeout
  powerUpFlashing = clearInterval
  powerUpActive = true
  powerUpsText.classList.add('powerUpIcon')
  beholder.status = 'inDanger'
  cube.status = 'inDanger'
  lich.status = 'inDanger'
  spider.status = 'inDanger'
  powerUpFlashing = setInterval(() => {
    if (beholder.status != 'active') {cells[beholder.currentPosition].classList.toggle('beholder')}
    if (cube.status != 'active') {cells[cube.currentPosition].classList.toggle('cube')}
    if (lich.status != 'active') {cells[lich.currentPosition].classList.toggle('lich')}
    if (spider.status != 'active') {cells[spider.currentPosition].classList.toggle('spider')}
  }, 200)

  // timer to end the powerup
  powerUpTimer = setTimeout(() => {
    powerUpsText.classList.remove('powerUpIcon')
    cells[beholder.currentPosition].classList.add('beholder')
    cells[cube.currentPosition].classList.add('cube')
    cells[lich.currentPosition].classList.add('lich')
    cells[spider.currentPosition].classList.add('spider')
    if (beholder.status != 'fleeing') beholder.status = 'active'
    if (cube.status != 'fleeing') cube.status = 'active'
    if (lich.status != 'fleeing') lich.status = 'active'
    if (spider.status != 'fleeing') spider.status = 'active'
    powerUpFlashing = clearInterval
    powerUpActive = false
  }
  , 5000)
}


// creates an arrya with of all the tiles with coins left, until there are none left and a win condition can be triggered
function coinsUntilWin() {
  coinsLeft = document.getElementsByClassName('coins').length
}

// * Game state
// ? startCoin
function showCoin() {
  if (gameActive === false) {
    hoverCoin.style.display = 'block'
  }
}
function hideCoin() {
  hoverCoin.style.display = 'none'
}

// ? gameOver()
// clearInterval global monster movement
// game active = false
// display score nicely on screen

// ? youWin()
// clearInterval
// congratulations message
// play again/next level

// ? high score()
function setHighScore() {
  if(playerHighScore !== null){
    if (playerScore > parseInt(playerHighScore)) {
        localStorage.setItem("high-score", playerScore)    
      }
    } else {
      localStorage.setItem("high-score", playerScore)
  }
  playerHighScore = localStorage.getItem("high-score")
  highScoreText.innerText = `High Score: ${parseInt(playerHighScore)}`
}

// ! Events
// * start button
insertCoins.addEventListener('click', startGame)
// * start button hover
insertCoins.addEventListener('mouseover', showCoin)
insertCoins.addEventListener('mouseleave', hideCoin)
// * keyboard input
const keyboardInput = document.addEventListener('keydown', movePlayer)
// * game over / play again button
gameOverBtn.addEventListener('click', startGame)


// ! stretch goals

// * user input name for high score

// * monster AI movement // ACHIEVED!!

// * speed up monsters each level advanced // ACHIEVED!!

// * have a dice roll competition when monster and hero collide