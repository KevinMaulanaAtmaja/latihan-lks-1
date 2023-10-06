
export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = "Cascadia Mono";
  }
  draw(ctx) {
    ctx.font = this.fontSize + 20 + "px " + this.fontFamily;
    ctx.textAlign = "left";
    ctx.fillStyle = this.game.fontColor;
    //timer
    const minute = Math.floor(this.game.time / 60000);
    const seconds = ((this.game.time % 60000) / 1000).toFixed(0);
    const time = "0" + minute + ":" + (seconds < 10 ? "0" : "") + seconds;
    ctx.fillText("Timer: " + time, 0 + 10, 0 + this.fontSize + 20);
    //score
    ctx.font = this.fontSize + "px " + this.fontFamily;
    ctx.fillText("Score :" + this.game.score, 0 + 10, 0 + this.fontSize + 50);
    //fail
    ctx.fillText("Fail :" + this.game.fail, 0 + 10, 0 + this.fontSize + 80);
    //username
    ctx.fillText(
      "Player :" + localStorage.getItem("username"),
      0 + 10,
      0 + this.fontSize + 110
    );
    //countDown
    if (this.game.countDown) {
      ctx.save();
      ctx.font = this.fontSize + 50 + "px " + this.fontFamily;
      ctx.fillText(this.game.count, this.game.width / 2 - 20, this.game.height / 2);
      ctx.restore();
    }

    //gameover status
    if (this.game.gameOver) {
      ctx.save();
      ctx.fillStyle = "black";
      ctx.globalAlpha = "0.8";
      ctx.fillRect(0, 0, this.game.width, this.game.height);
      if (this.game.fail > this.game.failMax) {
      }
      ctx.restore();
      const gameOverScreen = document.getElementById("gameOver");
      const gameOverTime = document.getElementById("gameOver-time");
      const gameOverScore = document.getElementById("gameOver-score");
      const gameOverPlayer = document.getElementById("gameOver-player");
      gameOverTime.innerHTML = "Timer :" + time;
      gameOverScore.innerHTML = "Score :" + this.game.score;
      gameOverPlayer.innerHTML = "Player :" + localStorage.getItem("username");
      gameOverScreen.style.display = "block";
    }
  }
}
