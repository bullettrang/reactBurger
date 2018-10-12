import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        this.props.onInitOrders();
    }

    render(){
        let orders = <Spinner/>
        console.log(this.props.orders);
        if(!this.props.loading){
            orders = (this.props.orders.map(order=>(
                            <Order
                                key={order.id} 
                                id={order.id}
                                price={order.price}
                                ingredients={order.ingredients}
                                orderData={order.orderData}
                                deleted={this.props.onDeleteOrder}
                                />
                            
                        ))
                    );
            
        }
        return(
            <div>
                {" NOTE: I plan to add delete here"}
                
                {orders}
            </div>
        );
    }
}

//redux funcs
const mapStateToProps = state =>{
    return{
        orders: state.orders.orders,
        loading:state.orders.loading
    } 
}

const mapDispatchToProps=dispatch=>{
    return{
        onInitOrders:()=>dispatch(orderActions.fetchOrders()),
        onDeleteOrder:(orderId)=>dispatch(orderActions.deleteOrder(orderId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
