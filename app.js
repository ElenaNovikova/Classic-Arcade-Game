// Counter for game score
var score = 0;
const scorePanel = document.getElementById('score_panel');

const Game = function() {
    this.width = 500;
    this.colWidth = 50;
    this.colHeight = 50;
    this.playerStartX = 358;
    this.playerStartY = 300;
};

const game = new Game();

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 197);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-car.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.x = game.playerStartX;
    this.y = game.playerStartY;
    this.move = [0, 0];
    this.live = 3;
    //this.collectedGems = 0;
    this.end = false;
    this.sprite = 'images/char-horn-girl.png';
};

const player = new Player();

// Render player method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    //this.checkMoves();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
  new Enemy(10,225),
  new Enemy(105,145),
  new Enemy(200,60)
];
//var player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
