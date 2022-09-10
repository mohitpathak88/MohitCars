//Creating a store here and then exporting it:

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducers';


const composeEnhancers = composeWithDevTools({
 
});

const rootReducer = combineReducers({       //rootReducer is the combination of all reducers. Combine Reducers takes object of all the child reducers
    carsReducer,
    alertsReducer,
    bookingsReducer
})
const store = createStore(
  rootReducer,
  composeEnhancers(     //It is the object of the redux dev tools defined above
    applyMiddleware(thunk)        //In compose enhancers, we have a property called apply middleware in which we have to specify the number of 
    //middlewares in the array. We have only one middleware i.e. redux thunk
  )
);

export default store