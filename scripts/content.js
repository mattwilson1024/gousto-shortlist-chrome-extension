const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

function attachStylesToBody() {
  var styles = `
    [data-shortlist="true"] div:first-child {
      background-color: palegreen;
    }

    .shortlist-only [data-testing="menuRecipeViewDetails"][data-shortlist="false"],
    .shortlist-only [data-testing="menuRecipeViewDetails"]:not([data-shortlist]) {
      display: none;
    }

    .shortlist-button {
      height: 2.5rem;
      width: 2.5rem;
      border: 1px solid rgb(97, 92, 255);
      color: rgb(97, 92, 255);
      background-color: rgb(255, 255, 255);
      border-radius: 3px;
      -webkit-box-pack: center;
      justify-content: center;
      padding-top: 0.375rem;
      margin-right: 1rem;
    }

    .shortlist-filter-button {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      height: 2.5rem;
      width: 2.5rem;
      border: 1px solid rgb(97, 92, 255);
      color: rgb(97, 92, 255);
      background-color: rgb(255, 255, 255);
      border-radius: 3px;
      -webkit-box-pack: center;
      justify-content: center;
      padding-top: 0.375rem;
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

function selectAllRecipesList() {
  const allRecipesButton = document.querySelector(`[data-slug="all-recipes"]`);
  if (!allRecipesButton) { console.error(`"Gousto Shorlist: "All Recipes" button not found`); return; }
  allRecipesButton.click();
}

function addShortlistButtonsToAllRecipes() {
  const recipeBoxes = document.querySelectorAll(`[data-testing="menuRecipeViewDetails"]`);
  if (!recipeBoxes) { console.error(`"Gousto Shorlist: Can't add shortlist buttons because no recipe boxes were found`); return; }
  recipeBoxes.forEach(recipeBox => {
    recipeBox.classList.add(`shortlistable`);
    const addRecipeButton = recipeBox.querySelector(`[aria-label="Add recipe"]`);

    const shortlistButton = document.createElement(`button`);
    shortlistButton.classList.add(`shortlist-button`);
    const shortlistButtonText = document.createElement(`span`);
    shortlistButtonText.innerHTML = `X`;
    shortlistButton.appendChild(shortlistButtonText);

    shortlistButton.addEventListener(`click`, (event) => {
      recipeBox.dataset.shortlist = !(recipeBox.dataset?.shortlist === `true` ?? false);
      event.preventDefault();
      event.stopPropagation();
    });

    addRecipeButton.parentElement.insertBefore(shortlistButton, addRecipeButton);
  });
}

function addShortlistFilterButton() {
  const shortlistFilterButton = document.createElement(`button`);
  shortlistFilterButton.classList.add(`shortlist-filter-button`);
  const shortlistFilterButtonText = document.createElement(`span`);
  shortlistFilterButtonText.innerHTML = `!!`;
  shortlistFilterButton.appendChild(shortlistFilterButtonText);
  document.body.appendChild(shortlistFilterButton);

  shortlistFilterButton.addEventListener(`click`, (event) => {
    document.body.classList.toggle(`shortlist-only`);
  });
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
  addShortlistFilterButton();
  selectAllRecipesList();
  addShortlistButtonsToAllRecipes();
  console.log(`Gousto Shortlist: Ready`);
}

main();