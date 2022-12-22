const LOCAL_STORAGE_KEY = `shortlist`;
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

function attachStylesToBody() {
  var styles = `
    [data-testing="menuRecipeViewDetails"][data-testing="menuRecipeViewDetails"][data-shortlist] > div {
      background-color: palegreen;
    }

    .shortlist-only [data-testing="menuRecipeViewDetails"]:not([data-shortlist]),
    .shortlist-only [data-testing="menuRecipeOutOfStock"] {
      display: none;
    }

    .shortlist-only .shortlist-filter-button {
      background-color: orange;
      color: white;
    }

    .shortlist-button {
      height: 2.5rem;
      border: 1px solid rgb(97, 92, 255);
      color: rgb(97, 92, 255);
      background-color: rgb(255, 255, 255);
      border-radius: 3px;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 0 10px 0 10px;
      margin-right: 1rem;
      line-height: 1rem;
    }

    .shortlist-toolbar {
      position: fixed;
      bottom: 8px;
      left: 20px;
      z-index: 9999;
      display: flex;
      gap: 10px;
    }

    .shortlist-toolbar button {
      display: inline-flex;
      align-items: center;
      height: 48px;
      justify-content: center;
      border: 1px solid rgb(97, 92, 255);
      color: black;
      background-color: rgb(255, 255, 255);
      border-radius: 3px;
      -webkit-box-pack: center;
      padding: 0 20px 0 20px;
      font-weight: bold;
      line-height: 1rem;
      font-size: 0.9rem;
    }
  `;
  var stylesheet = document.createElement("style")
  stylesheet.innerHTML = styles;
  document.body.appendChild(stylesheet);
}

function isPageBlurred() {
  const pageOverlayElement = document.querySelector(`[data-testing="menuRecipes"]`).parentElement;
  if (!pageOverlayElement) { return false; }

  return window.getComputedStyle(pageOverlayElement)?.[`-webkit-filter`] === `blur(5px)`;
}

function hasRecipes() {
  const recipeBoxes = document.querySelectorAll(`[data-testing="menuRecipeViewDetails"]`);
  return recipeBoxes?.length > 0;
}

function clickAllRecipesTab() {
  const allRecipesButton = document.querySelector(`[data-slug="all-recipes"]`);
  if (!allRecipesButton) { console.error(`"Gousto Shorlist: "All Recipes" button not found`); return; }
  allRecipesButton.click();
}

function addShortlistButtonsToAllRecipes() {
  const recipeBoxes = document.querySelectorAll(`[data-testing="menuRecipeViewDetails"]`);
  if (!recipeBoxes) { console.error(`"Gousto Shorlist: Can't add shortlist buttons because no recipe boxes were found`); return; }
  recipeBoxes.forEach(recipeBox => {
    const addRecipeButton = recipeBox.querySelector(`[aria-label="Add recipe"]`);
    const shortlistButton = addRecipeButton.insertAdjacentElement(`beforebegin`, document.createElement(`button`));
    shortlistButton.classList.add(`shortlist-button`);
    shortlistButton.innerText = `👍`;

    shortlistButton.addEventListener(`click`, (event) => {
      const isCurrentlyShortlisted = recipeBox.dataset?.shortlist === `true`;
      updateShortlistStatus(recipeBox, !isCurrentlyShortlisted);
      event.preventDefault();
      event.stopPropagation();
    });
  });
}

function updateShortlistStatus(recipeBox, shouldBeShortlisted) {
  const shortlistButton = recipeBox.querySelector(`.shortlist-button`);
  if (shouldBeShortlisted) {
    recipeBox.dataset.shortlist = `true`;
    shortlistButton.innerText = `👎`;
  } else {
    recipeBox.removeAttribute(`data-shortlist`);
    shortlistButton.innerText = `👍`;
  }
  updateShortlistCount();
}

function addToolbarButtons() {
  const toolbar = document.body.appendChild(document.createElement(`div`));
  toolbar.classList.add(`shortlist-toolbar`);

  const shortlistFilterButton = toolbar.appendChild(document.createElement(`button`));
  shortlistFilterButton.classList.add(`shortlist-filter-button`);
  shortlistFilterButton.innerText = "Shortlisted: 0";
  shortlistFilterButton.addEventListener(`click`, (event) => {
    document.body.classList.toggle(`shortlist-only`);
  });

  const saveButton = toolbar.appendChild(document.createElement(`button`));
  saveButton.innerText = "Save";
  saveButton.addEventListener(`click`, (event) => {
    const shortlistedRecipeIds = getShortlistIdsFromDom();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shortlistedRecipeIds));
  });

  const loadButton = toolbar.appendChild(document.createElement(`button`));
  loadButton.innerText = "Load";
  loadButton.addEventListener(`click`, (event) => {
    const recalledRecipeIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? `[]`);
    setShortlistIdsInDom(recalledRecipeIds);
  });
}

function getShortlistIdsFromDom() {
  const shortlistedRecipeBoxes = document.querySelectorAll(`[data-testing="menuRecipeViewDetails"][data-shortlist]`);
  return Array.from(shortlistedRecipeBoxes ?? []).map(recipeBox => recipeBox.getAttribute(`data-testing-id`));
}

function setShortlistIdsInDom(ids) {
  const recipeBoxes = document.querySelectorAll(`[data-testing="menuRecipeViewDetails"]`);
  recipeBoxes.forEach(recipeBox => {
    const recipeId = recipeBox.getAttribute(`data-testing-id`);
    updateShortlistStatus(recipeBox, ids.includes(recipeId));
  });
}


function updateShortlistCount() {
  const shortlistFilterButton = document.querySelector(`.shortlist-filter-button`);
  if (!shortlistFilterButton) { return; }
  const count = document.querySelectorAll(`[data-shortlist]`).length;
  shortlistFilterButton.innerHTML = `Shortlisted: ${count}`;
}

async function main() {
  await wait(2000);
  while (isPageBlurred()) {
    console.log(`Gousto Shortlist: Waiting until page is not blurred`);
    await wait(1000);
  }
  while (!hasRecipes()) {
    console.log(`Gousto Shortlist: Waiting until page has loaded recipes`);
    await wait(1000);
  }
  console.log(`Gousto Shortlist: Setting up and selecting "All Recipes" list`);
  attachStylesToBody();
  addToolbarButtons();
  clickAllRecipesTab();
  addShortlistButtonsToAllRecipes();
  updateShortlistCount();
  console.log(`Gousto Shortlist: Ready`);
}

main();