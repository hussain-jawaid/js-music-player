import { songs } from "./dataArray.js";

class MusicPlayer {
  constructor(
    songs,
    posterId,
    songsContainerId,
    playBtnId,
    backwardBtnId,
    forwardBtnId
  ) {
    this.songs = songs;
    this.poster = document.getElementById(posterId);
    this.songsContainer = document.getElementById(songsContainerId);
    this.playBtn = document.getElementById(playBtnId);
    this.backwardBtn = document.getElementById(backwardBtnId);
    this.forwardBtn = document.getElementById(forwardBtnId);

    this.selectedSong = 0;
    this.audio = new Audio();
    this.isPlaying = false;

    this.init();
  }

  init() {
    this.renderSongs();
    this.playSong(this.songs[this.selectedSong], false); // load first song but don’t autoplay
    this.bindEvents();
  }

  renderSongs() {
    this.songsContainer.innerHTML = "";

    this.songs.forEach((song, index) => {
      // Parent song-card
      const songCard = document.createElement("div");
      songCard.classList.add("song-card");
      songCard.id = `song-${index}`;

      // Inner structure with innerHTML
      songCard.innerHTML = `
        <div class="part1">
          <img src="${song.img}" alt="">
          <h2>${song.songName}</h2>
        </div>
        <h6>${song.duration || "3:56"}</h6>
      `;

      // Append to container
      this.songsContainer.appendChild(songCard);
    });
  }

  playSong(songToPlay, autoplay = true) {
    this.audio.src = songToPlay.url;
    this.poster.style.backgroundImage = `url(${songToPlay.img})`;

    if (autoplay) {
      this.audio.play();
      this.isPlaying = true;
      this.updatePlayBtn();
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play();
      this.isPlaying = true;
    }
    this.updatePlayBtn();
  }

  updatePlayBtn() {
    this.playBtn.innerHTML = this.isPlaying
      ? `<i class="ri-pause-mini-fill"></i>`
      : `<i class="ri-play-mini-fill"></i>`;
  }

  playNext() {
    if (this.selectedSong < this.songs.length - 1) {
      this.selectedSong++;
      this.playSong(this.songs[this.selectedSong]);
    }
  }

  playPrevious() {
    if (this.selectedSong > 0) {
      this.selectedSong--;
      this.playSong(this.songs[this.selectedSong]);
    }
  }

  bindEvents() {
    // Play/Pause button
    this.playBtn.addEventListener("click", () => this.togglePlayPause());

    // Forward button
    this.forwardBtn.addEventListener("click", () => this.playNext());

    // Backward button
    this.backwardBtn.addEventListener("click", () => this.playPrevious());

    // Click on song card
    this.songsContainer.addEventListener("click", (e) => {
      const songCard = e.target.closest(".song-card");
      if (songCard) {
        const index = parseInt(songCard.id.split("-")[1]);
        this.selectedSong = index;
        this.playSong(this.songs[this.selectedSong]);
      }
    });
  }
}

// Init after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  new MusicPlayer(songs, "left", "all-songs", "play", "backward", "forward");
});
