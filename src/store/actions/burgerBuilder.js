//REMEMBER, in action files, we don't want to do too much logic related things , just wanna assign stuff,return objects, GET data,
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient=(name)=>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient=(name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    };
};

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const setIngredients=(ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredients,
        
    };
}

export const initIngredients=()=>{              //this is when the app starts
    return dispatch =>{ //redux-thunk lets us return a function!
        axios.get('https://react-my-burger-14d61.firebaseio.com/ingredients.json')      //we need to wait for the GET to finish,hence asynchronous via thunk
        .then(response=>{
            dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        });
    };
};

