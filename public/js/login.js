const signin = document.getElementById("sign-in");
const signup = document.getElementById("sign-up");

const signUp = async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const username = document.getElementById("new-username").value;
  const email = document.getElementById("email").value;
  let pswd = document.getElementById("new-pswd");
  const repeatPswd = document.getElementById("repeat-pswd");

  console.log(email);
  if (pswd.value === repeatPswd.value) {
    pswd = pswd.value;
    let res = await fetch("/signUp", {
      method: "POST",
      body: JSON.stringify({ name, username, pswd, email }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
    } else {
      alert("Failed to log in");
    }
  } else {
    pswd.style.border = "solid red 1.5px";
    repeatPswd.style.border = "solid red 1.5px";
    alert("Passwords do not match!");

    setTimeout(() => {
      pswd.style.border = "solid black 1px";
      repeatPswd.style.border = "solid black 1px";
    }, 2000);
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
