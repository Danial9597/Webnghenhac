

// Lấy bài hát từ localStorage
const song = JSON.parse(localStorage.getItem("currentSong"));

if (!song) {
    alert("Không tìm thấy bài hát!");
} else {
    // Đổ dữ liệu lên UI
    document.getElementById("song-cover").src = song.image;
    document.getElementById("song-title").textContent = song.title;
    document.getElementById("song-artist").textContent = song.artist;

    const audio = document.getElementById("audio");
    audio.src = song.audioUrl;  // <-- FILE AUDIO LẤY TỪ FIREBASE
}

// ==== Điều khiển phát nhạc ====
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");

// Nút play/pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Update thanh progress
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Tua
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});