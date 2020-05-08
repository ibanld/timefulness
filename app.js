const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const alarm = document.querySelector('.alarm');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // Audio
  const sounds = document.querySelectorAll('.sound-picker button');
  //Temporizador
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  const outlineLength = outline.getTotalLength();
  let noDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Elegir Audio
  sounds.forEach(sound => {
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //Reproductor audio
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //Cuenta atras
  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      noDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(noDuration / 60)}:${Math.floor(
        noDuration % 60
      )}`;
    });
  });

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };
  // Animación circulo
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = noDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    // Circulo
    let progress = outlineLength - (currentTime / noDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Texto
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= noDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
      alarm.play();
      document.querySelector('.bg-modal').style.display = 'flex';
    }
  };
};

app();

document.getElementById('cerrar').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none';
});
