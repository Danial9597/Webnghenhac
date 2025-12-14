if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!localStorage.getItem("users")) {
    alert("No user found");//nếu không có user hiển thị thông báo
  } else {
    let users = JSON.parse(localStorage.getItem("users"));// Lấy danh sách người dùng từ localStorage và chuyển từ chuỗi JSON → mảng JS

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let existingUser = null;
    users.forEach((element) => {// duyệt từng user để kiểm tra
      if (element.email === email.value.trim()) {
        if (element.password === password.value.trim()) {
          existingUser = element;
        }
      }
    });

    if (existingUser) {// nếu hợp lệ chuyển về trang index
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      location.href = "./index.html";
    } else {
      alert("Email or password is incorrect");
    }
  }
});
