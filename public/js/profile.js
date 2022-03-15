const newPostBtn = document.getElementById("create-post");
const deleteBtn = document.getElementById("delete-post-btn");
const editBtn = document.getElementById("delete-post-btn");

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

const updatePost = (id) => {};

newPostBtn.addEventListener("click", makeNewPost);

const handleBlogCard = async (event) => {
  const target = event.target;
  const cardContainer = target.closest(".recent-posts");
  const postId = cardContainer.id;

  if (target.id === "delete-post-btn") {
    const confirmDelete = confirm(
      "This is an irreversible action, are you sure you want to delete?"
    );
    if (confirmDelete === true) {
      const deletePost = await fetch(`/profile/deletePost/${postId}`, {
        headers: {
          "Content-type": "Application/json",
        },
        method: "DELETE",
      });

      if (deletePost.ok) {
        const successDelete = await deletePost.json();

        if (successDelete) {
          window.location.replace("/profile");
        }
      }
    } else {
      return;
    }
  } else if (target.id === "edit-btn") {
    const editPost = await fetch(`/edit/${postId}`);
    if (editPost.ok) {
      window.location.replace(`/edit/${postId}`);
    }
  } else {
    window.location.replace(`/posts/${postId}`);
  }
};
const blogCards = document.querySelectorAll(".recent-posts");

blogCards.forEach((card) => {
  card.addEventListener("click", handleBlogCard);
});
