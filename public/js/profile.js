let newPostBtn = document.getElementById("create-post");

const makeNewPost = async (e) => {
  e.preventDefault();
  let titleEl = document.getElementById("title");
  let contentEl = document.getElementById("content");

  let title = titleEl.value.trim();
  let blogContent = contentEl.value.trim();
  let userID = document.querySelector(".new-post-container").id;

  if (title !== "" && blogContent !== "") {
    let createdPost = await fetch("/profile/createPost", {
      method: "POST",
      body: JSON.stringify({ title, blogContent, userID }),
      headers: {
        "Content-type": "Application/json",
      },
    });

    if (createdPost.ok) {
      createdPost = await createdPost.json();
      window.location.replace("/");
    } else {
      alert("Post could not be created");
    }
  } else {
    titleEl.style.border = "solid red 3px";
    contentEl.style.border = "solid red 3px";
    setTimeout(() => {
      titleEl.style.border = "solid black 1px";
      contentEl.style.border = "solid black 1px";
    }, 2000);
  }
};

newPostBtn.addEventListener("click", makeNewPost);
