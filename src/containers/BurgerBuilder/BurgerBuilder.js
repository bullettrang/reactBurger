import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state={         //notice these state properties are only for the UI state, i.e. 'loading' (should we display a spinner?) 'purchasing'(should we display a orderSummary?) 'error' (should we display error message)
        purchasing: false,              //local  
    }

    componentDidMount(){                                                                                //get the data with GET request, response is used to assign to this.state.ingredients.
        console.log(this.props);
        this.props.onInitIngredients();                             //we must set state.order.purchased to FALSE before rendering the Checkout component
    }

    updatePurchaseState(ingredients){                                                                       //this setter function sets this.state.purchasable boolean value
    const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);

        return sum >0;
    }

    purchaseHandler=()=> {
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');   //redirect to /checkout after we click 'Continue to checkout'
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        //in lets us iterate through keys in object
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;              //so i can replace ingredient num vals with booleans?
        }
        let orderSummary= null;                  
        let burger = this.props.error? <p>Ingredients cant be loaded</p>: <Spinner/> ;          //if there is an error msg, display p element msg, otherwise display loading spinner

        if(this.props.ings){                                                   //our burger variable will end up being the JSX code rendered to the screen
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                                    <BuildControls
                                        price = {this.props.prc} 
                                        disabled={disabledInfo}
                                        ingredientsAdded={this.props.onIngredientAdded}
                                        ingredientsRemoved={this.props.onIngredientRemoved}
                                        purchasable={this.updatePurchaseState(this.props.ings)}
                                        ordered= {this.purchaseHandler}/>
                </Aux>
                );
                orderSummary = <OrderSummary                                        //order summmary only renders conditionally
                                    ingredients ={this.props.ings}
                                    purchaseCanceled={this.cancelPurchaseHandler}
                                    purchaseContinue={this.purchaseContinueHandler}
                                    price = {this.props.prc}/>; 
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

//****REDUX RELATED FUNCS****
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),            //why do we use arrow functions? because we want to store a function reference, not directly execute dispatch func,
        onIngredientRemoved:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() =>dispatch(burgerBuilderActions.purchaseInit())
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));         //we can have as many HOCs (withErrorHandler, connect() ) as we want