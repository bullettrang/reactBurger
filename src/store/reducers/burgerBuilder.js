import * as actionTypes from '../actions/actionTypes';


const initialState={
    ingredients:null,
    totalPrice: 4,
    error:false,
}

const INGREDIENT_PRICES={
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};


//things from actions folder are refer to as 'action.propName'
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,                                                                   //doing this copies the other props we aren't manipulating
                ingredients:{
                    ...state.ingredients,                                                   //doesn't create a deep clone...
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+ INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,                                                                   //doing this copies the other props we aren't manipulating
                ingredients:{
                    ...state.ingredients,                                                   //doesn't create a deep clone...
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice- INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese:action.ingredients.cheese,
                        meat:action.ingredients.meat
                },
                totalPrice:4,                                               //reset the price back to default 4 after checkout
                error:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default:
            return state;
    
    }
};

export default reducer;