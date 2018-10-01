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
        if(!this.props.loading){
            orders = (this.props.orders.map(order=>(
                            <Order
                                key={order.id} 
                                price={order.price}
                                ingredients={order.ingredients}/>
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
        loading:state.orders.loading
    } 
}

const mapDispatchToProps=dispatch=>{
    return{
        onInitOrders:()=>dispatch(orderActions.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
