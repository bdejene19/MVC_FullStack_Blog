const commentBtn = document.getElementById("submit-comment");
const textBoxEl = document.querySelector("textarea");
const postID = document.querySelector(".post-content").id;
const submitComment = async (e) => {
  e.preventDefault();
  let comment = textBoxEl.value.trim();
  if (comment !== "") {
    console.log("not empty");
    let btnSubmit = await fetch("/posts/newComment", {
      method: "POST",
      body: JSON.stringify({ postID, comment }),
      headers: {
        "Content-type": "Application/json",
      },
    }).catch((err) => console.log(err));

    if (btnSubmit.ok) {
      let newComment = await btnSubmit.json();
      if (newComment) {
        return window.location.replace(`/posts/${postID}`);
      }
    } else {
      let test = await btnSubmit.json();
      console.log(test);
      return window.location.replace(`/posts/${postID}`);
    }
  } else {
    textBoxEl.style.border = "solid red 1.5px";
    setTimeout(() => {
      textBoxEl.style.border = "solid black 1px";
    }, 2000);
  }
};
commentBtn.addEventListener("click", submitComment);
