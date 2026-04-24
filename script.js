const menuCards = Array.from(document.querySelectorAll("[data-menu-card]"));
const menuArrows = Array.from(document.querySelectorAll("[data-menu-arrow]"));

let activeMenuIndex = 0;

function showMenuCard(index) {
  menuCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;
    card.hidden = !isActive;
    card.classList.toggle("is-active", isActive);
  });
}

menuArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const direction = arrow.dataset.menuArrow;
    activeMenuIndex =
      direction === "next"
        ? (activeMenuIndex + 1) % menuCards.length
        : (activeMenuIndex - 1 + menuCards.length) % menuCards.length;

    showMenuCard(activeMenuIndex);
  });
});

if (menuCards.length && menuArrows.length) {
  showMenuCard(activeMenuIndex);
}
