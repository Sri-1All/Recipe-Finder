const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");


// ======================================
// SEARCH RECIPE
// ======================================

async function searchRecipe() {

    const searchValue = searchInput.value.trim();

    if (searchValue === "") {
        alert("Please enter a recipe name");
        return;
    }

    loading.style.display = "block";
    recipeContainer.innerHTML = "";

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        );

        const data = await response.json();

        loading.style.display = "none";

        if (data.meals === null) {

            recipeContainer.innerHTML = `
                <p class="no-results">
                    No recipes found for "${searchValue}".
                </p>
            `;

            return;
        }

        displayRecipes(data.meals);

    } catch (error) {

        loading.style.display = "none";

        recipeContainer.innerHTML = `
            <p class="no-results">
                Something went wrong. Please try again.
            </p>
        `;

        console.log("Error:", error);
    }
}


// ======================================
// CATEGORY SEARCH
// ======================================

function searchByCategory(category) {

    // Put category name inside search box
    searchInput.value = category;

    // Search recipes
    searchRecipe();

    // Scroll down to recipe section
    document.getElementById("recipes").scrollIntoView({
        behavior: "smooth"
    });
}


// ======================================
// DISPLAY RECIPES
// ======================================

function displayRecipes(recipes) {

    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {

        const card = document.createElement("div");

        card.className = "recipe-card";

        card.innerHTML = `
            <img
                src="${recipe.strMealThumb}"
                alt="${recipe.strMeal}"
            >

            <div class="recipe-info">

                <h2>${recipe.strMeal}</h2>

                <p>
                    <strong>Category:</strong>
                    ${recipe.strCategory}
                </p>

                <p>
                    <strong>Cuisine:</strong>
                    ${recipe.strArea}
                </p>

                <button
                    class="view-btn"
                    onclick="showRecipe('${recipe.idMeal}')"
                >
                    View Recipe
                </button>

            </div>
        `;

        recipeContainer.appendChild(card);

    });
}


// ======================================
// SHOW RECIPE DETAILS
// ======================================

async function showRecipe(id) {

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const data = await response.json();

        const recipe = data.meals[0];


        // Recipe image
        document.getElementById("recipeImage").src =
            recipe.strMealThumb;


        // Recipe name
        document.getElementById("recipeName").textContent =
            recipe.strMeal;


        // Category
        document.getElementById("recipeCategory").textContent =
            recipe.strCategory;


        // Cuisine
        document.getElementById("recipeArea").textContent =
            recipe.strArea;


        // Instructions
        document.getElementById("instructions").textContent =
            recipe.strInstructions;


        // ======================================
        // INGREDIENTS
        // ======================================

        const ingredientsList =
            document.getElementById("ingredientsList");

        ingredientsList.innerHTML = "";

        for (let i = 1; i <= 20; i++) {

            const ingredient =
                recipe[`strIngredient${i}`];

            const measure =
                recipe[`strMeasure${i}`];


            if (
                ingredient &&
                ingredient.trim() !== ""
            ) {

                const li =
                    document.createElement("li");

                li.textContent =
                    `${measure} ${ingredient}`;

                ingredientsList.appendChild(li);
            }
        }


        // Open recipe modal
        document.getElementById("recipeModal").style.display =
            "block";

    } catch (error) {

        console.log("Error:", error);

        alert("Unable to load recipe details");

    }
}


// ======================================
// CLOSE MODAL
// ======================================

function closeModal() {

    document.getElementById("recipeModal").style.display =
        "none";
}


// ======================================
// ENTER KEY SEARCH
// ======================================

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchRecipe();

    }
    });

// ======================================
// MOBILE NAVBAR
// ======================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");


// Open / Close menu

hamburger.addEventListener("click", function () {

    hamburger.classList.toggle("active");

    navLinks.classList.toggle("active");

});


// Close menu when a link is clicked

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        hamburger.classList.remove("active");

        navLinks.classList.remove("active");

    });



});