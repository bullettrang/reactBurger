//functional component that is part of the <SideDrawer/>
import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle=(props)=>(
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
