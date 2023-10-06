export class Enemy {
  constructor(game, line) {
    this.game = game;
    this.line = line;
    this.image = document.getElementById("virus");
    this.width = 80;
    this.height = 80;
    this.x = this.line.x;
    this.y = 0 - this.height;
    this.fps = 20;
    this.speed = 5;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.y += this.speed;
    if (this.y > this.line.y + this.line.height) {
      this.markedForDeletion = true;
      this.game.fail++;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
