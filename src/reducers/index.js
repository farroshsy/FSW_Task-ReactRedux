import { combineReducers } from "redux";
import carReducer from './cars';
import userReducer from './user'


export default combineReducers({
    carReducer, userReducer
});

