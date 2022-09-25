(function() {
  if (typeof Mario === 'undefined')
    window.Mario = {};

  Flag = Mario.Flag = function(pos) {
    //afaik flags always have the same height and Y-position
    this.pos = [pos, 49];
    this.hitbox = [0,0,0,0];
    this.vel = [0,0];
    this.acc = [0,0];
  }

  Flag.prototype.collideWall = function() {;
  }

  Flag.prototype.update = function(dt){
    if (!this.done && this.pos[1] >= 170) {
      this.vel = [0,0];
      this.pos[1] = 170;
      player.exit();
      this.done = true;
    }
    this.pos[1] += this.vel[1];
  }

  Flag.prototype.checkCollisions = function() {
    this.isPlayerCollided();
  }

  Flag.prototype.isPlayerCollided = function() {
    if (this.hit) return;
    if (player.pos[0] + 8 >= this.pos[0]) {
      music.overworld.pause();
      // Timer stop
      stopTimer();
      sounds.flagpole.play();
      setTimeout(function() {
        music.clear.play();
      }, 2000);
      this.hit = true;
      player.flag();
      this.vel = [0, 2];
    }
  }

  Flag.prototype.render = function() {
    level.flagpoleSprites[2].render(ctx, this.pos[0]-8, this.pos[1], vX, vY);
  }
})();


// Timer
const timer = document.getElementById('timer');
const final = document.getElementById('final');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

var interval;

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
    if(interval == null){
      startTimer();
    }
  }
});

function startTimer() {
  startTime = Date.now();
  interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime;
    timer.innerHTML = (msToTime(elapsedTime));
  }, 10);
}

function stopTimer() {
  clearInterval(interval);
  final.innerHTML = "Personal Best: " + timer.innerHTML;
  alert('Congratulations! Your time was: ' + timer.innerHTML);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer.innerHTML = "00:00:00.0";
}

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

console.log(msToTime(60.44));



