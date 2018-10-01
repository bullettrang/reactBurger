//this is reducer
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    loading:false,
    purchased:false
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false,                                //every purchase must begin with false
            }
        case actionTypes.PURCHASE_BURGER_START:                 //this starts POST request, so we need to set loading to true
            return{
                ...state,
                loading:true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={                                        //create new order copy from our action 
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)            //add new order to state.orders array (concat() returns new array)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            };
        case actionTypes.FETCH_ORDERS_START:                    //this starts POST request, so we need to set loading to true
            return{
                ...state,
               loading:true,                                    //just like PURCHASE_BURGER_START (checkout page), we can reuse the loading prop, (since we are either on the checkout page, or the orders page, never both)
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.orders,                            //orders is set to action.orders, because action.orders is used fetchOrderSuccess() in /reducers/order.js
                loading:false,
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;