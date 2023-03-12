var result = document.getElementById("result");
var searchBtn = document.getElementById("search-btn");
var flipBtn = document.getElementById("flipBtn");
var returnBtn = document.getElementById("returnBtn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var nameResult = document.getElementById("foodName")
var displayIng = document.getElementById("displayIng")
var displayIMG = document.getElementById("displayIMG") 
var ingredientsEl = document.getElementById("ingredientList")

flipBtn.addEventListener("click", () => {
    var flipCard = document.getElementById("nutrition")
    console.log(flipCard)
    flipCard.classList.add("flip")
} )

returnBtn.addEventListener("click", () => {
    var flipCard = document.getElementById("nutrition")
    console.log(flipCard)
    flipCard.classList.remove("flip")
} )




searchBtn.addEventListener("click", () => {
    var userInp = document.getElementById("user-inp").value;
        console.log(userInp)
    if (userInp.length == 0) {
      result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    } else {
    fetch(url + userInp)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(data.meals.length);
        var arrayLength = data.meals.length;
        var pickMeal = Math.floor(Math.random() * arrayLength)
        console.log(pickMeal)
        var randomMeal = data.meals[pickMeal]
        console.log(randomMeal)
        console.log(randomMeal.strMealThumb)
        console.log(randomMeal.strMeal)
        console.log(randomMeal.strInstructions)
        var cookIntruct = randomMeal.strInstructions
        var foodIMG = randomMeal.strMealThumb
        var foodName = randomMeal.strMeal
        result.innerHTML = cookIntruct
        nameResult.innerHTML = foodName
        var count = 1;
        var ingredientList= [];
        for (i in randomMeal){
          var ingredients = "";
          var measurments = "";
          if (i.startsWith("strIngredient") && randomMeal[i]){
            ingredients = randomMeal[i]
            measurments = randomMeal["strMeasure" + count];
            count += 1;
            ingredientList.push(measurments + " " + ingredients)
          }
        }
        ingredientsEl.innerHTML = ingredientList.join("<br/>"
        )

        console.log(ingredientList)
displayIMG.innerHTML = "<img src =" + foodIMG + ">"
    })}
   });



//    var saveRecipe = (newRecipe) => {
//     let recipeExists = false;
//     for (let i = 0; i < localStorage.length; i++) {
//         if (localStorage["recipes" + i] === newRecipe) {
//             recipeExists = true;
//             break;
//         }
//     }
//     if (recipeExists === false) {
//         localStorage.setItem('recipes' + localStorage.length, newRecipe);
//     }
// }


// var renderRecipes = () => {
//     $('#recipe-results').empty();
//     if (localStorage.length===0){
//         if (lastRecipe){
//             $('#search-recipe').attr("value", lastRecipe);
//         } else {
//             $('#search-recipe').attr("value", "Beef");
//         }
//     } else {
//         let lastRecipeKey="recipes"+(localStorage.length-1);
//         lastRecipe=localStorage.getItem(lastRecipeKey);
//         $('#search-recipe').attr("value", lastRecipe);
//         for (let i = 0; i < localStorage.length; i++) {
//             let recipe = localStorage.getItem("recipes" + i);
//             let recipeEl;
//             if (currentRecipe===""){
//                 currentRecipe=lastRecipe;
//             }
        
//             if (recipe === currentRecipe) {
//                 recipeEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
//             } else {
//                 recipeEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
//             } 
        
//             $('#recipe-results').prepend(cityEl);
//         }
        
//         if (localStorage.length>0){
//             $('#clear-storage').html($('<a id="clear-storage" href="#">clear</a>'));
//         } else {
//             $('#clear-storage').html('');
//         }
//     }
    
// }

// $('#search-button').on("click", (event) => {
// event.preventDefault();
// currentRecipe = $('#search-Recipe').val();
// getCurrentConditions(event);
// });

// $('#recipe-results').on("click", (event) => {
//     event.preventDefault();
//     $('#search-recipe').val(event.target.textContent);
//     currentRecipe=$('#search-recipe').val();
//     getCurrentConditions(event);
// });

// $("#clear-storage").on("click", (event) => {
//     localStorage.clear();
//     renderRecipes();
// });

// renderRecipes();

// getCurrentConditions();
