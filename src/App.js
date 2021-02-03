import React, {useEffect} from 'react';
import { Header } from './components/Header';
import {Home} from './components/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Checkout} from './components/Checkout';
import {Login} from './components/Login';
import {Payment} from './components/Payment';
import { auth } from './firebase'
import {useStateValue} from './components/StateProvider';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {Orders} from './components/Orders';

const promise = loadStripe('pk_test_51HUnLGGfr6l7l1UbaI9Or5c0qmW9Ff6YlPW79sPdVqIzkfpfP1v28ElJ91GzXoSypVZhu1dbt14tbuNUFQH2SZ5000DRVzmMMJ');

function App() {

  const [ state, dispatch ] = useStateValue();

  useEffect(() => {
        
    auth.onAuthStateChanged(authUser => {
        if(authUser) {
            dispatch({
                type: 'SET_USER',
                user: authUser
            })} else {
                dispatch({
                    type: 'SET_USER',
                    user: null
                });
                } 
        });
    }, []);

  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>

          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>

          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
