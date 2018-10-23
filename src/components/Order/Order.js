import React from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';
const order = (props)=> {

    const ingredients= [];
    const orderDatas=[];
    //we got the ingredients from props, 
    //we need to transform it into a usable object to render jsx
    //ingredients
    //name: i.e. 'salad'
    //amount: i.e. '2'
    for(let ingredientName in props.ingredients){
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
    for(let prop in props.orderData){
        orderDatas.push(
            {
                prop: prop,
                data: props.orderData[prop]
            }
        )
    }
    
    // console.log(props.orderDatas.id);
    //now ingredientOutput is a bunch of JSX code (i.e. bunch of span elements)
    return( 

    <div className={classes.Order}>
        <p>{ingredientOutput}</p>
        <p>Price:  <strong>USD:{Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        <p>Name: <strong>{props.orderData.name}</strong></p>
        <p>E-Mail: <strong>{props.orderData.email}</strong></p>
        <p>Street: <strong>{props.orderData.street}</strong></p>
        <p>Country: <strong>{props.orderData.country}</strong></p>
        <p>ZIP: <strong>{props.orderData.zip}</strong></p>
        {/* <DeleteButton
            clicked={()=>props.deleted(props.id)}
        /> */}
        <Button
            clicked={()=>props.deleted(props.id)}
            btnType="Danger"
           >DELETE
        </Button>
    </div>
    );
}

   
 








export default order;