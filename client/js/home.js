document.addEventListener("DOMContentLoaded", () => {
    loadSongs();
});

// LOAD SONGS TỪ LOCALSTORAGE
function loadSongs() {
    const list = JSON.parse(localStorage.getItem("songs")) || [];
    const container = document.getElementById("songList");

    if (list.length === 0) {
        container.innerHTML = "<p>Chưa có bài nào được đăng.</p>";
        return;
    }

    list.forEach(song => {
        const div = document.createElement("div");
        div.className = "song-item";

        div.innerHTML = `
            <img src="${song.image}">
            <h4>${song.title}</h4>
            <p>${song.artist || "Không rõ nghệ sĩ"}</p>
        `;

        // Khi bấm vào bài hát -> chuyển sang trang phát nhạc
        div.onclick = () => {
            localStorage.setItem("currentSong", JSON.stringify(song));
            window.location.href = "product.html";
        };

        container.appendChild(div);
    });
}