import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import CreateNote from './CreateNote'
import ErrorMessage from '../../components/ErrorMessage'

export default function EditNote() {
    const[note,setNote]=useState()
    const {id}=useParams()
    const editNotes=useSelector(state=>state.editNotes)
    const {error}=editNotes
    const userInfo= JSON.parse(localStorage.getItem("userInfo"))
    const {accessToken}=userInfo

   
    useEffect(()=>{
         
          const options={
            method:"get",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
          }
          fetch(`http://localhost:5000/api/note/${id}`,options)
          .then((response)=>response.json())
          .then((note)=>{
            console.log(note)
            setNote(note.edittableNote)
        })
          .catch((err)=>console.log(err))
    },[id,accessToken])
  return (
    <div>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      { note && <CreateNote title={note.title} category={note.category} content={note.content}/>}
    </div>
  )
}
