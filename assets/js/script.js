var result = document.getElementById("result");
var searchBtn = document.getElementById("search-btn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var nameResult = document.getElementById("foodName")
var displayIng = document.getElementById("displayIng")
var displayIMG = document.getElementById("displayIMG")
var ingredientsEl = document.getElementById("ingredientList");

var nutritionUrl = "https://api.edamam.com/api/nutrition-data?app_id=97a4a0a7&app_key=c9964d9d543eaae9d00a7817640d1624&nutrition-type=cooking&ingr="
searchBtn.addEventListener("click", () => {
    var userInp = document.getElementById("user-inp").value;
        console.log(userInp)
    if (userInp.length == 0) {
      result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    } else {
    fetch(url + userInp)
    .then((response) => response.json())
    .then(async (data) => {
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
        console.log(ingredientList)
        var nutritionArray  = [...ingredientList];
        for(var i=0; i < nutritionArray.length; i++) {
          nutritionArray[i] = nutritionArray[i].replaceAll(" ", "%20");
        }
        console.log(ingredientList)
        var nutritionBodyEl = $('#nutrition_body');
        var totalCaloriesEl = $('#total_cal');
        var totalCarbsEl = $('#total_carb');
        var totalFatEl = $('#total_fat');
        var totalCholesterolEl = $('#total_chol');
        var totalProteinEl = $('#total_pro');
        var totalSodiumEl = $('#total_sodium');
        nutritionBodyEl.empty();



        var totalCalories = 0;
        var totalProtein = 0;
        var totalFat = 0;
        var totalSodium = 0;
        var totalCholesterol = 0;
        var totalCarbs = 0;
        for(let i=0; i < nutritionArray.length; i++){
          var nutritionIngredientRow = $('<tr>')
          
          await fetch(nutritionUrl + nutritionArray[i])
          .then((nutritionResponse) => nutritionResponse.json())
          .then((nutritionData) =>{

            var ingredient = ingredientList[i];
            var ingredientData = $('<td>').text(ingredient);
            nutritionIngredientRow.append(ingredientData)

            var calories = nutritionData.calories
            var caloriesData = $('<td>').text(calories);
            nutritionIngredientRow.append(caloriesData);

            var fat = nutritionData.totalNutrients.FAT.quantity
            var fatData = $('<td>').text(fat);
            nutritionIngredientRow.append(fatData);

            var cholesterol = nutritionData.totalNutrients.CHOLE.quantity
            var cholesterolData = $('<td>').text(cholesterol);
            nutritionIngredientRow.append(cholesterolData);

            var carbs = nutritionData.totalNutrients.CHOCDF.quantity
            var carbstData = $('<td>').text(carbs);
            nutritionIngredientRow.append(carbstData);

            var sodium = nutritionData.totalNutrients.NA.quantity
            var sodiumData = $('<td>').text(sodium);
            nutritionIngredientRow.append(sodiumData);


            var protein = nutritionData.totalNutrients.PROCNT.quantity
            var proteinData = $('<td>').text(protein);
            nutritionIngredientRow.append(proteinData);
            nutritionBodyEl.append(nutritionIngredientRow);
            
            totalCalories = totalCalories + calories;
            totalProtein = totalProtein + protein;
            totalFat = totalFat + fat;
            totalSodium = totalSodium + sodium;
            totalCholesterol = totalCholesterol + cholesterol;
            totalCarbs = totalCarbs + carbs;
          })

        }
        totalCaloriesEl.text(`${totalCalories} cal`);
        totalCarbsEl.text(`${totalCarbs} g`);
        totalFatEl.text(`${totalFat} g`);
        totalCholesterolEl.text(`${totalCholesterol} g`);
        totalProteinEl.text(`${totalProtein} g`);
        totalSodiumEl.text(`${totalSodium} g`);
        
  displayIMG.innerHTML = "<img src =" + foodIMG + ">"
    })}
   });