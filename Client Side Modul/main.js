import { Enemy } from "./Enemy.js";
import { InputHandler } from "./InputHandler.js";
import { DangerTile, KeyTile, LineTile } from "./Tile.js";
import { UI } from "./UI.js";

//Element Variable
const playButton = document.getElementById("play");
const usernameInput = document.getElementById("username");
const restartButton = document.querySelectorAll(".restart");
const resumeButton = document.getElementById('resume');
//Menu Container
const gameInstruction = document.getElementById("game-instruction");
const gameOverScreen = document.getElementById("gameOver");
const gamePauseScreen = document.getElementById('paused');

window.addEventListener("load", function () {
  //canvas configuration
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 960;
  canvas.height = 600;

  //main game class
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.inputHandler = new InputHandler(this);
      this.lineTiles = [
        new LineTile(this, "d"),
        new LineTile(this, "f"),
        new LineTile(this, "j"),
        new LineTile(this, "k"),
      ];
      this.dangerTiles = [
        new DangerTile(this, "d"),
        new DangerTile(this, "f"),
        new DangerTile(this, "j"),
        new DangerTile(this, "k"),
      ];
      this.keyTiles = [
        new KeyTile(this, "d"),
        new KeyTile(this, "f"),
        new KeyTile(this, "j"),
        new KeyTile(this, "k"),
      ];
      this.UI = new UI(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.score = 0;
      this.fail = 0;
      this.failMax = 2;
      this.time = 300000;
      this.fontColor = "white";
      this.gameOver = false;
      this.paused = false;
      this.countDown = true;
      this.count = 3;
      this.fps = 1;
      this.frameInterval = 1000 / this.fps;
      this.frameTimer = 0;
    }

    update(deltaTime) {
      //countdown
      if (this.countDown) {
        if (this.frameTimer > this.frameInterval) {
          this.frameTimer = 0;
          if (this.count > 1) this.count--;
          else this.countDown = false;
        } else {
          this.frameTimer += deltaTime;
        }
      }

      if (!this.countDown && !this.paused) {
        //gameover and fail
        this.time -= deltaTime;
        if (this.time < 0) this.gameOver = true;
        if (this.fail == this.failMax) this.gameOver = true;
        //every 1 sec enemy spawn
        if (this.enemyTimer > this.enemyInterval) {
          this.enemyTimer = 0;
          this.addEnemy();
        } else {
          this.enemyTimer += deltaTime;
        }
        //update object
        this.dangerTiles.forEach((dangerTile) => {
          dangerTile.update(this.inputHandler.keys, deltaTime);
        });
        this.enemies.forEach((enemy, index) => {
          enemy.update(deltaTime);
          if (enemy.markedForDeletion) this.enemies.splice(index, 1);
        });
        this.keyTiles.forEach((keyTile) => {
          keyTile.update(this.inputHandler.keys);
        });
      }
    }

    draw(ctx) {
      this.lineTiles.forEach((lineTile) => {
        lineTile.draw(ctx);
      });
      this.dangerTiles.forEach((dangerTile) => {
        dangerTile.draw(ctx);
      });
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });
      this.keyTiles.forEach((keyTile) => {
        keyTile.draw(ctx);
      });
      this.UI.draw(ctx);
    }

    addEnemy() {
      const linePlacement = Math.floor(Math.random() * this.lineTiles.length);
      this.enemies.push(new Enemy(this, this.dangerTiles[linePlacement]));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  //game animation
  function animate(timeStamp) {
    console.log('hello');
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  //element listener
  usernameInput.addEventListener("keyup", (e) => {
    if (usernameInput.value.trim().length > 0) {
      playButton.disabled = false;
    } else {
      playButton.disabled = true;
    }
  });

  playButton.addEventListener("click", (e) => {
    gameInstruction.style.display = "none";
    canvas.style.display = "block";
    localStorage.setItem("username", usernameInput.value.trim());
    animate(0);
  });

  resumeButton.addEventListener('click', e => {
    gamePauseScreen.style.display = 'none';
    game.count = 3;
    game.countDown = true;
    game.paused = false;
    // requestAnimationFrame(animate);
  })

  restartButton.forEach(restart => {
    restart.addEventListener("click", (e) => {
      game.enemies = [];
      game.score = 0;
      game.fail = 0;
      game.time = 300000;
      gamePauseScreen.style.display = 'none';
      gameOverScreen.style.display = 'none';
      game.count = 3;
      game.countDown = true;
      game.paused = false;
      game.gameOver = false;
      requestAnimationFrame(animate);
    });
  })

  
});
