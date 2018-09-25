import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
//NESTED ROUTE STYLE
import {Route} from 'react-router-dom';
import classes from './Checkout.css';
//summary of checkout
//show ingredients
//reshow the actual burger 


//cancel button
//continue button


//this needs actual ingredients!

//pass via query params
class Checkout extends Component {
    state={
        //ingredients is a object grabbed from BurgerBuilder, we can init to null
        ingredients: null,
        totalPrice:0
    }
    //We have to grab the query params...
    //Create URLSearchParams Object, we get this.props.location from Route Created in App.js

    //using component will mount, we can always make sure we initiate the state BEFORE rendering
    componentWillMount(){

        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let price=0;
        for(let param of query.entries()){
            //['salad','1']
            if(param[0]==='price'){
                price=param[1];
            }else{
                ingredients[param[0]]= +param[1];
            }
            

        }
       
        this.setState({ingredients:ingredients, totalPrice:price});
    }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();        //we can go back in web history
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');   //go to this url path
    }
    render(){
        return(
            <div className={classes.Checkout}> 
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            <Route 
                path={this.props.match.path+'/contact-data'} 
                render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }

}

export default Checkout;