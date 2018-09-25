import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component{
    state={
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    ,},
                    valid:false,
                    touched:false
                },//end of 'name' object
                street: {
                    elementType:'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zip:{
                    elementType:'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email: {
                    elementType:'input',
                    elementConfig: {
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            deliveryMethod:{
                elementType:'select',
                elementConfig: {
                    options:[
                            {value:'fastest', displayValue:'Fastest'},
                            {value:'economy', displayValue:'Economy'},
                            {value:'express', displayValue:'Express'}
                            ]
                   
                },
                value: 'economy',
                validation:{
                    
                },
                valid:true
            },
        },
        formIsValid:false,
        loading:false
        
    } 
    orderHandler=(event)=>{
        event.preventDefault();                     //reloading form destroys our burger image. we can do this to avoid reload.
        // make http request (requires axios)
        // we want to store the burger purchase data, so we need to use POST
        // when POSTING to firebase, need to append '.json'
        this.setState({loading:true});

        //time to submit form dataNIGGA
        const formData= {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            //in a REAL production application, price should be calculated server-side
            price:this.props.price,
            orderData: formData
        }
        //order is sent to URL, sending POST requests to Google's firebase requres '/orders.json' to work 
        axios.post('/orders.json',order)
            //meanwhile... while POST is loading we do...
            .then(response=>{
                this.setState({loading:false});         
                this.props.history.push('/');                   //return to home AFTER POSTING ORDER
            })//what to do after post
            .catch(error=>{         //I want to stop loading no matter what because when the request is done, even if it failed
                console.log(error)
                this.setState({loading:false});
            });      //handle error
    }

    checkValidity(value,rules){
        let isValid=true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid=value.trim() !== '' && isValid;           //trim white space off from form, and check is it blank?

        }

        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <=rules.maxLength && isValid;
        }
        return isValid;
    }

    //2-way binding
    inputChangedHandler=(event,inputIdentifier)=>{
        
        const updatedOrderForm={                //shallow copy
            ...this.state.orderForm
    }
    const  updatedFormElement={                 //use spread operator to reach appropriate object layer
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value=event.target.value;            //update shallow copy
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;                        //update that we click this form field
        updatedOrderForm[inputIdentifier]=updatedFormElement;       //update correct part of object in shallow copy
        
        let formIsValid=true;                                       
        for(let inputIdentifiers in updatedOrderForm){                                  //we now check if this form is ready to submit 
            formIsValid=updatedOrderForm[inputIdentifiers].valid && formIsValid;        //(i.e. no missing name, email, etc anything required is fulfilled)
        }
        console.log(formIsValid);
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});            //now update the actual state with our shallow copy
}

    render(){
        const formElementsArray=[];
        // key: 'name', 'street', 'email'
        // config: 'brian' '11 fakestreet' 'seemasah@gamail.com'
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (            
                <form onSubmit={this.orderHandler}>  
                    {formElementsArray.map(formElement=> (
                        <Input key={formElement.id}
                                elementtype={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                    ))}
                    <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
                </form> 
        );
        if(this.state.loading){
            form=(<Spinner/>);
        }

        //we EITHER DISPLAY THE SPINNER CAUSE LOADING IS TRUE, or we load the form 
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data </h4>
                {form}
            </div>
        )
    }

}

export default ContactData;