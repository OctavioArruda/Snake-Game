// Global variables
let snake;
let scale = 20;
let food;

/* those 2 functions are a must in p5.js */
function setup() {
  background("#000000");
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / scale);
  let rows = floor(height / scale);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scale);
}

function draw() {
  background(51);
  snake.gameOver();
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, scale, scale);
}

function keyPressed() {
  if (keyCode === 38) {
    snake.dir(0, -1); // up
  } else if (keyCode === 40) {
    snake.dir(0, 1); // down
  } else if (keyCode === 39) {
    snake.dir(1, 0); // right
  } else if (keyCode === 37) {
    snake.dir(-1, 0); // left
  }
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 1;
    this.total = 0;
    this.tail = [];
  }

  eat(position) {
    let distance = dist(this.x, this.y, position.x, position.y);
    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  gameOver() {
    for (let i = 0; i < this.tail.length; i++) {
      let position = this.tail[i];
      let distance = dist(this.x, this.y, position.x, position.y);

      if (distance < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }

  update() {
    if (this.total === this.tail.length) {
      // No food has been eaten
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }

    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scale;
    this.y = this.y + this.yspeed * scale;

    this.x = constrain(this.x, 0, width - scale);
    this.y = constrain(this.y, 0, height - scale);
  }

  show() {
    fill(255);

    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    fill(255);
    rect(this.x, this.y, scale, scale);
  }
}
