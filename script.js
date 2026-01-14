function register() {
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  const msg = document.getElementById("regMsg");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !pass) {
    msg.innerText = "All fields are required ❌";
    return;
  }

  if (!emailRegex.test(email)) {
    msg.innerText = "Invalid email format ❌";
    return;
  }

  if (!validatePassword(pass)) {
    msg.innerText =
      "Password must contain uppercase, lowercase, number & special character ❌";
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("password", pass);
  localStorage.setItem("registered", "true");

  msg.style.color = "green";
  msg.innerText = "Account created successfully ✅";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}

function checkRegistered() {
  if (localStorage.getItem("registered") !== "true") {
    window.location.href = "register.html";
  }
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  const msg = document.getElementById("loginMsg");

  if (
    email === localStorage.getItem("email") &&
    pass === localStorage.getItem("password")
  ) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "Wrong email or password ❌";
    msg.classList.add("shake");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function forgotPassword() {
  const email = prompt("Enter your registered email:");

  if (email === localStorage.getItem("email")) {
    const newPass = prompt("Enter new password:");

    if (validatePassword(newPass)) {
      localStorage.setItem("password", newPass);
      alert("Password reset successful ✅");
    } else {
      alert("Weak password ❌");
    }
  } else {
    alert("Email not registered ❌");
  }
}

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}


