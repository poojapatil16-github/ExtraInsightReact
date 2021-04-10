import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items:[],
            currentItem:{
              text:'',
              key:''
            }
          }
          this.addItem = this.addItem.bind(this);
          this.handleInput = this.handleInput.bind(this);
          this.deleteItem = this.deleteItem.bind(this);
          this.setUpdate = this.setUpdate.bind(this);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    addItem(e){
        e.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.text !==""){
          const items = [...this.state.items, newItem];
        this.setState({
          items: items,
          currentItem:{
            text:'',
            key:''
          }
        })
        }
      }
      handleInput(e){
        this.setState({
          currentItem:{
            text: e.target.value,
            key: Date.now()
          }
        })
      }
      deleteItem(key){
        const filteredItems= this.state.items.filter(item =>
          item.key!==key);
        this.setState({
          items: filteredItems
        })
    
      }
      setUpdate(text,key){
        console.log("items:"+this.state.items);
        const items = this.state.items;
        items.map(item=>{      
          if(item.key===key){
            console.log(item.key +"    "+key)
            item.text= text;
          }
        })
        this.setState({
          items: items
        })
        
       
      }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};



const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };