import React from 'react';
import classes from './Order.css';
const order = (props)=> {

    const ingredients= [];

    //we got the ingredients from props, 
    //we need to transform it into a usable object to render jsx
    //ingredients
    //name: i.e. 'salad'
    //amount: i.e. '2'
    for(let ingredientName in props.ingredients){
        console.log(ingredientName);
        ingredients.push(
            {   name:ingredientName,
                amount:props.ingredients[ingredientName]
            }
        );
    }

    //now ingredients is an array of objects

    const ingredientOutput = ingredients.map(ig=>{
        return <span 
                key={ig.name}
                style={{textTransform:'capitalize',
                        display:'inline-block',
                        margin:'0 8px',
                        padding:'5px',
                        border:'1px solid #ccc'
                        }}>       
                        {ig.name} 
                        ({ig.amount})
        </span>

    })

    //now ingredientOutput is a bunch of JSX code (i.e. bunch of span elements)
    return( 

    <div className={classes.Order}>
        <p>{ingredientOutput}</p>
        <p>Price:  <strong>USD:{Number.parseFloat(props.price).toFixed(2)}</strong> </p>
    </div>
    );
}

   
 








export default order;