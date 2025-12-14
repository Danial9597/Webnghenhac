// Preview ảnh khi upload
document.getElementById("postImages").addEventListener("change", function () {
    let preview = document.getElementById("preview");
    preview.innerHTML = "";

    for (let file of this.files) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
    }
});

// Hàm đăng bài
function publishPost() {
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;
    let tags = document.getElementById("postTag").value;

    if (!title.trim()) return alert("Bạn chưa nhập tiêu đề!");
    
    alert("Đăng bài thành công!\n(Chưa kết nối Firebase)");
}