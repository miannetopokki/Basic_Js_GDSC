document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value
    
    fetch('https:www.themealdb.com/api/json/v1/1/search.php?s=' + inputValue)
    .then(response => response.json())
    .then(data => {
        const items = document.getElementById("items")
        items.innerHTML = ""
        if(data.meals == null){
            console.log("No Meals")
            document.getElementById("msg").style.display = "block"
            

        }else{
            console.log(data.meals)
            document.getElementById("msg").style.display = "none"
            document.getElementById("detail").style.display = "none"
            
              
            data.meals.forEach(meal => {
                console.log(meal)
                itemDiv = document.createElement('div')
                itemDiv.className = "m-2"
                
                itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`)
                let itemInfo = `
                <div class ="menus">
                    <div class="menu-item">
  
               
                    
                        <div class="single-menu">
                        <img src="${meal.strMealThumb}" alt="">
                    

                            <h4>${meal.strMeal}</h4>
                        
                        </div>
                    
                    </div>
                </div>
                
                `
                itemDiv.innerHTML = itemInfo
                items.appendChild(itemDiv)
                


            })

        }
    })
})

function details(id){
    console.log(id)
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(detail =>{
        document.getElementById("detail").style.display = "block"
        let meal = detail.meals[0]
        console.log(meal)
        let details = document.getElementById("detail")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")
        let detailsInfo =  `
        <div class="menus">
            <div class="menu-item">
                <div class="title">${meal.strCategory}</div>
                    <div class="single-menu">
                        <span>${meal.strArea}</span> 
                        <img src="${meal.strMealThumb}" alt="">
                        <h4>${meal.strMeal}</h4>
                        <div class ="detail">
                            <h5>Bahan</h5>
                            <ul>
                                <li>${meal.strIngredient1}</li>
                                <li>${meal.strIngredient2}</li>
                                <li>${meal.strIngredient3}</li>
                                <li>${meal.strIngredient4}</li>
                                <li>${meal.strIngredient5}</li>

                            </ul>
                            <h8>${meal.strInstructions}</h8>
                        </div>
                    </div>
                </div>
    
            </div>

        
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
}