import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//import devToolsEnhancer from 'remote-redux-devtools';

export default function configureStore(initialState) {

    //reduxImmutableStateInvariant is only meant to be used in development mode to prevent mutating the state
    return createStore(rootReducer, initialState, applyMiddleware(thunk, reduxImmutableStateInvariant()));
}
