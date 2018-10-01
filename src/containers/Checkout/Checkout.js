import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route,Redirect} from 'react-router-dom';
//import classes from './Checkout.css';
import * as actions from '../../store/actions/index';
class Checkout extends Component {

    // componentWillUnmount(){
    //     this.props.onInitIngredients();    //reset states.order.purchased to false
    // }

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();        //we can go back in web history
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');   //go to this url path
    }
    
    render(){
    let summary= <Redirect to ="/"/>;
   
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased?<Redirect to="/"/> : null;
            summary= (     
            <div>
                {purchasedRedirect}          
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    component={ContactData}/>
            </div>
            );
        }
        return(
                summary
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,             // 'ings' must be set to w/e is in the reducer.js
        purchased: state.orders.purchased
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onInitPurchase: ()=> dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps)(Checkout);         //connect this container with Redux
