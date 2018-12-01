//this is a functional component, creates side Drawer menu for mobile screens

//this component outputs to Layout,
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
const sideDrawer=(props)=>{
    //default CSS class given is classes.close
    let attachedClasses=[classes.SideDrawer,classes.Close];
    //what CSS classes do we pass on to the JSX div below?
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
            <Backdrop 
                show={props.open} 
                clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;