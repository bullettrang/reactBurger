//this is reducer
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    orders:[],
    loading:false,
    purchased:false
};

const purchaseInit =(state,action)=>{
    return updateObject(state,{purchased:false});
}

const purchaseBurgerStart=(state,action)=>{
    return updateObject(state,{loading:false});
}

const purchaseBurgerSuccess=(state,action)=>{
    const newOrder= updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail=(state,action)=>{
    return updateObject(state,{loading:false});
}

const fetchOrdersStart=(state,action)=>{                    //this starts POST request, so we need to set loading to true
    return updateObject(state,{loading:true});              //just like PURCHASE_BURGER_START (checkout page), we can reuse the loading prop, (since we are either on the checkout page, or the orders page, never both)
}

const fetchOrdersSuccess=(state,action)=>{
    return updateObject(state,{
        orders:action.orders,
            loading:false}); //orders is set to action.orders, because action.orders is used fetchOrderSuccess() in /reducers/order.js
}

const fetchOrderFail=(state,action)=>{
    return updateObject(state,{loading:false});
}

const deleteOrderStart = (state,action)=>{
    return updateObject(state,{
        loading:true
    })
}

const deleteOrderSuccess = (state,action)=>{
    return updateObject(state,{
        loading:false
    })
}

const deleteOrderFail=(state,action)=>{
    return updateObject(state,{
            loading:false});
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START:  return purchaseBurgerStart(state, action);               //this starts POST request, so we need to set loading to true
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state,action);
        case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state,action);
        case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state,action);
        case actionTypes.DELETE_ORDER_FAIL: return deleteOrderFail(state,action);
        default:  return state;
    }
}

export default reducer;