// Enemies our player must avoid
var Enemy = function() {
	
	// array of starting positions
	this.startY = [60, 140, 220];
	this.x = -100;
	//randomizes enemy starting row
	this.y = this.startY[Math.floor(Math.random() * this.startY.length)];
	this.sprite = 'images/enemy-bug.png';
	//array of different enemy speeds
	this.speed = [175, 225, 300, 425];
	//randomizes each enemy speed
	this.enemySpeed = this.speed[Math.floor(Math.random() * this.speed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + (this.enemySpeed * dt);
	
	if (this.x > 505) {
		this.x = -100;
		this.y = this.startY[Math.floor(Math.random() * this.startY.length)];
		this.enemySpeed = this.speed[Math.floor(Math.random() * this.speed.length)];
	}
	};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 200;
	this.y = 400;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
	//no op
};

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};

Player.prototype.render = function (){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (movement) {
	//sets up boundaries so player cannot move off canvas	
	if (movement === 'left' && this.x > 0) {
		this.x = this.x - 100;
	}
	if (movement === 'right'&& this.x < 400) {
		this.x = this.x + 100;
	}
	if (movement === 'up' && this.y > 0) {
		this.y = this.y - 85;
	}
	if (movement === 'down' && this.y < 400) {
		this.y = this.y + 85;
	}
	//when player reaches water
	if (this.y < 50) {
		this.reset();
	}
	
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

var player = new Player();


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
