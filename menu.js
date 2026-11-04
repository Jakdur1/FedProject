const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.querySelector("#menu-search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

let activeFilter = "all";

function normalizeText(value) {
  return value
    .toLocaleLowerCase("sk")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateMenu() {
  const searchTerm = normalizeText(searchInput.value.trim());
  let visibleCount = 0;

  menuCards.forEach((card) => {
    const matchesCategory =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = normalizeText(card.textContent).includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultCount.textContent = `Počet zobrazených jedál: ${visibleCount}.`;
  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateMenu();
  });
});

searchInput.addEventListener("input", updateMenu);
updateMenu();
