import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import devToolsEnhancer from 'remote-redux-devtools';

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(reduxImmutableStateInvariant()));
}
