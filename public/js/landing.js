const blogCards = document.querySelectorAll(".recent-posts");

const openArticle = (event) => {
  const articleId = event.target.closest(".recent-posts").id;

  if (articleId) {
    window.location.replace(`/posts/${articleId}`);
  }
};
blogCards.forEach((card) => {
  card.addEventListener("click", openArticle);
});
