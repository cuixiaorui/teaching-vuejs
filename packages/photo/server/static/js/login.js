import myAxios from "./axios.js";
const loginBtn = document.querySelector("#loginBtn");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  myAxios
    .post("/login", {
      username,
      password
    })
    .then(res => {
      console.log(res.data);
      if (res.data.state === 1) {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        // 跳转到 photo 页面
        location.href = "/photo.html";
      } else {
        alert(res.data.msg);
      }
    });
});
