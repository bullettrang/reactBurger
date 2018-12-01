//This is a stateful component
//shows the overall layout 
//stores state of side drawer

//Is this a a container component? or is it a HOC component?
import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
sideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer:false});
}    

sideDrawerToggleHandler=()=>{
    //this.setState({showSideDrawer:!this.state.showSideDrawer});   don't use this.state as a argument in this.setState, setState is asynchronous so toggling would not work as intended
    this.setState((prevState)  =>{
        return {showSideDrawer:!prevState.showSideDrawer}
    });
}
render(){
    return(
        <Aux>
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>   
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);