"use strict";

let cocktailSearch = function () {
  let searched = document.getElementById("search-bar");
  if (searched.value == "") {
    return;
  }
  let previewImg = document.getElementById("preview-div");
  previewImg.style.display = "none";
  let endpoint = document.getElementById("search-bar").value;
  let main = document.getElementsByTagName("main")[0];
  if (main.children.length > 1) {
    return;
  }
  let errorMessage = document.getElementById("no-cocktail-found");
  let drinks;
  let ingr = "";

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endpoint}`)
    .then((response) => response.json())
    .then((data) => {
      drinks = data.drinks;
      if (drinks == null) {
        errorMessage.style.display = "block";
        return;
      }
      drinks.forEach((cocktail) => {
        let divHolder = document.createElement("div");
        divHolder.classList.add("cocktails-holder");
        let image = document.createElement("img");
        image.classList.add("cocktail-thumb");
        let title = document.createElement("h3");
        title.classList.add("cocktail-name");
        let ingredients = document.createElement("p");
        ingredients.classList.add("ingredients");
        let glassType = document.createElement("p");
        glassType.classList.add("glass");

        image.src = cocktail.strDrinkThumb;
        title.innerHTML = cocktail.strDrink;

        for (let i = 1; i < 9; i++) {
          if (cocktail[`strIngredient${i}`] === null) {
            continue;
          } else {
            ingr += cocktail[`strIngredient${i}`] + "," + " ";
          }
        }

        ingredients.innerHTML =
          `<b>Ingredients: </b>` + ingr.slice(0, ingr.length - 2);
        glassType.innerHTML = `<b>Glass type:</b>` + cocktail.strGlass;
        ingr = "";

        main.appendChild(divHolder);
        divHolder.appendChild(image);
        divHolder.appendChild(title);
        divHolder.appendChild(ingredients);
        divHolder.appendChild(glassType);

        divHolder.style.display = "block";
      });
    });
};

let closeError = function () {
  let errorMessage = document.getElementById("no-cocktail-found");
  let searched = document.getElementById("search-bar");
  errorMessage.style.display = "none";
  searched.value = "";
};

let clearAll = function (e) {
  let main = document.getElementsByTagName("main")[0];
  document.getElementById("search-bar").value = "";
  main.innerHTML = "";

  let previewImg = document.getElementById("preview-div");
  previewImg.style.display = "flex";
};

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    cocktailSearch();
  }
});

/*
strDrinkThumb
strDrink
strIngredient1
strGlass
*/
