const editForm = document.querySelector("form");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("content");
const handleEdits = async (event) => {
  event.preventDefault();
  let titleVal = titleEl.value.trim();
  let textVal = textEl.value.trim();
  if (event.target.id === "edit-btn") {
    console.log("hit");
    if (titleVal === "" || textVal === "") {
      titleEl.style.border = "solid red 1.5px";
      textEl.style.border = "solid red 1.5px";
      alert("Both a title and content field need to be filled");
      setTimeout(() => {
        titleEl.style.border = "solid black 1px";
        textEl.style.border = "solid black 1px";
      }, 2000);
    } else {
      const postId = editForm.id;
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
