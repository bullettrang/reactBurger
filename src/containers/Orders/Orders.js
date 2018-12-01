import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        this.props.onInitOrders(this.props.token,this.props.userId);

    }

    deleteHandler = (token,orderId,userId)=>{
        this.props.onDeleteOrder(token,orderId,userId)
    }

    render(){
        let orders = <Spinner/>
        if(!this.props.loading){
            orders = (this.props.orders.map(order=>(
                            <Order
                                key={order.id} 
                                id={order.id}
                                price={order.price}
                                ingredients={order.ingredients}
                                orderData={order.orderData}
                                deleted={()=>this.deleteHandler(this.props.token,order.id,this.props.userId)}
                                />
                        ))
                    );
            
        }
        return(
            <div>
                
                {orders}
            </div>
        );
    }
}

//redux funcs
const mapStateToProps = state =>{
    return{
        orders: state.orders.orders,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    } 
}

const mapDispatchToProps=dispatch=>{
    return{
        onInitOrders:(token,userId)=>dispatch(orderActions.fetchOrders(token,userId)),
        onDeleteOrder:(token,orderId,userId)=>dispatch(orderActions.deleteOrder(token,orderId,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
