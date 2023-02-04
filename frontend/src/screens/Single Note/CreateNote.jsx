import React, {  useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import {v4 as uuid} from "uuid"
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage'
import TextEditor from '../../components/TextEditor'
import { RESET_REDIRECT } from '../../case/NoteCase'
import { addNotesAction,editNotesAction} from '../../action/NoteAction'

const categorys=["HTML and CSS","JavaScript","Programming","Server Side","Data Analytics"]

export default function CreateNote(props) {
    
  const [title,setTitle]=useState(""||props.title)
  const [content,setContent]=useState(""||props.content)
  const [category,setCategory]=useState(props.category||categorys[1])

  const navigate=useNavigate()
  const editId=useParams().id

  const userLogin= useSelector(state => state.userLogin)
  const {accessToken}=userLogin.userInfo

  const addNotes=useSelector(state => state.addNotes)
  const{error}=addNotes

  const {redirect}=useSelector(state =>state.redirect)
  const dispatch=useDispatch()

 
  if(redirect){
    dispatch({type:RESET_REDIRECT})
    navigate("/allnotes")
  }
    
  const formHandler= async(e)=>{
      e.preventDefault()
      const note={title,content,category}

      if(editId){
          dispatch(editNotesAction(accessToken,editId,note))
        }
      else{
          dispatch(addNotesAction(accessToken,note))
          console.log("After dispatch")
        }
    }

  const resetHandler=()=>{
      setTitle("")
      setCategory("")
      setContent("")
    }
      
  return (
    <MainScreen title= { editId ? "Edit Blog" :"Create Blog"}>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

      <Card>
        <Card.Header>
            { editId ? "Edit A Blog" : "Create A New Blog"}
        </Card.Header>

        <Card.Body>
          <Form onSubmit={formHandler}>
            <Form.Group controlId='title'>
                <Form.Label>
                  Title
                </Form.Label>
                <Form.Control placeholder='Enter The Title' type='title' onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </Form.Group>
            <Form.Group>
              <Form.Label controlId='category'>
                    Category
              </Form.Label>
              <Form.Control as="select" placeholder='Select The Category' onChange={(e)=>setCategory(e.target.value)} value={category} type="category">
                  {categorys.map(opt=><option key={uuid()} value={opt}>{opt}</option>)}
                  
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='content'>
                <Form.Label>
                    Content
                </Form.Label>
                <TextEditor setContent={setContent} content={content}/>
            </Form.Group>
            <Button variant='primary' type='sumbit' >Sumbit</Button>
         <Button variant='danger' className='mx-2' onClick={resetHandler}>Reset Fields</Button>
          </Form>
  
        </Card.Body>
      </Card>
    </MainScreen>
  )
}
