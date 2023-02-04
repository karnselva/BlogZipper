import React, { useEffect,useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import {Link} from "react-router-dom"
import Accord from '../../components/Accord'
import{v4 as uuid} from "uuid"
import MainScreen from '../../components/MainScreen'
import {myNotesAction} from "../../action/NoteAction"
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Loading from '../../components/Loading'

export default function MyNotes({search,categorys}) {
  const[defaultCategoty,setDefault]=useState(categorys[0])
  const userLogin= useSelector(state => state.userLogin)
    const {accessToken}=userLogin.userInfo
    console.log("userLOgin",accessToken)
  const myNotes= useSelector(state=>state.myNotes)
  const {loading,notesInfo,error}=myNotes
  console.log("noteINfo",notesInfo)
  const dispatch=useDispatch()
  useEffect(()=>{
        
        
         dispatch(myNotesAction(accessToken))

  },[accessToken,dispatch])
  let filterCategory=notesInfo
  if(defaultCategoty!=="All"){
       filterCategory=notesInfo && notesInfo.filter(note => 
         note.category===defaultCategoty
    )
  }
    const filterednotes=filterCategory && filterCategory.filter(note=>((note.title).toLowerCase()).includes((search).toLowerCase()))
  

 
  return (
    <div>
      <MainScreen title="My Blog">
         <Link to="../createnote">
             <Button style={{marginLeft:10,marginBottom:6} } size="lg">
               Create A New Blog
             </Button>
         </Link>
         <ButtonGroup>{categorys.map(category => <Button key={uuid()} onClick={(e)=>setDefault(category) } variant={category===defaultCategoty ? "info": "secondary"} style={{marginLeft:10,marginBottom:6}}>{category}</Button>)}</ButtonGroup>

         {loading && <Loading/>}
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
         {filterednotes?.reverse().map(note =>
         <Accord key={uuid()} note={note}/>
        )}
      </MainScreen>
    </div>
  )
}
