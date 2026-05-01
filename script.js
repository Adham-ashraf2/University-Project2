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

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealItems.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = entry.target.dataset.revealDelay;

        if (delay) {
          entry.target.style.transitionDelay = `${delay}ms`;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const bookingForm = document.querySelector("[data-booking-form]");
const bookingMessage = document.querySelector("[data-booking-message]");
const contactForm = document.querySelector("[data-contact-form]");
const contactMessage = document.querySelector("[data-contact-message]");
const roomOptions = Array.from(document.querySelectorAll("input[name='room']"));
const roomPreview = document.querySelector("[data-room-preview]");
const roomPreviewImage = document.querySelector("[data-room-preview-image]");
const roomPreviewTitle = document.querySelector("[data-room-preview-title]");
const roomPreviewText = document.querySelector("[data-room-preview-text]");

if (bookingForm && bookingMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingMessage.textContent =
      "Thank you. Your reservation request has been received.";
    bookingMessage.classList.add("is-confirmed");
  });
}

if (contactForm && contactMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactMessage.textContent =
      "Thank you. Your message has been received by our guest care team.";
    contactMessage.classList.add("is-confirmed");
    contactForm.reset();
  });
}

function updateRoomPreview(option) {
  if (
    !option ||
    !roomPreview ||
    !roomPreviewImage ||
    !roomPreviewTitle ||
    !roomPreviewText
  ) {
    return;
  }

  roomPreview.classList.add("is-changing");

  window.setTimeout(() => {
    roomPreviewImage.src = option.dataset.roomImage;
    roomPreviewImage.alt = option.dataset.roomAlt;
    roomPreviewTitle.textContent = option.dataset.roomTitle;
    roomPreviewText.textContent = option.dataset.roomText;
    roomPreview.classList.remove("is-changing");
  }, 180);
}

if (roomOptions.length) {
  roomOptions.forEach((option) => {
    option.addEventListener("change", () => updateRoomPreview(option));
  });
}
