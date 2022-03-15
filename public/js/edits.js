const editForm = document.querySelector("form");
const postId = editForm.id;
const titleEl = document.getElementById("title");
const textEl = document.getElementById("content");
console.log(postId);
const handleEdits = async (event) => {
  let titleVal = titleEl.value.trim();
  let textVal = textEl.value.trim();
  if (event.target.id === "edit-btn") {
    if (titleVal === "" || textVal === "") {
      titleEl.style.border = "solid red 1.5px";
      textEl.style.border = "solid red 1.5px";
      alert("Both a title and content field need to be filled");
      setTimeout(() => {
        titleEl.style.border = "solid black 1px";
        textEl.style.border = "solid black 1px";
      }, 2000);
    } else {
      let submitUpdates = await fetch(`/profile/updatePost/${postId}`, {
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ textVal, titleVal }),
        method: "PUT",
      });

      if (submitUpdates.ok) {
        submitUpdates = await submitUpdates.json();

        if (submitUpdates) {
          window.location.replace("/profile");
        }
      }
    }
  }
};

editForm.addEventListener("click", handleEdits);
