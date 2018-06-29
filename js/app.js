/**/// Counter for game score
var score = 0;
const scorePanel = document.getElementById('score_panel');

const Game = function() {
    //this.width = 505;
    this.playerStartX = 203;
    this.playerStartY = 295;
};

const game = new Game();

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 280) + 40;
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
    if (this.x <= 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -50; // reseting the position of the enemy, when it goes off the canvas
    };
    // Collision detection between the player and the enemies
    if (player.x < this.x + 75 && player.x + 75 > this.x &&
        player.y < this.y + 55 && 55 + player.y > this.y) {
        player.x = 203;
        player.y = 295;
    };
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

Player.prototype.handleInput = function(keyPress) {

    if (keyPress == "left" && this.x > 0) {
        this.x -= 100;
    } else if (keyPress == "right" && this.x < 400) {
        this.x += 100;
    } else if (keyPress == "up" && this.y > 0) {
        this.y -= 80;
    } else if (keyPress == "down" && this.y < 300) {
        this.y += 80;
    }
};

// Render player method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    //this.checkMoves();
    // Prevent player from moving beyond canvas
    if (this.y > 320) {
        this.y = 320;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }
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

// Restarting the game after click on the Restart button
var restartGameBtn = document.getElementById('restart_btn');
restartGameBtn.addEventListener('click', function() {
    location.reload(true);
});
