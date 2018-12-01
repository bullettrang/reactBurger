import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}

];

// Build Controls is a functional component
//we map our array controls to each Build Control Component

const buildControls = (props)=>(
    <div className={classes.BuildControls}>
        <strong>Current Price: ${props.price.toFixed(2)}</strong>
        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                disabled ={props.disabled[ctrl.type]}
                added= {()=>props.ingredientsAdded(ctrl.type)}      
                removed = {()=>props.ingredientsRemoved(ctrl.type)}/> 
        ))}
        <button 
            className={classes.OrderButton}
             disabled={!props.purchasable} 
             onClick={props.ordered}>
            { props.isAuth ?'ORDER NOW':' Please Login First'}
        </button>
    </div>
);
export default buildControls;