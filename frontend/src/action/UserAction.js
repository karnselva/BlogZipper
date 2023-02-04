import {User_Login_Failure,User_Login_Request,
    User_Login_Success,User_Logout
,User_Register_Failure,User_Register_Success,User_Register_Request} from "../case/UserCase"


export const userLoginAction=(data)=>async(dispatch)=>{
    console.log("userlogin disstart")
    dispatch({type:User_Login_Request})
    const options={
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    
    }
    console.log("userlogin disend",window.location.origin)
   
        const response= await fetch("http://localhost:5000/api/user/login",options)
        const message= await response.json()
        if (response.ok){
            localStorage.setItem("userInfo",JSON.stringify(message.userInfo))
            dispatch({type:User_Login_Success,payload:message.userInfo})
        }
        if (!response.ok){
        
            
            dispatch({type:User_Login_Failure,payload:
                message.error
            })
        }
         
}

export const userRegisterAction=(data)=>async(dispatch)=>{
    dispatch({type:User_Register_Request})
    const options={
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
  
      }
      
    
        const response= await fetch("http://localhost:5000/api/user/register",options);
        const message=await response.json()
         if (response.ok){
            dispatch({type:User_Register_Success,payload:message.message})
         }
         
        if (!response.ok){
          //redirect to login
          dispatch({type:User_Register_Failure,payload:message.error})
      
        
          //navigate("/login")
        }
        
    
      
}


export const logoutAction=()=>(dispatch)=>{
  localStorage.removeItem("userInfo")
  dispatch({type:User_Logout})
 
}