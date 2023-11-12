# DnD-themed-PacMan

Description
DnD PacMan as the name suggests is a game based on PacMan with a Dungeons and Dragons theme. You play the hero who must travel around a dungeon collecting coins while avoiding the monsters inhabiting it.
This was my first ever coding project and I undertook it only 3 weeks after starting learning at General Assembly. I really wanted to push myself and so picked a game which I thought had some interesting and difficult functions as part of it.

Deployment link
The game can be played here:
https://benelliottkelly.github.io/DnD-themed-PacMan/


Getting Started/Code Installation
Only HTML, CSS and JavaScript are needed for this game all of which can be found here: 
https://github.com/benelliottkelly/DnD-themed-PacMan

Timeframe & Working Team
This was a solo exercise to be completed within one week. 

Technologies Used
HTML
Body split into multiple sections and divs, mainly empty and used for styling purposes.
Section with .grid class to hold the main game “board”.
Button to start the game.
Audio elements to hold the background music and game sound effects.

CSS
:root css variables for width, max-width and min-width
Background images to represent the hero, monsters, coins and powerups
Keyframes animation to represent a coin hovering over slot acting as the start button
JavaScript
HTML elements accessed in JavaScript via querySelector
Grid created using a width and height, meaning if width and height have to change it can easily be done by changing 1 or 2 numbers
Wall, coin and powerup classes added to the grid using arrays
Main game function triggered by clicking the start button, which displays a countdown and then allows the player to move and moves monsters using a setInterval().
Two main movement patterns. Two of four monsters chase the player, the other two move randomly.
Chasing monsters find the closest path to the player using Dijkstras Algorithm. 
Collision detection for the player with monsters, coins and power-ups.

Brief
I had one week to build a grid based browser game which included separate HTML, CSS and JavaScript files. We were given a list of games we could base our own game around, all of which had a relative difficulty level.

Planning
Insert your Planning here:
The first part of my planning process was to build a wireframe of what I thought the game was going to look like.

The above is my original wireframe made at the onset of the project. The actual game ended up having more sections and a slightly different structure, but this was a really helpful starting point for me.

I next wrote pseudocode for every element, variable, execution and event that I could think of that would be included in the game. I also included some stretch goals for myself to upgrade the game past the minimum viable product (MVP).




Build/Code Process

Insert your Build/Code Process here:
Day 1:
I added the grid to the page via JavaScript and then assigned a wall class to the relevant cells to represent the classic PacMan maze. This was a fairly lengthy process as there were over 800 cells to assign, however I managed to speed up the project by assigning the walls line by line, which allowed me to use calculations for duplicate lines rather than writing out each number separately.

I ended the day by adding a function which added the hero into their spawn point in the grid. The hero was represented by a .gif which I changed several times throughout the process as the original picture I had chosen was difficult to see when fit into a single cell within the grid.

Day 2:
I added player movement which would be triggered by either using the arrow keys or WASD. I also added some logic for basic monster movement, which involved them first leaving their spawn point and then moving around the map, randomly changing direction when they came to a junction.
Next I added background tiles, coins, coin detection and a player score which would increase when the player walked over a coin.
I then added a win condition for when the player collected all of the coins.

Day 3:
With the game shaping up nicely I added collision detection, life loss and an end game window which would display a different message depending on whether the player had collected all of the coins or had lost all their lives. If the player collected all the coins they were given the option to “delve deeper”, which would reset the game board but keep the players current health and increase the monsters’ speed.

Day 4:
The basic functions of the game were now complete so I turned my attention to the most important stretch goal for me, which was to have some of the monsters chase you rather than just moving randomly. To do this I used Dijkstra’s algorithm to calculate the shortest path between each monster and the hero and then taking the closest step on that path.
I then used the exact same code to make the monsters “go home” after they had been killed.
Lastly I added a countdown feature from when the player clicks the start button, to the game starting.

Day 5 
With the game now full function I spent day 5 finishing off the CSS to give the game some nice visuals which would look good on a range of screens (unfortunately not for mobile as that would make the game far too small). My final addition to the game was to add some background music which plays once the player clicks the start button and some fun effects for when the player picks up a powerup, attacks a monster or dies to a monster.



Challenges
The main challenge for me was implementing Dijkstra’s algorithm to make the monsters chase the hero. While I understood the theory and why it works, translating that to code was a real struggle for me.
I eventually was given a nudge in the right direction by my GA teacher and once I knew where to start, I was able to work my way through the rest of the algorithm and was able to implement it for a second function.


Wins
Once I had wrapped my head around Dijkstra’s algorithm it was incredibly rewarding to be able to implement it and watch in real time how it changed not only the challenge, but also the enjoyment of my game.
I also was particularly proud of the way I implemented the assignment of each grid by making multiple arrays. This process not only sped up the process for me but meant that if I wanted to make any changes it would be much easier to do (which I did end up needing to do, when I realised the grid should be one space bigger).
A minor touch that I really like is having the start button as a coin slot which has an animated coin floating above it when the mouse hovers near it.

Key Learnings/Takeaways
Taking my own project from start to finish really helped me learn a lot about software engineering. The biggest key learnings for me was:
Applying Dijkstra’s algorithm.
Using mouseover and mouseleave event listeners.
Using CSS animations
Using relative and absolute positions along with toggling display none to make pseudo popups in front of other elements.
Using setTimeOut() and setInterval() in conjunction with each other.
Applying different layers of audio so that some sounds can be played with each other, while others will interrupt each other when triggered.



Bugs
There may be a bug when the monsters are “flashing” due to the player picking up a powerup. I believe it was caused when the removeMonster() function tried to remove the monster’s class from a cell when it didn’t exist due to the “flashing”. I think I fixed it by using an if statement but it’s difficult to test due to specific timing and conditions for the bug to occur. I have not encountered it since I implemented the change.

Future Improvements
Originally I had wanted to make the game more like D&D by adding dice rolls for when a monster caught the hero. Each powerup the player collected would add a modifier to the player’s roll, giving the game those really cool highs and lows caused by dice in real D&D. I still think this would be a very fun feature and would improve the game.
