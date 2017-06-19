import { combineReducers } from "redux";

import feed from './feedReducer';
import view from './viewReducer';
import contact from './contactReducer';

export default combineReducers({
    feed,
    view,
    contact
});
