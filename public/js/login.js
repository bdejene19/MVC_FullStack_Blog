const signin = document.getElementById("sign-in");
const signup = document.getElementById("sign-up");

const signUp = async (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const username = document.getElementById("new-user");
  const pswd = document.getElementById("new-pswd");
  console.log("fired");

  let res = await fetch("/signUp", {
    method: "POST",
    body: JSON.stringify({ name, username, pswd }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
  } else {
    alert("Failed to log in");
  }
};

signup.addEventListener("click", signUp);

const signIn = async (event) => {
  event.preventDefault();
  const username = document.getElementById("username");
  const pswd = document.getElementById("password");

  let res = await fetch("/signIn", {
    method: "POST",
    body: JSON.stringify({ username, pswd }),
    headers: { "Content-Type": "application/json" },
  });
};

signin.addEventListener("click", signIn);
