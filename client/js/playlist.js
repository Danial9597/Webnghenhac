// ==== CẤU HÌNH FIREBASE ====
const firebaseConfig = { 
  apiKey : "AIzaSyDU5ZLLQFOtFFO3VtKYj9Dc-ZjzUhOFHvE",
  authDomain : "jsi07-e13da.firebaseapp.com",
  projectId : "jsi07-e13da",
  storageBucket : "jsi07-e13da.firebasestorage.app",
  messagingSenderId : "54277847367",
  appId : "1:54277847367:web:b435e153e4f892c23cb462"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Xoá bài hát
async function deleteProduct(id) {
    try {
        await db.collection("Music").doc(id).delete();
        console.log("Đã xoá bài hát:", id);
    } catch (error) {
        console.error("Lỗi khi xoá bài hát:", error);
    }
}

// Load danh sách bài hát
async function loadProducts() {
    const productTableBody = document.getElementById("product-list");
    let htmls = "";
    let index = 1;

    try {
        const querySnapshot = await db.collection("Music").get();

        querySnapshot.forEach((doc) => {
            const product = doc.data();

            // ép JSON để tránh bị lỗi nháy kép
            const songData = {
                id: doc.id,
                image: product.image,
                title: product.title,
                artist: product.artist,
                audioUrl: product.audioUrl
            };

            htmls += `
            <tr class="song-row" data-song='${JSON.stringify(songData).replace(/'/g, "&apos;")}'>
                <th>${index}</th>
                <td><img src="${product.image}" alt="${product.title}"></td>
                <td>${product.title}</td>
                <td>${product.artist}</td>
                <td>
                    <button class="btn-delete-product" data-id="${doc.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
            index++;
        });

        productTableBody.innerHTML = htmls;

        // CLICK CHUYỂN QUA TRANG PHÁT NHẠC
        const rows = document.querySelectorAll(".song-row");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                let songData = row.dataset.song;
                songData = songData.replace(/&apos;/g, "'"); // sửa lỗi nháy kép

                const song = JSON.parse(songData);

                // lưu vào localStorage
                localStorage.setItem("currentSong", JSON.stringify(song));

                // chuyển trang
                window.location.href = "product.html";
            });
        });

        // NÚT XOÁ (không bị click vào row)
        const btnDeleteProduct = document.querySelectorAll(".btn-delete-product");
        btnDeleteProduct.forEach(btn => {
            btn.addEventListener("click", async (e) => {
                e.stopPropagation(); // ngăn chuyển trang

                const id = btn.getAttribute("data-id");
                if (confirm("Bạn có chắc muốn xoá bài hát này?")) {
                    await deleteProduct(id);
                    loadProducts();
                }
            });
        });

    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
    }
}

loadProducts();