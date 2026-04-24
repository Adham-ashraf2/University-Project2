const menuCards = Array.from(document.querySelectorAll("[data-menu-card]"));
const menuArrows = Array.from(document.querySelectorAll("[data-menu-arrow]"));

let activeMenuIndex = 0;

function showMenuCard(index, direction = "next") {
  menuCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;
    card.hidden = !isActive;
    card.classList.toggle("is-active", isActive);
    card.classList.remove("is-entering-next", "is-entering-prev");

    if (isActive) {
      void card.offsetWidth;
      card.classList.add(`is-entering-${direction}`);
    }
  });
}

menuArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const direction = arrow.dataset.menuArrow;
    activeMenuIndex =
      direction === "next"
        ? (activeMenuIndex + 1) % menuCards.length
        : (activeMenuIndex - 1 + menuCards.length) % menuCards.length;

    showMenuCard(activeMenuIndex, direction);
  });
});

if (menuCards.length && menuArrows.length) {
  showMenuCard(activeMenuIndex);
}
