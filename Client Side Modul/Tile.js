const keysPosition = {
  d: 2,
  f: 1,
  j: 0,
  k: -1,
};

const keysColor = {
  d: "#2BB673",
  f: "#27AAE1",
  j: "#2BB673",
  k: "#27AAE1",
};

class Tile {
  constructor(game, key) {
    this.width = 80;
    this.game = game;
    this.key = key;
    this.keyPositionOffset = keysPosition[key];
    this.x = this.game.width / 2 - this.width * this.keyPositionOffset;
    this.opacity = "1";
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = "#414042";
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  update() {}
}

export class DangerTile extends Tile {
  constructor(game, key) {
    super(game, key);
    this.height = 200;
    this.fillStyle = "#ED1C24";
    this.y = this.game.height - this.height - 100 /* keyTile Height */;
    this.opacity = "0.3";
    this.active = false;
    this.activeTimer = 0;
    this.activeInterval = 500;
  }
  update(keys, deltaTime) {
    if (keys.includes(this.key) && !this.active) {
      this.active = true;
      this.checkCollision();
    } else if (!keys.includes(this.key) && this.active) {
      this.active = false;
    }
    if (this.active) this.opacity = "0.7";
    else this.opacity = "0.3";
  }
  draw(ctx) {
    super.draw(ctx);
  }
  checkCollision() {
    if (this.active) {
      this.game.enemies.forEach((enemy) => {
        if (
          enemy.x < this.x + this.width &&
          enemy.x + enemy.width > this.x &&
          enemy.y < this.y + this.height &&
          enemy.y + enemy.width > this.y
        ) {
          enemy.markedForDeletion = true;
          this.game.score++;
        }
      });
    }
  }
}

export class KeyTile extends Tile {
  constructor(game, key) {
    super(game, key);
    this.height = 100;
    this.fillStyle = keysColor[key];
    this.y = this.game.height - this.height;
    this.image = document.getElementById("key");
  }
  draw(ctx) {
    super.draw(ctx);
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
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      this.key.toUpperCase(),
      this.x + this.width / 2,
      this.y + this.height / 2 + 25
    );
    ctx.restore();
  }
}

export class LineTile extends Tile {
  constructor(game, key) {
    super(game, key);
    this.height = this.game.height;
    this.fillStyle = "#6D6E71";
    this.y = 0;
  }
  draw(ctx) {
    super.draw(ctx);
  }
}

// export class DangerTile {
//   constructor(game, keyPosition) {
//     this.game = game;
//     this.positionOffset = keysPosition[keyPosition];
//     this.height = 200;
//     this.width = 80;
//     this.opacity = "0.5";
//   }
//   draw(ctx) {
//     ctx.globalAlpha = this.opacity;
//     ctx.fillStyle = "#ED1C24";
//     ctx.strokeStyle = "#414042";
//     ctx.fillRect(
//       this.game.width / 2 - this.width * this.positionOffset,
//       this.game.height - this.height,
//       this.width,
//       this.height
//     );
//     ctx.strokeRect(
//       this.game.width / 2 - this.width * this.positionOffset,
//       this.game.height - this.height,
//       this.width,
//       this.height
//     );
//   }
// }
