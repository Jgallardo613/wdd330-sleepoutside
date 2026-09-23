console.log("Newsletter script loaded");

const newsDialouge = document.getElementById("newsletter-dialouge");
const openNews = document.getElementById("openNews");
const closeNews = document.getElementById("closeNews");
const subNews = document.getElementById("subscribeNews");

openNews.addEventListener("click", () => {
    newsDialouge.showModal();
});

closeNews.addEventListener("click", () => {
    newsDialouge.close();
});

subNews.addEventListener("submit", (event) => {
    newsDialouge.close();
});