import {ALL_NOTES_SUCCESS,
    MY_NOTES_SUCCESS
    ,DELETE_NOTES_SUCCESS,ALL_NOTES_REQUEST,ALL_NOTES_FAILURE,ADD_NOTES_REQUEST,ADD_NOTES_FAILURE,MY_NOTES_REQUEST,MY_NOTES_FAILURE,
EDIT_NOTES_REQUEST,EDIT_NOTES_FAILURE,DELETE_NOTES_REQUEST,DELETE_NOTES_FAILURE,SET_REDIRECT} from "../case/NoteCase"



const allNotesAction=()=>async(dispatch)=>{
    console.log("1")
    dispatch({type:ALL_NOTES_REQUEST})
    console.log("2")
    const response= await fetch("http://localhost:5000/api/note/notes")
    const message=await response.json()
    if (response.ok){
        console.log("message",message.allNotes)
        return dispatch({type:ALL_NOTES_SUCCESS,payload:message.allNotes})
    }
    if (!response.ok){
        console.log("3")
        return dispatch({type:ALL_NOTES_FAILURE,payload:message.error})
    }
        
      

}
const myNotesAction=(accessToken)=>async(dispatch)=>{
    console.log("1")
    dispatch({type:MY_NOTES_REQUEST})
    console.log("2")
    
    const options={
        method:"get",
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
       }
       console.log("3",accessToken)
    
       const response=await fetch("http://localhost:5000/api/note/mynotes",options)
       const message=await response.json()
       if (response.ok){
        console.log("message",message.data)
        return dispatch({type:MY_NOTES_SUCCESS,payload:message.data})
      }
      if (!response.ok){
        console.log("3")
        return dispatch({type:MY_NOTES_FAILURE,payload:message.error})
    }
      

}
const addNotesAction=(accessToken,note)=>async(dispatch)=>{
    dispatch({type:ADD_NOTES_REQUEST})
    const options={ 
        method:"post",
        headers:{
          Authorization:`Bearer ${accessToken}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(note)
      }
     const response=await fetch("http://localhost:5000/api/note/addnote",options)
     const message=await response.json()
     if(response.ok){
        
          dispatch({type:SET_REDIRECT})
     
     }
     if(!response.ok){
        dispatch({type:ADD_NOTES_FAILURE,payload:message.error})
     }
    
}
const editNotesAction=(accessToken,editId,note)=>async(dispatch)=>{
    dispatch({type:EDIT_NOTES_REQUEST})
    const options={
        method:"put",
        headers:{
          Authorization:`Bearer ${accessToken}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify(note)
      }
      const response = await fetch(`http://localhost:5000/api/note/editnote/${editId}`,options)
      const message = await response.json()
      if (response.ok){
        dispatch({type:SET_REDIRECT})
     
      }
      if(!response.ok){
         dispatch({type:EDIT_NOTES_FAILURE,payload:message.payload})
      }
    
}
const deleteNotesAction=(accessToken,id)=>async(dispatch)=>{
    dispatch({type:DELETE_NOTES_REQUEST})
    console.log(accessToken,"access")
    const options={
        method:"delete",
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
      const response= await fetch(`http://localhost:5000/api/note/delete/${id}`,options)
      const msg=await response.json()
      console.log(msg)
      if (response.ok){
        console.log("yes",msg)
        dispatch({type:DELETE_NOTES_SUCCESS})
        window.location.reload();
      }
      if(!response.ok){
          console.log("no")
          dispatch({type:DELETE_NOTES_FAILURE,payload:msg.error})
      }
    
}

export {allNotesAction,addNotesAction,myNotesAction,deleteNotesAction,editNotesAction}