//This could just be a functional component. Does not need to be a stateful component
import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'
    
class OrderSummary extends Component{
   // const ingredientSummary = props.ingredients;    //remember ingredient is an object
   //inline styles

   //adding lifecycle hooks

   //we added this life cycle hook 'componentWillUpdate() to see if rerendering of order summary is done.
   componentWillUpdate(){
       console.log('[OrderSummary] WillUpdate');
   }
   render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>
                        {igKey} 
                    </span>:  
                    {" "}{this.props.ingredients[igKey]}
                </li>
                );
        });

       return(        
            <Aux>
                <h3> Order Summary</h3>
                <p> One Bangin' Burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CHECKOUT NOW </Button>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}> Return to Burger</Button>
            </Aux>
        );
   }
}

export default OrderSummary;