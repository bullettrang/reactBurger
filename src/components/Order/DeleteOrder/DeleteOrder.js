import React from 'react';

const deleteOrder =(props)=>{
    return (<div>
        <button onClick={props.clicked}>Delete</button>
    </div>);
};


export default deleteOrder;