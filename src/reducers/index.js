import idReducer from './id'
import { combineReducers } from 'redux'


const allReducers = combineReducers({
    id: idReducer,
})

export default allReducers;