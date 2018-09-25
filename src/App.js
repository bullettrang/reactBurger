//App is a component
import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
//Layout component has a props.children, which renders <BurgerBuilder/>

class App extends Component {

  //THIS COMMENT BLOCK IS FOR TESTING INTERCEPTOR DESTRUCTION ONLY
  // state={
  //   show:true
  // };
  // //componentDidMount() is testing, after 5 seconds I want to execute this.setState
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false});
  //   },5000);
  // }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>

        </Layout>
      </div>
    );
  }
}

export default App;
