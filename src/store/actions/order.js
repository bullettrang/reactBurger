import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id,orderData)=> {         //id for which burger purchase, orderData for what's in the burger
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
};

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
}

export const purchaseBurgerStart = ()=> {
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());                //start burger purchase dispatch, then do GET request
        axios.post( '/orders.json?auth='+token, orderData )
        .then( response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    };
}

export const purchaseInit=()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

//ORDERS RELATED ACTION CREATORS

export const fetchOrdersSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders                                   //sync fetch orders with state.orders
    }
};

export const fetchOrdersFail = (error)=>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error             //pass on error incase I want to do something with it
    }
};

export const fetchOrdersStart=()=>{             //same pattern as purchaseBurgerStart() above ^^
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders=(token,userId)=>{
   return dispatch=>{                                 //redux-thunk lets us return a function
        dispatch(fetchOrdersStart());           //start fetchOrders dispatch, then we do a GET request
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        console.log('/orders.json'+queryParams);
        axios.get('/orders.json'+queryParams)
        .then(res=>{
            const fetchedOrders=[];             //create fetchOrders object, transforming data such as creating our fetchOrders array of objects here should always be done in the actions, NOT reducer
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));            //update the orders after successful GET
        })
        .catch(err=>{
            dispatch(fetchOrdersFail(err));
        });
    }
}

export const deleteOrderFail = (error)=>{
    return {
        type:actionTypes.DELETE_ORDER_FAIL,
        error:error
    }
}

export const deleteOrderStart=()=>{
    return {
        type:actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrderSuccess =(orderId)=>{
    return {
        type:actionTypes.DELETE_ORDER_SUCCESS
    }
}

export const deleteOrder=(token,orderId,userId)=>{
    return dispatch => {
        dispatch(deleteOrderStart());
        const queryParams='?auth='+token;
        // const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        console.log('/orders/'+orderId+'.json'+queryParams);
        axios.delete('/orders/'+orderId+'.json'+queryParams)
        .then(res=>{
            dispatch(deleteOrderSuccess());                
            dispatch(fetchOrders(token,userId));
        })
        .catch(err=>{
            dispatch(deleteOrderFail(err));
            console.log(err);
        })
    }
}