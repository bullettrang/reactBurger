//we need class keyword , it is a stateful component
//BurgerBuildier is a stateful component,

//renders following components:
//Modal (which contains <OrderSummary/> & <BackDrop/> )
//Burger (which contains <BurgerIngredient/> )
//BuildControls (which contains <BuildControl/>)
import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


//notice its outside class declaration
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: .7

}
class BurgerBuilder extends Component{
    // constructor(){
    //     super(props);
    //     this.state={...}
    // }
    /**DEFAULT STATE */
    state={
        ingredients:null,
        totalPrice: 4,
        purchasable:false,
        purchasing: false,
        loading:false,
        error:false
    }

    //get the data with GET request, response is used to assign to this.state.ingredients.
    componentDidMount(){
        console.log(this.props);
        axios.get('https://react-my-burger-14d61.firebaseio.com/ingredients.json')
            .then(response=>{
                
                this.setState({ingredients:response.data});

                const updatedIngredients = {
                    ...this.state.ingredients
                }
                this.updatePurchaseState(updatedIngredients);
            })
            .catch(error=>{
                this.setState({error:true});
            });

        
    }

    //this setter function sets this.state.purchasable boolean value
    updatePurchaseState(ingredients){
   
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0);
            this.setState({purchasable: sum >0});
        }
    //REMEMBER, when updating state, we need to do it 
    //in an IMMUTABLE WAY
    addIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        //spread distributes keys/vals of state.ingredients
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =updatedCount;
        const priceAdded = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdded;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    //arrow functions allow use to obtain the state so we can apply changes
    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =updatedCount;
        const priceRemoved = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice -priceRemoved;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler=()=> {
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = ()=>{

        const queryParams=[];
        for(let i in  this.state.ingredients){
            //need this to put ingredients to URL
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice)
        //create a string with the array we created earlier
        const queryString =queryParams.join('&');

        //push our created string into history object
            this.props.history.push({
                pathname:'/checkout',
                search:'?'+queryString
            });   //go to /checkout after we click 'Continue to checkout'
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        //in lets us iterate through keys in object
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary= null;                  
        //if there is an error msg, display p element msg, otherwise display loading spinner
        let burger = this.state.error? <p>Ingredients cant be loaded</p>: <Spinner/> ;


        //our burger variable will end up being the JSX code rendered to the screen
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                                    <BuildControls
                                        price = {this.state.totalPrice} 
                                        disabled={disabledInfo}
                                        ingredientsAdded={this.addIngredientHandler}
                                        ingredientsRemoved={this.removeIngredientHandler}
                                        purchasable={!this.state.purchasable}
                                        ordered= {this.purchaseHandler}/>
                </Aux>
                );

                //order summmary only renders conditionally
                orderSummary = <OrderSummary 
                                    ingredients ={this.state.ingredients}
                                    purchaseCanceled={this.cancelPurchaseHandler}
                                    purchaseContinue={this.purchaseContinueHandler}
                                    price = {this.state.totalPrice}/>; 
        }

        //are we still loading?
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        //FINAL
        //*
        //*
        //*
        // Modal (conditonally displayed)
        
        // (Always displayed)
        //burger image 
        //burger controls
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

export default withErrorHandler(BurgerBuilder,axios);