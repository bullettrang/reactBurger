//burger is a functional component,

//takes <BurgerIngredient/> and displays them
//PROPS:
//-ingredients (Object)
import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) =>{

    //Learn more about this code line at 
    //https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a
    // .map(igKey =>{
    //     return [...Array(props.ingredients[igKey])].map((_,i)=>{
   
    //transformedIngredients is always an array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredient key={igKey+i} type={igKey}/>;
            }); //[,]
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
        
        if(transformedIngredients.length===0){
            transformedIngredients=<p> Please start adding ingredients</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;