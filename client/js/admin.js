// --- DOM elements ---
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fullName = document.getElementById("fullName");
const avatar = document.getElementById("avatar");
const spanUser = document.getElementById("user_span");
const emailDisplay = document.getElementById("email_display");
const productForm = document.getElementById("userForm");
const imagePreview = document.getElementById("imagePreview");
const imageInput = document.getElementById("profileImage");

// --- Submit form ---
productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  // Upload avatar nếu có chọn ảnh
  const profileImage = imageInput.files[0];

  if (profileImage) {
    const formData = new FormData();
    formData.append("image", profileImage);

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(result => {
        currentUser.avatar = result.data.secure_url;
        avatar.src = result.data.secure_url;
        imagePreview.src = result.data.secure_url;

        saveUserInfo(currentUser);
      })
      .catch(err => {
        console.error("Upload error:", err);
      });
  } else {
    saveUserInfo(currentUser);
  }
});

// --- Save user info ---
function saveUserInfo(currentUser) {
  currentUser.username = username.value.trim();
  currentUser.email = email.value.trim();
  currentUser.password = password.value;
  currentUser.fullname = fullName.value.trim();

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("User info saved!");
}

// --- Load user ---
function loadUser() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  username.value = user.username || "";
  email.value = user.email || "";
  password.value = user.password || "";
  fullName.value = user.fullname || "";

  spanUser.textContent = user.username || "";
  emailDisplay.textContent = user.email || "";

  if (user.avatar) {
    avatar.src = user.avatar;
    imagePreview.src = user.avatar;
  }
}

// --- Logout ---
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "../html/login.html";
}

// --- Go home ---
function goHome() {
  window.location.href = "../html/home.html";
}