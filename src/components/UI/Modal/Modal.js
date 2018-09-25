//stateful component
//contains Backdrop component, which displays depending on props.show
//props.children is <OrderSummary/> or error message from withErrorHandler
import React, {Component} from 'react';
import classes from "./Modal.css";
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {

    //PERFORMANCE BOOST, we only update if the toggle order button is click, or if the nextProp's children is different from this.props 's children.
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children ;
    }
    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }
    render(){
        return(    
            <Aux>
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}/>
                <div className= {classes.Modal}
                    style={{transform: this.props.show? 'translateY(0)': 'translateY(-100vh)',opacity: this.props.show ? '1': '0'}}>
                        {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;