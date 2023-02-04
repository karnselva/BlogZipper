import {createStore,applyMiddleware,combineReducers}from "redux"
import thunk from "redux-thunk"
import {loginReducer,registerReducer} from "./Reducer/UserReducer"
import {allNotesReducer,myNotesReducer,
    addNotesReducer,deleteNotesReducer,editNotesReducer,redirect} from "./Reducer/NotesReducer"

const userInfoFromLocalStroage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
//initial state
const initialState={userLogin:{userInfo:userInfoFromLocalStroage}
}
//root reducer
const reducer=combineReducers({userLogin:loginReducer,userRegister:registerReducer,
    allNotes:allNotesReducer,
    deleteNotes:deleteNotesReducer,myNotes:myNotesReducer,addNotes:addNotesReducer,editNotes:editNotesReducer,redirect:redirect})
//middleware
const middleware=[thunk];

//create store
const store=createStore(reducer,initialState,applyMiddleware(...middleware))

export default store;