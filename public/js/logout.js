const logoutBtn = document.getElementById("logout");
console.log("ran");
const logout = async () => {
  let logMeOut = await fetch("/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (logMeOut) {
    window.location.replace("/login");
  }
};
logoutBtn.addEventListener("click", logout);
