var result = document.getElementById("result");
var searchBtn = document.getElementById("search-btn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var nameResult = document.getElementById("foodName")
var displayIng = document.getElementById("displayIng")
var displayIMG = document.getElementById("displayIMG")
searchBtn.addEventListener("click", () => {
    var userInp = document.getElementById("user-inp").value;
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
displayIMG.innerHTML = "<img src =" + foodIMG + ">"
    })}
   });
