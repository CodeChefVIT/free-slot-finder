signinEmail = document.querySelector("#signin-email").value;
signinPass = document.querySelector("#signin-pass").value;

loginBtn = document
  .querySelector("#login-btn")
  .addEventListener("click", () => {
    signinEmail = document.querySelector("#signin-email").value;
    signinPass = document.querySelector("#signin-pass").value;
    let data = {
      email: signinEmail,
      password: signinPass,
    };
    post("user/login", data, true, true, true, false, false, false, null);
  });
signupBtn = document
  .querySelector("#signup-btn")
  .addEventListener("click", () => {
    signupEmail = document.querySelector("#signup-email").value;
    signupPass = document.querySelector("#signup-pass").value;
    signupName = document.querySelector(".signup-name").value;
    let data = {
      name: signupName,
      email: signupEmail,
      password: signupPass,
    };
    post("user/signup", data, false, false, true, false, false, false, null);
  });
