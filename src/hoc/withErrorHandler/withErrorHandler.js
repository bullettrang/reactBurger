//withErrorHandler is a higher order component. It is a global error handling component
import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//parameters: WrappedComponent (BurgerBuilder), axios
const withErrorHandler=(WrappedComponent,axios)=>{
    //returns anonymous class component
    return class extends Component{
        state={
            error:null
        }
        //Needs to be componentWillMount when error checking for web requests.
        //Since withErrorHandler component's children (BurgerBuilder) is render before componentDidMount() is called 
        //in withErrorHandler, the error checking for requests/responses done with interceptors needs to be implement in componentWillMount
        componentWillMount(){
            //set up global interceptors for error handling
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                //set error state to null
                this.setState({error:null});
                //return request
                return req;
            });
            this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
                //console.log(error);
                this.setState({error:error})
            });
        }

<<<<<<< HEAD
       
        componentWillUnmount(){
             // we dont want a bunch of axios interceptors staying around, they need to be destroy when componentWillUnmount.
=======
        // we dont want a bunch of axios interceptors staying around, they need to be destroy when componentWillUnmount.
        componentWillUnmount(){
>>>>>>> 977119d725bbd233c3b9711bd99ba818909d6543
            axios.interceptors.request.eject(this.reqInterceptor); //destroys request interceptor
            axios.interceptors.response.eject(this.resInterceptor);//destroys resposne interceptor
        }
        //setter function for error
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                        >
<<<<<<< HEAD
                        {this.state.error ? this.state.error.message:null}          {/*Do we display a error message? (MODAL STYLEZ)*/}
                    </Modal>
                    <WrappedComponent {...this.props}/>                             {/*Wrapped Component refers to our BurgerBuilder/> along with its props */}
=======
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                <WrappedComponent {...this.props}/>
>>>>>>> 977119d725bbd233c3b9711bd99ba818909d6543
                </Aux>
            );
        }

    }
}

export default withErrorHandler;