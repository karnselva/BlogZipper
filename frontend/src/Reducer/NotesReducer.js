import {ALL_NOTES_SUCCESS,
    MY_NOTES_SUCCESS,ADD_NOTES_SUCCESS,EDIT_NOTES_SUCCESS
    ,DELETE_NOTES_SUCCESS,ALL_NOTES_REQUEST,ALL_NOTES_FAILURE,ADD_NOTES_REQUEST,ADD_NOTES_FAILURE,MY_NOTES_REQUEST,MY_NOTES_FAILURE,
EDIT_NOTES_REQUEST,EDIT_NOTES_FAILURE,DELETE_NOTES_REQUEST,DELETE_NOTES_FAILURE,SET_REDIRECT,RESET_REDIRECT} from "../case/NoteCase"



const addNotesReducer=(state={},action)=>{
    switch(action.type){
        case ADD_NOTES_REQUEST:
            return {loading:true}
        case ADD_NOTES_SUCCESS:
            return{loading:false,success:true}
        case ADD_NOTES_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state

    }
}

const allNotesReducer=(state={},action)=>{
    switch(action.type){
        case ALL_NOTES_REQUEST:
            return {loading:true}
        case ALL_NOTES_SUCCESS:
            console.log("paylaod",action.payload)
            return{loading:false,notesInfo:action.payload}
        case ALL_NOTES_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state

    }
}


const myNotesReducer=(state={},action)=>{
    switch(action.type){
        case MY_NOTES_REQUEST:
            return {loading:true}
        case MY_NOTES_SUCCESS:
            console.log("paylaod",action.payload)
            return{loading:false,notesInfo:action.payload}
        case MY_NOTES_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state

    }
}



const editNotesReducer=(state={},action)=>{
    switch(action.type){
        case EDIT_NOTES_REQUEST:
            return {loading:true}
        case EDIT_NOTES_SUCCESS:
            return{loading:false,editsuccess:true}
        case EDIT_NOTES_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state

    }
}


const redirect=(state={},action)=>{
    switch(action.type){
        case SET_REDIRECT:
            return {redirect:"/allnotes"}
          case RESET_REDIRECT:
          return {}
          default:
              return state

    }
   

}


const deleteNotesReducer=(state={},action)=>{
    switch(action.type){
        case DELETE_NOTES_REQUEST:
            return {loading:true}
        case DELETE_NOTES_SUCCESS:
            return{loading:false,success:true}
        case DELETE_NOTES_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state

    }
}

export {allNotesReducer,myNotesReducer,addNotesReducer,deleteNotesReducer,editNotesReducer,redirect}