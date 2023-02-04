import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import {v4 as uuid} from "uuid"
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Accord from '../../components/Accord'
import { useDispatch, useSelector } from 'react-redux'
import {allNotesAction} from "../../action/NoteAction"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from '../../components/Loading'


export default function AllNotes({search,categorys}) {
    
    const[defaultCategoty,setDefault]=useState(categorys[0])
    const allNotes=useSelector(state =>state.allNotes)
    const {notesInfo,loading,error}=allNotes
    const userLogin= useSelector(state => state.userLogin)
    const {id}=userLogin?.userInfo?.user
 
    const dispatch=useDispatch()
    console.log(defaultCategoty,"defaukt")
   
    useEffect(()=>{
        dispatch(allNotesAction())         
    },[])
    let filterCategory=notesInfo
    if(defaultCategoty!=="All"){
         filterCategory=notesInfo && notesInfo.filter(note => 
           note.category===defaultCategoty
      )
    }
    
   
    const filterednotes=filterCategory && filterCategory.filter(note=>((note.title).toLowerCase()).includes((search).toLowerCase()))

  return (
    <MainScreen title="All Blog">
    <Link to="../createnote">
             <Button style={{marginLeft:10,marginBottom:6} } size="lg">
               Create New Blog
             </Button>
             
    </Link>
      <ButtonGroup>{categorys.map(category => <Button key={uuid()} onClick={(e)=>setDefault(category) } variant={category===defaultCategoty ? "info": "secondary"} style={{marginLeft:10,marginBottom:6}}>{category}</Button>)}</ButtonGroup>
     {loading && <Loading/>}
     {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    {id && filterednotes && filterednotes.reverse().map(note=>{
        
        
        return <Accord note={note} key={uuid()} isUser={note.user._id
===id} />
        })}
        
    </MainScreen>
  )
}
