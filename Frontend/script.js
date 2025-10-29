document.addEventListener("DOMContentLoaded", function () {
  // toggle singin singup logics
const container = document.querySelector(".container");
const registerBtn = document.querySelector("#register");
const loginBtn = document.querySelector("#login");

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
}

// signuplogic
const signupbtn = document.querySelector('#btn-1');
signupbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Successfully registered!");
    } else {
      alert(data.message || "Registration failed!");
    }
  } catch (err) {
    alert("Server error");
    console.error(err);
  }
});


// singinlogic
const signinbtn = document.querySelector("#btn-2")
signinbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("name-sign-in").value;
  const email = document.getElementById("email-sign-in").value;
  const password = document.getElementById("password-sign-in").value;

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Logged in successfully!");

      localStorage.setItem("token", data.token);

      window.location.href = "index.html";
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (err) {
    alert("Server error");
    console.error(err);
  }
});




 
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      if (target && document.querySelector(target)) {
        document.querySelector(target).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

});


document.querySelectorAll(".faqcontents h3").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faqcontents p").forEach((p) => p.style.display = "none");
});
