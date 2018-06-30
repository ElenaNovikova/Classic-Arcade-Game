// TODO: implement collection of gems, allowing the player to collect them during the crossing the road

// Counter for game lives
var counterCollisions = 0;
var score = document.querySelectorAll('#score');

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
    this.speed = Math.floor(Math.random() * 580) + 300;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-car.png';
};

function shakingC() {
    canvas.classList.add('collisionShake');
    setTimeout(function() {
        //console.log('You lost!')
        canvas.classList.remove('collisionShake');
    }, 900);
    //return;
    //window.clearInterval();
    counterCollisions++;
    console.log(counterCollisions);
    score.forEach(function(fas) {
		    fas.innerHTML = '<i class="fas fa-heart" style="color: black"></i>';
	  });
    if (counterCollisions == 5) {
        gameOver();
    }
}

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
    }
    // Collision detection between the player and the enemies
    if (player.x < this.x + 75 && player.x + 75 > this.x &&
        player.y < this.y + 55 && 55 + player.y > this.y) {
        player.x = 203;
        player.y = 295;
        shakingC();
    }
    // Player wins the game, when reaches the opposite sidewalk
    // Then Modale window with congrats appears
    if (player.x <= 505 && player.y < 50) {
        playerWins();
    }
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
    //this.live = 3;
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

function playerWins() {
    // If the Player won, the canvas is cleared from the enemies
    allEnemies.splice(0);
    document.removeEventListener('keyup', keyupELis);
    // You won! Modal window appears
    modal.style.display = "block";
}

function gameOver() {
    // If the Player lost, the game stops
    allEnemies.forEach(function(enemy) {
		    enemy.speed = 0;
	  });
    document.removeEventListener('keyup', keyupELis);
    // Game Over! Modal window appears
    modalNumTwo.style.display = "block";
}

/*
 * Setting up the Modal popup windows
 */

// Get the modal
let modal = document.getElementById('myModal');
let modalNumTwo = document.getElementById('myModalTwo');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];
let span2 = document.getElementsByClassName('close')[1];

// When the user clicks on <span> (x), close 1st modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks on <span> (x), close 2nd modal
span2.onclick = function() {
    modalNumTwo.style.display = 'none';
}

// When the user clicks anywhere outside of 1st modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// When the user clicks anywhere outside of 2nd modal, close it
window.addEventListener("click", function(event) {
    if (event.target == modalNumTwo) {
        modalNumTwo.style.display = 'none';
    }
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', keyupELis);
function keyupELis(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

// Restarting the game after click on the Restart button
let restartGameBtn = document.getElementById('restart_btn');
restartGameBtn.addEventListener('click', function() {
    location.reload(true);
    //document.location.href = '';
});

/*document.addEventListener('keydown', function(e) {
    e.preventDefault();
});*/
