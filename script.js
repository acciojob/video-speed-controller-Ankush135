const video = document.querySelector(".player__video");
const toggle = document.querySelector(".player__button");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const volumeInput = document.querySelector(".volume");
const speedInput = document.querySelector(".playbackSpeed");
const rewindBtn = document.querySelector(".rewind");
const forwardBtn = document.querySelector(".forward");

if (video) {
  video.src = "https://www.w3schools.com/html/mov_bbb.mp4";
}

function togglePlay() {
  if (!video) return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (!toggle || !video) return;
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function handleProgress() {
  if (!video || !progressFilled || !video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

function handleVolume() {
  if (!video) return;
  const value = parseFloat(this.value);
  if (!isNaN(value)) {
    video.volume = value;
  }
}

function handleSpeed() {
  if (!video) return;
  const value = parseFloat(this.value);
  if (!isNaN(value)) {
    video.playbackRate = value;
  }
}

function rewind10() {
  if (!video) return;
  video.currentTime = Math.max(0, video.currentTime - 10);
}

function forward25() {
  if (!video) return;
  const dur = isNaN(video.duration) ? Infinity : video.duration;
  video.currentTime = Math.min(dur, video.currentTime + 25);
}

function scrub(e) {
  if (!video || !progress || !video.duration) return;
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

if (video) {
  video.addEventListener("click", togglePlay);
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", handleProgress);
}

if (toggle) {
  toggle.addEventListener("click", togglePlay);
}

if (volumeInput) {
  volumeInput.addEventListener("input", handleVolume);
}

if (speedInput) {
  speedInput.addEventListener("input", handleSpeed);
}

if (rewindBtn) {
  rewindBtn.addEventListener("click", rewind10);
}

if (forwardBtn) {
  forwardBtn.addEventListener("click", forward25);
}

let mousedown = false;

if (progress) {
  progress.addEventListener("click", scrub);
  progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));
}
