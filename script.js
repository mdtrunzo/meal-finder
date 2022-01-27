const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const single_mealEl = document.getElementById('single-meal')

//Search meal and fetch from API
function searchMeal(e) {
e.preventDefault()

//Clear single meal
mealsEl.innerHTML = ''

//Get the search term
const term = search.value

//Check for empty 
if(term.trim()) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      resultHeading.innerHTML = `<h2>Search Results for '${term}': </h2>`

      if(data.meals === null){
        resultHeading.innerHTML = `<p>There are no search result for '${term}'. Please try again</p>`
      }else{
        data.meals.map(meal => {
          mealsEl.innerHTML += `<div class="meal">
          <img src=${meal.strMealThumb} alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
         </div>
        `
        })
        .join('')
      }
    })
    .catch(err => console.log(err))
    search.value = ''
}else{
  alert('Please enter a search term')
}
}

//Event listener
submit.addEventListener('submit', searchMeal)