(function () {
  // Install Feather icons: https://feathericons.com/
  if (feather && feather.replace) {
    feather.replace();
  }
  const SONGS = [
    {
      title: "Rockstar",
      artist: "Post Malone, 21 Savage",
      cover:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg",
      audioFile:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3",
      color: "#c3af50",
    },
    {
      title: "Let You Down",
      artist: "NF",
      cover:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
      audioFile:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3",
      color: "#25323b",
    },
    {
      title: "Silence",
      artist: "Marshmello, Khalid",
      cover:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg",
      audioFile:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
      color: "#c1c1c1",
    },
    {
      title: "I Fall Apart",
      artist: "Post Malone",
      cover:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg",
      audioFile:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3",
      color: "#cd4829",
    },
    {
      title: "Fireproof",
      artist: "VAX, Teddy Sky",
      cover:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg",
      audioFile:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3",
      color: "#5d0126",
    },
  ];
  const STATE_ENUM = {
    HIDDEN: "hidden",
    SHOW: "shown",
    MAX: "maximized",
  };

  let STATE = STATE_ENUM.HIDDEN;
  let CURRENT_SONG_INDEX = 0;
  let CURRENT_SONG = SONGS[CURRENT_SONG_INDEX];

  const btnLauncher = document.querySelector("#launcher-music");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const btnClose = document.querySelector("#modal-close");
  const btnMax = document.querySelector("#modal-maximize");
  const btnMin = document.querySelector("#modal-minimize");
  const mainContent = document.querySelector(".main");
  const playlist = document.querySelector(".playlist");
  const playlistWrapper = document.querySelector(".playlist-wrapper");

  //membuka jendela popup
  function showMusicApp() {
    STATE = STATE_ENUM.SHOW;
    modal.setAttribute("data-state", STATE_ENUM.SHOW);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // memasang fungsi ke tombol peluncur
  btnLauncher.addEventListener("click", showMusicApp);

  // menutup jendela popup
  function hideMusicApp() {
    STATE = STATE_ENUM.HIDDEN;
    modal.setAttribute("data-state", STATE_ENUM.HIDDEN);
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // memasang fungsi ke tombol tutup
  btnClose.addEventListener("click", hideMusicApp);

  // fungsi memperbesar jendela
  function maximizeMusicApp() {
    STATE = STATE_ENUM.MAX;
    modal.setAttribute("data-state", STATE_ENUM.MAX);
    modalContent.style.width = "100%";
    modalContent.style.height = "100%";
    modalContent.style.margin = "0";

    mainContent.style.height = "calc(100vh - 35px)";
  }

  // memasang fungsi ke tombol perbesar
  btnMax.addEventListener("click", maximizeMusicApp);

  // Memperkecil tampilan jendela
  function resetMusicStyle() {
    // reset modified styles
    modalContent.style.width = "75%";
    modalContent.style.height = null;
    modalContent.style.margin = "15% auto";
    mainContent.style.height = "300px";
  }

  //fungsi memperkecil jendela
  function minimizeMusicApp() {
    if (STATE === STATE_ENUM.MAX) {
      STATE = STATE_ENUM.SHOW;
      modal.setAttribute("data-state", STATE_ENUM.SHOW);
      resetMusicStyle();
    }
  }

  // memasang fungsi ke tombol perkecil
  btnMin.addEventListener("click", minimizeMusicApp);

  // memasang lagu yang sudah disiapkan

  //injeksi tampilan lewat JavaScript
  SONGS.forEach(function (song, index) {
    const liNode = document.createElement("li");
    liNode.classList.add("playlist-item");
    liNode.setAttribute("data-audio", song.audioFile);
    liNode.setAttribute("data-color", song.color);
    liNode.setAttribute("data-index", index);

    if (index === 0) {
      liNode.classList.add("active");
    }

    const imgNode = document.createElement("img");
    imgNode.setAttribute("src", song.cover);

    const divNode = document.createElement("div");
    divNode.classList.add("item-wrapper");

    const titleNode = document.createElement("div");
    titleNode.classList.add("item-title");
    const textTitleNode = document.createTextNode(song.title);
    titleNode.appendChild(textTitleNode);

    const artistNode = document.createElement("small");
    artistNode.classList.add("item-artist");
    const textArtistNode = document.createTextNode(song.artist);
    artistNode.appendChild(textArtistNode);

    divNode.appendChild(titleNode);
    divNode.appendChild(artistNode);

    liNode.appendChild(imgNode);
    liNode.appendChild(divNode);

    playlistWrapper.appendChild(liNode);

    // Fungsionalitas Audio
    // menginisiasi state
    let CURRENT_SONG_INDEX = 0;
    let CURRENT_SONG = SONGS[CURRENT_SONG_INDEX];

    const playBtn = document.querySelector("#control-play");
    const pauseBtn = document.querySelector("#control-pause");
    const prevBtn = document.querySelector("#control-prev");
    const nextBtn = document.querySelector("#control-next");
    const sleepBtn = document.querySelector("#control-sleep");
    const shuffleBtn = document.querySelector("#control-shuffle");

    const currentTime = document.querySelector("#current-time");
    const totalTime = document.querySelector("#total-time");

    const progress = document.querySelector(".progress");
    const sliders = document.querySelectorAll(".slider");
    const player = document.querySelector("audio");

    // fungsi memutar lagu
    function playTheAudio() {
      // player.load();
      player.volume = 0.5;
      playBtn.style.display = "none";
      pauseBtn.style.display = "flex";
      player.play();
      console.log(player.play());

      // memutar lagu selanjutnya
      player.addEventListener("ended", function () {
        //play next song
        const nextIndex =
          CURRENT_SONG_INDEX === SONGS.length - 1 ? 0 : CURRENT_SONG_INDEX + 1;
        chooseSongFromPlaylist(SONGS[nextIndex], nextIndex);
      });
    }

    // fungsi memberhentikan lagu
    function pauseTheAudio() {
      playBtn.style.display = "flex";
      pauseBtn.style.display = "none";
      player.pause();
    }

    // kondisi memutar dan memberhentikan lagu
    function playPauseAudio() {
      if (player.paused) {
        playTheAudio();
      } else {
        pauseTheAudio();
      }
    }

    // menempelkan fungsi pada tombol
    playBtn.addEventListener("click", playPauseAudio);
    pauseBtn.addEventListener("click", playPauseAudio);

    // fungsi untuk memperbarui timeline
    function formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    }

    function updateProgress() {
      let current = player.currentTime;
      let percent = (current / player.duration) * 100;
      progress.style.width = `${percent}%`;
      currentTime.textContent = formatTime(current);
    }

    // Mendeengarkan perubaha timeline
    player.addEventListener("timeupdate", updateProgress);
    player.addEventListener("loadedmetadata", () => {
      totalTime.textContent = formatTime(player.duration);
    });
    player.addEventListener("ended", () => {
      player.currentTime = 0;
    });

    // Memutar lagu dari playlist
    function chooseSongFromPlaylist(song, index) {
      CURRENT_SONG_INDEX = index;
      CURRENT_SONG = SONGS[index];

      const coverSong = document.querySelector("#data-song-cover");
      coverSong.setAttribute("src", song.cover);
      const titleSong = document.querySelector("#data-song-title");
      titleSong.innerHTML = song.title;
      const artistSong = document.querySelector("#data-song-artist");
      artistSong.innerHTML = song.artist;
      const audioSong = document.querySelector("#data-song-audio");
      audioSong.setAttribute("src", song.audioFile);

      player.addEventListener("loadedmetadata", () => {
        totalTime.textContent = formatTime(player.duration);
      });
      player.load();
      playTheAudio();

      const nonActiveItems = document.querySelector(`.playlist-item.active`);
      nonActiveItems.classList.remove("active");

      const activeItem = document.querySelector(
        `.playlist-item[data-index="${index}"]`
      );
      activeItem.classList.add("active");
    }

    //memasang aksi pada item playlist
    liNode.addEventListener(
      "click",
      () => {
        chooseSongFromPlaylist(song, index);
      },
      false
    );

    // fungsi putar lagu sebelumnya
    prevBtn.addEventListener("click", function () {
      const prevIndex =
        CURRENT_SONG_INDEX === 0 ? SONGS.length - 1 : CURRENT_SONG_INDEX - 1;
      chooseSongFromPlaylist(SONGS[prevIndex], prevIndex);
    });

    // fungsi putar lagu selanjutnya
    nextBtn.addEventListener("click", function () {
      const nextIndex =
        CURRENT_SONG_INDEX === SONGS.length - 1 ? 0 : CURRENT_SONG_INDEX + 1;
      chooseSongFromPlaylist(SONGS[nextIndex], nextIndex);
    });

    //fungsi putar lagu acak
    shuffleBtn.addEventListener("click", function () {
      const randomIndex = Math.floor(Math.random() * SONGS.length);
      chooseSongFromPlaylist(SONGS[randomIndex], randomIndex);
    });

    //fungsi sleep (stop audio in 10 min)
    sleepBtn.addEventListener("click", function () {
      setTimeout(function () {
        pauseTheAudio();
      }, 600000);
    });
  });
})();
