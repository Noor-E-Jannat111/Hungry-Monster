// Food List
const getFoodList = () => {
    let searchInputTxt = document.getElementById("search-input").value;
    let key;
    if (searchInputTxt.length == 1) {
        key = "f";
    } else {
        key = "s";
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${key}=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            displayFood(data.meals);
        });
};

// Display Food

const displayFood = (foods) => {
    let foodContainer = document.getElementById("food-container");
    if (foods === null || foods.length < 0) {
        const foodDiv = document.createElement("div");
        const foodInfo = `
            <h3> "Please Give a Valid Food Name!"</h3>
        `;
        foodDiv.innerHTML = foodInfo;
        foodContainer.appendChild(foodDiv);
    } else {
        foods.forEach((food) => {
            const foodDiv = document.createElement("div");
            // console.log(food);
            foodDiv.className = "col-md-4 my-3";
            const foodInfo = `
                    <div onclick="displayCountryDetail('${food.idMeal}')" class="card" style="width: 18rem;">
                        <img  class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text"><h4>${food.strMeal}</h4></p>
                        </div>
                    </div>
                `;
            foodDiv.innerHTML = foodInfo;
            foodContainer.appendChild(foodDiv);
        });
    }
    document.getElementById("search-input").value = "";
}

const displayCountryDetail = foodDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetails}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getFoodInfo(data.meals[0]);
        });
}

const getFoodInfo = food => {
    const foodDetail = document.getElementById('food-details');
    const cockingIngredients = [];
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            cockingIngredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }
    foodDetail.innerHTML = `
          <div class="card card-custom">
              <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
              <div class="card-body">
                  <p class="card-text"><h4>${food.strMeal}</h4></p>
                  <h5>Cocking Ingredients:</h5>
                  <ul>
                      ${cockingIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
              </div>
          </div>
           `;
}