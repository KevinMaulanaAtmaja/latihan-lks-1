const gamePauseScreen = document.getElementById('paused');

export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "d" || e.key === "f" || e.key === "j" || e.key === "k") &&
        this.keys.indexOf(e.key) == -1
      ) {
        this.keys.push(e.key)
      }    
      if(e.key === 'p' || e.key === 'Escape') {        
        if(!this.game.paused) {
          this.game.paused = true;
          gamePauseScreen.style.display = 'block';
        } else {
          this.game.paused = false;
          gamePauseScreen.style.display = 'none';
          this.game.countDown = true;
          this.game.count = 3;
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "d" || e.key === "f" || e.key === "j" || e.key === "k") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
