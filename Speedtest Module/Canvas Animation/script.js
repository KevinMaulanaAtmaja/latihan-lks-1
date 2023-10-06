window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 320;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.ball = new Ball(this);
    }

    update() {
      this.ball.update();
    }
    draw(ctx) {
      this.ball.draw(ctx);
    }
  }

  class Ball {
    constructor(game) {
      this.game = game;
      this.width = 15;
      this.x = 0;
      this.speed = 2;
    }

    update() {
      if (this.x > this.game.width - this.width *2){ this.speed *= -1};
      if(this.x < 0 && this.speed < 0) {this.speed *= -1};
      this.x += this.speed;
    }

    draw(ctx) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(
        this.x + this.width,
        this.game.height / 2,
        this.width,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
