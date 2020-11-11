const sign_in_btn = document.querySelectorAll(".sign-in-btn");
const sign_up_btn = document.querySelectorAll(".sign-up-btn");
const modal = document.querySelector(".modal-body");

let i, n, m;
n=sign_up_btn.length
m=sign_in_btn.length

for(i=0;i<n;i++){
  sign_up_btn[i].addEventListener("click", () => {
    modal.classList.add("sign-up-mode");
  });
}

for(i=0;i<m;i++){
  sign_in_btn[i].addEventListener("click", () => {
    modal.classList.remove("sign-up-mode");
  });
}

