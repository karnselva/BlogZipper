import {User_Login_Failure,User_Login_Request,User_Login_Success,User_Logout, User_Register_Failure, User_Register_Request, User_Register_Success} from "../case/UserCase"

export const loginReducer=(state={},action)=>{
    switch(action.type){
        case User_Login_Request:
            return {loading:true}
        case User_Login_Success:
            return {loading:false,userInfo:action.payload}
        case User_Login_Failure:
            return {loading:false,error:action.payload}
        case User_Logout:
            return {}
        default:
            return state
    }

}


export const registerReducer=(state={},action)=>{
    switch(action.type){
        case User_Register_Failure:
            return {loading:false,error:action.payload}
        case User_Register_Success:
            return {loading:false,userInfo:action.payload}
        case User_Register_Request:
            return{loading:true}
        default:
            return state
    }




}




