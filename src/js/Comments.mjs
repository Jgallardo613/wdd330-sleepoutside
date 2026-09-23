// src/js/Comments.mjs
// Comments subsystem: customers can add a comment to any product and
// all comments for that product are shown on its detail page.

const MAX_COMMENT_LENGTH = 500;

// One localStorage key per product, so each product has its own comments.
const storageKey = (productId) => `so-comments-${productId}`;

export function getComments(productId) {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey(productId)));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function addComment(productId, name, text) {
  const comment = {
    name: name.trim() || "Anonymous",
    text: text.trim().slice(0, MAX_COMMENT_LENGTH),
    date: new Date().toISOString(),
  };
  const comments = getComments(productId);
  comments.push(comment);
  localStorage.setItem(storageKey(productId), JSON.stringify(comments));
  return comment;
}

// User text is always inserted with textContent, never innerHTML,
// so a comment can't inject HTML or scripts into the page.
function renderComments(productId, listElement) {
  const comments = getComments(productId);
  listElement.replaceChildren();

  if (comments.length === 0) {
    const empty = document.createElement("p");
    empty.className = "comments__empty";
    empty.textContent = "No comments yet. Be the first to comment!";
    listElement.append(empty);
    return;
  }

  // Newest first
  [...comments].reverse().forEach((comment) => {
    const item = document.createElement("article");
    item.className = "comments__item";

    const author = document.createElement("h3");
    author.className = "comments__author";
    author.textContent = comment.name;

    const date = document.createElement("time");
    date.className = "comments__date";
    date.dateTime = comment.date;
    date.textContent = new Date(comment.date).toLocaleDateString();

    const body = document.createElement("p");
    body.className = "comments__text";
    body.textContent = comment.text;

    item.append(author, date, body);
    listElement.append(item);
  });
}

export function initComments(productId, container) {
  if (!container) return;

  // Static template only (no user data), so innerHTML is safe here.
  container.innerHTML = `
    <h2>Customer Comments</h2>
    <div class="comments__list" aria-live="polite"></div>
    <form class="comments__form">
      <label for="comment-name">Name (optional)</label>
      <input id="comment-name" name="name" type="text" maxlength="50" autocomplete="name">
      <label for="comment-text">Your comment</label>
      <textarea id="comment-text" name="text" rows="4" maxlength="${MAX_COMMENT_LENGTH}"></textarea>
      <p class="comments__error" role="alert"></p>
      <button type="submit">Add comment</button>
    </form>
  `;

  const list = container.querySelector(".comments__list");
  const form = container.querySelector(".comments__form");
  const error = container.querySelector(".comments__error");

  renderComments(productId, list);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const text = form.elements.text.value;

    if (!text.trim()) {
      error.textContent = "Please write a comment before submitting.";
      return;
    }

    error.textContent = "";
    addComment(productId, name, text);
    renderComments(productId, list);
    form.reset();
  });
}
