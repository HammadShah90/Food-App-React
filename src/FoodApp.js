import React from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const FetchItem = () => {

    const [dishName, setDishName] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecipeUi = document.querySelector('.allRecipes')

    const fetchRecipeData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${dishName}`)

            console.log(response.data.data.recipes);

            setRecipes(response.data.data.recipes);

            getRecipeUi.classList.add('scrolling')

        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="mainPage">
                <h1 className='mainHeading'>
                    <FontAwesomeIcon icon={faUtensils} />
                    <span style={{ marginLeft: '10px' }}>Forkify</span>
                </h1>
                <div>
                    <input type="search" placeholder="Search over 1,000,000 recipes..." id='dishNameInput' minLength={2} maxLength={10} onChange={e => setDishName(e.target.value)} autoComplete='off' />
                    <button className='searchButton' onClick={fetchRecipeData}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span style={{ marginLeft: '5px' }}>Search</span>
                    </button>
                </div>
            </div>
            <div className="recipePage">
                <div className="allRecipes">
                    {loading &&
                        <div className='recipeLoader'>
                            Loading...
                        </div>
                    }
                    {!loading && (
                        <ul className="recipesUI">
                            {recipes.map(recipe => (
                                <li className="recipeList" key={recipe.id}>
                                    <a className='recipeLink' onClick={recipe.id}>
                                        <img src={recipe.image_url} alt={recipe.title} className='recipeImage' />
                                        <div>
                                            <h4 className='recipeTitle'>
                                                {recipe.title}
                                            </h4>
                                            <p className='recipePublisher'>
                                                {recipe.publisher}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* <div className="col-sm-8">
                        <div className="recipeDetail">
                            <div className="recipeDetailInner">
                                <i class="fa-regular fa-face-smile fs-2" style="color: #fd6c05;"></i>
                                <h2 class="fs-4">Start by searching for a recipe or <br /> an ingredient. Have fun!</h2>
                            </div>
                            <div class="recipeDetailTop">
                                <div class="recipeImgTitle">
                                    <img src="./Assets/Pastry.jpg" alt="" />
                                        <h2>
                                            Cauliflower Pizza Crust (with BBQ Chicken Pizza)
                                        </h2>
                                </div>
                                <div class="recipeServingTimeBookmark">
                                    <div class="recipeServingTime">
                                        <div class="d-flex align-items-center p-1">
                                            <i class="fa-regular fa-clock fontColor fs-3"></i>
                                            <p class="mb-0 ms-2">
                                                <span class="fw-bold">
                                                    30
                                                </span>
                                                MINUTES
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center p-1">
                                            <i class="fa-solid fa-user-group fontColor fs-3"></i>
                                            <p class="mb-0 ms-2">
                                                <span class="fw-bold">
                                                    4
                                                </span>
                                                SERVINGS
                                            </p>
                                        </div>
                                        <div>
                                            <i
                                                class="fa-solid fa-minus borderColor fontColor rounded-circle p-1"></i>
                                            <i
                                                class="fa-solid fa-plus borderColor fontColor rounded-circle p-1"></i>
                                        </div>
                                    </div>
                                    <div class="recipeBookmark">
                                        <i class="fa-regular fa-bookmark"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-5 recipeIngredients">
                                <h3 class="text-uppercase fontColor">
                                    Recipe Ingredients
                                </h3>
                                <ul class="recipeServing ps-0 mb-0 mt-4">
                                    <li class="recipeServingList">
                                        <i class="fa-solid fa-check fontColor"></i>
                                        <span class="recipeQuantity">
                                            5
                                        </span>
                                        <div class="recipeDescription">
                                            <span>
                                                cup
                                            </span>
                                            sugar
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="recipeAddress mt-5 d-flex flex-column align-items-center">
                                <h3 class="fontColor text-center text-uppercase">
                                    how to cook it
                                </h3>
                                <p class="mt-4 text-center fs-5 px-5 text-secondary">
                                    This recipe was carefully designed and tested by <span class="fw-bold">All Recipes</span>
                                    Please check out directions at their website.
                                </p>
                                <a href="" class="btn button rounded-pill mt-4 mb-5 fs-4 text-uppercase"
                                    style="width: 35%; color: #ffffff; padding: 10px;">
                                    directions
                                    <i class="fa-solid fa-right-long ms-3"></i>
                                </a>
                            </div>
                        </div>
                    </div> */}
            </div>
        </div>

    )
};



export default FetchItem;